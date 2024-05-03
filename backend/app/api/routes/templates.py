import os
import sys
from datetime import datetime
from typing import Dict

from db import models
from db.database import get_db
from db.models import PromptAns
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


########### POST ###########
@router.post("")
async def create_template(
    request: Request, prompt: str, db: Session = Depends(get_db)
):
    try:
        retrieved_doc = retrieve_doc(question=prompt, pc_index=app_main.pc_index, embedding=app_main.embedding, llm=app_main.llm)
        template_file, documents_list = gpt_genereate(instruction=prompt, retrieved_doc=retrieved_doc)
        print(f"{documents_list=}")

        db_promptAns = models.PromptAns(
            prompt=prompt.prompt,
            template=prompt.template,
            description=prompt.description,
            user_id=prompt.user_id,
        )
        db.add(db_promptAns)
        db.commit()
        db.refresh(db_promptAns)
        return prompt
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
