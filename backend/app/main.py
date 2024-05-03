import json
import os
import subprocess
import sys
from typing import Annotated, List, Union

from api.main import api_router
from db import crud, models, schemas
from db.database import DB_URL, SessionLocal, engine
from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from langchain.chat_models import ChatOpenAI
from pydantic import BaseModel
from retrieval.rag import retrieve_doc
# for db
from sqlalchemy.orm import Session
from utils.gpt import gpt_generate_no_rag, gpt_genereate
from utils.setup import setup_db, setup_embedding, setup_pinecone

app = FastAPI()
models.Base.metadata.create_all(bind=engine)
db = None
pc_index = None
embedding = None


# Data Validation
class UserBase(BaseModel):
    username: str
    hashed_password: str


class PromptAnsBase(BaseModel):
    prompt: str
    description: str
    user_id: int  # FK


class HashTagBase(BaseModel):
    tag: str


def get_db():
    db = SessionLocal()
    print(DB_URL)
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


###### retrieval code ######
class Instruction(BaseModel):
    instruction_sentence: str


class Answer(BaseModel):
    template_file: Union[str, None]
    reference_documents: Union[List[str], None]


app = FastAPI()
db = None
pc_index = None
embedding = None
llm = None


@app.on_event("startup")
def startup_event():
    global db, pc_index, embedding, llm

    # mysql
    # db = setup_db()

    # pinecone
    pc_index = setup_pinecone()

    # openai
    embedding = setup_embedding()
    llm = ChatOpenAI()


@app.post("/generate", response_model=Answer)
async def generate(instruction: Instruction):
    inst_sentence = instruction.instruction_sentence

    retrieved_doc = retrieve_doc(question=inst_sentence, pc_index=pc_index, embedding=embedding, llm=llm)

    template_file, documents_list = gpt_genereate(instruction=instruction, retrieved_doc=retrieved_doc)

    return Answer(template_file=template_file, reference_documents=documents_list)


###### template validate code ######

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse(request=request, name="main.html")


@app.get("/items/{id}", response_class=HTMLResponse)
async def read_item(request: Request, id: int):

    return templates.TemplateResponse(
        request=request, name="item.html", context={"id": id}
    )


@app.get("/template_validation/{file_name}", response_class=HTMLResponse)
def validation_template(request: Request, file_name: str):
    validation_cmd = [
        "aws",
        "cloudformation",
        "validate-template",
        "--template-body",
        "file://static/examples/" + file_name,
    ]

    with open(f"./static/examples/{file_name}", "r") as file:
        content = file.read()

    cmd = " ".join(validation_cmd)

    result = subprocess.run(validation_cmd, capture_output=True, text=True)

    if result.returncode:
        return templates.TemplateResponse(
            request=request,
            name="template-validation-fail.html",
            context={
                "title": file_name,
                "result": result.stderr,
                "cmd": cmd,
                "content": content,
            },
        )
    else:
        return templates.TemplateResponse(
            request=request,
            name="template-validation-success.html",
            context={
                "title": file_name,
                "result": json.loads(result.stdout),
                "cmd": cmd,
                "content": content,
            },
        )


###### Template Hub API Section ######
@app.post("/create-dummy")  # get api개발을 위한 더미 생성용 api
async def create_prompt(prompt: PromptAnsBase, db: db_dependency):
    print(prompt)
    db_promptAns = models.PromptAns(
        prompt=prompt.prompt, description=prompt.description, user_id=prompt.user_id
    )
    db.add(db_promptAns)
    db.commit()
    db.refresh(db_promptAns)


@app.get("/templates")
async def get_templates(db: db_dependency):
    templates = db.query(models.PromptAns).all()
    return templates


@app.post("/create-user")
async def create_user(user: UserBase, db: db_dependency):
    db_user = models.User(username=user.username, hashed_password=user.hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

app.include_router(api_router)
