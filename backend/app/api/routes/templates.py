from datetime import datetime
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException

from db.models import PromptAns
from db.database import SessionLocal


router = APIRouter()


class TemplateUploadBase(BaseModel):
    id: int


@router.post("/upload")
def upload_template(params: TemplateUploadBase):
    # TODO : Valid JWT
    db = SessionLocal()
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
    finally:
        db.close()
