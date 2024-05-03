from fastapi import APIRouter

from api.routes import templates, users

api_router = APIRouter()
api_router.include_router(templates.router, prefix="/templates")
api_router.include_router(users.router, prefix="/user")
