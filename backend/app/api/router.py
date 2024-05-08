from fastapi import APIRouter
from api.routes import templates, hashtag, users

api_router = APIRouter()
api_router.include_router(templates.router, prefix="/templates")
api_router.include_router(hashtag.router, prefix="/hashtag")
api_router.include_router(users.router, prefix="/user")
