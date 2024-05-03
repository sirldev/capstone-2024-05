from pydantic import BaseModel, validator
from fastapi import APIRouter, HTTPException

from db.models import User
from db.database import SessionLocal


router = APIRouter()


class CreateUserBase(BaseModel):
    username: str
    password: str
    password_confirmation: str

    @validator("password_confirmation")
    def passwords_match(cls, v, values):
        if "password" in values and v != values["password"]:
            raise HTTPException(status_code=422, detail="Password do not match")
        return v


@router.post("/create_user")
def create_user(params: CreateUserBase):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.username == params.username).first()
        if user:
            raise HTTPException(status_code=400, detail="Username already registered")
        new_user = User(
            username=params.username,
        )
        new_user.hash_password(params.password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except HTTPException as http_exc:
        db.rollback()
        raise http_exc
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=e)
    finally:
        db.close()
