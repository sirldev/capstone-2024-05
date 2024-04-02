import os
import sys
from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
from retrieval.rag import retrieve_doc
from utils.gpt import gpt_generate_no_rag, gpt_genereate
from utils.setup import setup_db, setup_embedding, setup_pinecone

# sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


class Instruction(BaseModel):
    instruction_sentence: str


class Answer(BaseModel):
    template_file: Union[str, None]


app = FastAPI()
db = None
pc_index = None
embedding = None


@app.on_event("startup")
def startup_event():
    global db, pc_index, embedding

    # mysql
    # db = setup_db()

    # pinecone
    pc_index = setup_pinecone()

    # openai
    embedding = setup_embedding()


@app.post("/generate", response_model=Answer)
async def generate(instruction: Instruction):
    inst_sentence = instruction.instruction_sentence

    retrieved_doc = retrieve_doc(question=inst_sentence, vector_db=pc_index, embedding=embedding, top_k=1)

    # template_file = gpt_genereate(instruction=instruction, retrieved_doc=retrieved_doc)
    template_file = gpt_generate_no_rag(instruction=instruction)

    return Answer(template_file=template_file)
