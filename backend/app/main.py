import os
import sys
from typing import List, Union

from fastapi import FastAPI
from langchain.chat_models import ChatOpenAI
from pydantic import BaseModel
from retrieval.rag import retrieve_doc
from utils.gpt import gpt_generate_no_rag, gpt_genereate
from utils.setup import setup_db, setup_embedding, setup_pinecone

# sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


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
