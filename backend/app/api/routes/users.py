from datetime import datetime
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, Depends

from db.models import PromptAns
from db.database import SessionLocal
from sqlalchemy.orm import Session
from db import models
from db.database import get_db

router = APIRouter()


# Data Validation
class UserBase(BaseModel):
    username: str
    hashed_password: str


@router.post("/create-user")
async def create_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = models.User(username=user.username, hashed_password=user.hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
