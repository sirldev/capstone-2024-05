from pydantic import BaseModel, validator
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from db.models import User
from db.database import get_db
from utils.auth import create_access_token, get_current_user

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


class LoginBase(BaseModel):
    username: str
    password: str


class SumRequest(BaseModel):
    addend1: int
    addend2: int


@router.post("/create_user")
def create_user(params: CreateUserBase, db: Session = Depends(get_db)):
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


@router.post("/token")
def login(params: LoginBase, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.username == params.username).first()
        if not user or not user.verify_password(params.password):
            raise HTTPException(
                status_code=401,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token = create_access_token(data={"sub": user.username})
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
    finally:
        db.close()

