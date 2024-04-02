import os
import sys

import streamlit as st
from langchain.chat_models import ChatOpenAI
from rag import retrieve_doc

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from utils.setup import setup_db, setup_embedding, setup_pinecone

# mysql
db = setup_db()

# pinecone
pc_index = setup_pinecone()

# openai
embedding = setup_embedding()
llm = ChatOpenAI()

st.title('RAG Prototype')

question = st.text_input('질문을 입력하세요:')

if question:
    st.write(retrieve_doc(question, db, pc_index, embedding, llm=llm, top_k=5))

db.close()
