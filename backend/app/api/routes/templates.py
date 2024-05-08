import os
import sys
from datetime import datetime
from typing import Dict
import json
import re

from db import models
from db.database import get_db
from db.models import PromptAns, HashTag, PromptAns_HashTag
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from retrieval.rag import retrieve_doc
from sqlalchemy.orm import Session
from utils.gpt import gpt_genereate

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

import main as app_main

router = APIRouter()


# Data Validation
class TemplateUploadBase(BaseModel):
    id: int


class PromptAnsBase(BaseModel):
    prompt: str
    template: Dict
    description: str
    user_id: int  # FK


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
async def get_single_templates(db: Session = Depends(get_db)):
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
async def create_template(request: Request, prompt: str, db: Session = Depends(get_db)):
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
        print("description", description)
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

        ###### Description이 없는 경우에는 해시태그가 추출되지 않음
        # keword extraction
        # 정규 표현식을 사용하여 단어 추출
        keywords = re.findall(r"\b[A-Za-z0-9]+\b", description)
        print("keywords", keywords)
        filtered_keywords = [k for k in keywords if k not in ["AWS", "Amazon"]]
        print("filtered_keywords", filtered_keywords)
        tag_ids = []
        # find keyword in db. 이미 존재하는 키워드만 필터링
        for keyword in filtered_keywords:
            hashtag = db.query(HashTag).filter(keyword in HashTag.tag).first()
            print(hashtag)
            if hashtag is not None:
                tag_ids.append(hashtag.id)
        for tag_id in tag_ids:
            db.add(
                PromptAns_HashTag(
                    prompt_ans_id=db_promptAns.id,
                    hashtag_id=tag_id,
                )
            )
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
def upload_template(params: TemplateUploadBase, db: Session = Depends(get_db)):
    # TODO : Valid JWT
    try:
        prompt_ans = db.query(PromptAns).filter(PromptAns.id == params.id).first()
        if not prompt_ans:
            raise HTTPException(status_code=404, detail="id not found")
        prompt_ans.uploaded = datetime.now()
        db.commit()
        return {"detail": "upload success"}
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=e)
