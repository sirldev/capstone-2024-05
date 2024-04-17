import os
import sys
from typing import Union, List

from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

from retrieval.rag import retrieve_doc
from utils.gpt import gpt_generate_no_rag, gpt_genereate
from utils.setup import setup_db, setup_embedding, setup_pinecone

import typer
import subprocess
import json


from sqlalchemy.orm import Session

from db import crud, models, schemas
from db.database import SessionLocal, engine

# sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


class Instruction(BaseModel):
    instruction_sentence: str


class Answer(BaseModel):
    template_file: Union[str, None]


app = FastAPI()
db = None
pc_index = None
embedding = None


###### retrieval code ######


@app.on_event("startup")
def startup_event():
    global db, pc_index, embedding

    # mysql
    # db = setup_db()

    # pinecone
    pc_index = setup_pinecone()

    # openai
    embedding = setup_embedding()


# @app.post("/generate", response_model=Answer)
# async def generate(instruction: Instruction):
#     inst_sentence = instruction.instruction_sentence

#     retrieved_doc = retrieve_doc(
#         question=inst_sentence, vector_db=pc_index, embedding=embedding, top_k=1
#     )

#     # template_file = gpt_genereate(instruction=instruction, retrieved_doc=retrieved_doc)
#     template_file = gpt_generate_no_rag(instruction=instruction)

#     return Answer(template_file=template_file)


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
    # print(file_name)
    validation_cmd = [
        "aws",
        "cloudformation",
        "validate-template",
        "--template-body",
        "file://stat/examples/" + file_name,
    ]

    with open(f"./static/examples/{file_name}", "r") as file:
        content = file.read()

    cmd = " ".join(validation_cmd)
    # print(cmd)

    result = subprocess.run(validation_cmd, capture_output=True, text=True)
    print(result)

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
@app.get("/api/")
def root():
    return {"message": "This is backend side API section"}


# 종속성 만들기 : 요청 당 독립적인 데이터베이스 세션/연결이 필요하고 요청이 완료되면 닫음
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/items/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items


@app.post("/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)
