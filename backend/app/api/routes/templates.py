import os
import sys
from datetime import datetime
from typing import Dict
import json
import re

from db import models
from db.database import get_db
from db.models import PromptAns, HashTag, PromptAns_HashTag, User
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from retrieval.rag import retrieve_doc
from sqlalchemy.orm import Session
from sqlalchemy import insert
from utils.gpt import gpt_genereate
from utils.auth import get_current_user

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

import main as app_main

router = APIRouter()


# function to get values of dict
def recursive_value_collect(dict_obj):
    for value in dict_obj.values():
        if isinstance(value, dict):
            yield from recursive_value_collect(value)
        elif isinstance(value, list):
            for item in value:
                if isinstance(item, dict):
                    yield from recursive_value_collect(item)
                else:
                    yield item
        else:
            yield value


# Data Validation
class TemplateUploadBase(BaseModel):
    id: int


class PromptAnsBase(BaseModel):
    prompt: str
    template: Dict
    description: str
    user_id: int  # FK


class Prompt(BaseModel):
    prompt: str


########### GET ###########
@router.get("")
async def get_templates(request: Request, db: Session = Depends(get_db)):
    # authorization이 있으면 해당 유저의 templates만 보여줌
    if request.headers.get("Authorization"):
        user = (
            db.query(models.User)
            .filter(models.User.authorization == request.headers.get("Authorization"))
            .first()
        )
        if not user:
            raise HTTPException(status_code=401, detail="Authorization is not valid")
        templates = (
            db.query(models.PromptAns)
            .filter(models.PromptAns.user_id == user.id)
            .first()
        )
        if templates:
            return templates
        else:  # 사용자가 작성한 템플릿이 없을 때
            raise HTTPException(status_code=404, detail="No templates on this user")
    # authorization이 없으면 모든 templates 보여줌
    else:
        templates = db.query(models.PromptAns).all()
        return templates


@router.get("/{id}")
async def get_single_templates(id: int, db: Session = Depends(get_db)):
    template = db.query(models.PromptAns).filter(models.PromptAns.id == id).first()
    return template


documents_dummy = [
    "AWS_ACMPCA.md",
    "AWS_APS.md",
    "AWS_AccessAnalyzer.md",
    "AWS_AmazonMQ.md",
    "AWS_Amplify.md",
]


########### POST ###########
@router.post("")
async def create_template(prompt: Prompt, db: Session = Depends(get_db)):
    # print(request)
    print(prompt)
    prompt = prompt.prompt
    try:
        retrieved_doc = retrieve_doc(
            question=prompt,
            pc_index=app_main.pc_index,
            embedding=app_main.embedding,
            llm=app_main.llm,
        )
        result, documents_list = gpt_genereate(
            instruction=prompt, retrieved_doc=retrieved_doc
        )

        # parse result
        template_file, description = [], []
        state = False
        for l in result.split("\n"):
            # print(l)
            if "```" in l:
                state = not state
                continue
            if state:
                template_file.append(l + "\n")
            else:
                description.append(l + "\n")
        description = "".join(description)
        description = description.strip()
        template_file = "".join(template_file)
        template_file = json.loads(template_file)

        # TODO : Valid JWT
        # get user_id from JWT
        db_promptAns = models.PromptAns(
            prompt=prompt,
            template=template_file,
            description=description,
            documents=documents_dummy,
            # user_id=user_id,
        )
        db.add(db_promptAns)
        db.commit()
        db.refresh(db_promptAns)

        ##### keword extraction from template
        # value 수집
        values = list(recursive_value_collect(template_file))
        values = "".join(map(str, values))
        # 정규 표현식을 사용하여 단어 추출
        keywords = re.findall(r"\b[A-Za-z]+\b", values)

        # 필터링
        filtered_keywords = [
            k for k in keywords if k not in ["AWS", "Amazon"] and len(k) > 2
        ]
        tag_ids = []
        # find keyword in db. 이미 존재하는 키워드만 필터링
        for keyword in filtered_keywords:
            hashtag = (
                db.query(HashTag).filter(HashTag.tag.ilike(f"%{keyword}%")).first()
            )
            if hashtag is not None:
                tag_ids.append(hashtag.id)
        # 새로운 키워드 추가
        for tag_id in tag_ids:
            stmt = insert(PromptAns_HashTag).values(
                prompt_ans_id=db_promptAns.id, hashtag_id=tag_id
            )
            db.execute(stmt)
        db.commit()

        # return 할 값 만들기
        # db_promptAns를 dictionary로 변환
        db_promptAns_dict = {
            c.name: getattr(db_promptAns, c.name)
            for c in db_promptAns.__table__.columns
        }
        # 해시태그 필드 추가
        db_promptAns_dict["hashtag"] = filtered_keywords

        # 리턴
        return db_promptAns_dict
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=e)


@router.post("/upload")
def upload_template(
    params: TemplateUploadBase,
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user),
):
    try:
        if not username:
            raise HTTPException(
                status_code=401,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        prompt_ans = db.query(PromptAns).filter(PromptAns.id == params.id).first()
        if not prompt_ans:
            raise HTTPException(status_code=404, detail="id not found")
        user = db.query(User).filter(User.username == username).first()
        if user.id != prompt_ans.user_id:
            raise HTTPException(status_code=404, detail="user id dose not match")
        prompt_ans.uploaded = datetime.now()
        db.commit()
        return {"detail": "upload success"}
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=e)
