from datetime import datetime
from typing import Dict
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, Depends, Request
from db.models import PromptAns
from sqlalchemy.orm import Session
from db import models
from db.database import get_db


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
    request: Request, prompt: PromptAnsBase, db: Session = Depends(get_db)
):
    # check authorization
    try:
        user = (
            db.query(models.User)
            .filter(models.User.authorization == request.headers.get("Authorization"))
            .first()
        )

        # user_id와 일치하는 user가 없거나, user_id와 authorization이 일치하지 않을 때
        if (not user) or (user.id != prompt.user_id):
            raise HTTPException(status_code=401, detail="Authorization is not valid")
    except Exception as e:
        raise HTTPException(status_code=400, detail=e)

    try:
        # TODO : AI 통해서 template만들고 저장하기
        ## 1. prompt.prompt를 AI에 넣어서 template 생성
        ## 2. template 생성 후 db에 저장
        ## 3. 생성된 template를 return
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
