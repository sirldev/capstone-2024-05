from fastapi import APIRouter

from api.routes import templates

api_router = APIRouter()
api_router.include_router(templates.router, prefix="/templates")
