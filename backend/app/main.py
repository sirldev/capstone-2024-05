import json
import subprocess
from typing import List, Union

# for db
from db import models
from db.database import engine
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from langchain.chat_models import ChatOpenAI
from pydantic import BaseModel
from retrieval.rag import retrieve_doc
from sqlalchemy.orm import Session
from utils.gpt import gpt_genereate
from utils.setup import setup_embedding, setup_pinecone

app = FastAPI()
models.Base.metadata.create_all(bind=engine)
db = None
pc_index = None
embedding = None
llm = None


class HashTagBase(BaseModel):
    tag: str


###### retrieval code ######
class Instruction(BaseModel):
    instruction_sentence: str


class Answer(BaseModel):
    template_file: Union[str, None]
    reference_documents: Union[List[str], None]


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

    retrieved_doc = retrieve_doc(
        question=inst_sentence, pc_index=pc_index, embedding=embedding, llm=llm
    )

    template_file, documents_list = gpt_genereate(
        instruction=instruction, retrieved_doc=retrieved_doc
    )

    return Answer(template_file=template_file, reference_documents=documents_list)


###### template validate code ######

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse(request=request, name="main.html")


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


from api.router import api_router

app.include_router(api_router)
