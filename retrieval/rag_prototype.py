import os

import pymysql
import streamlit as st
from langchain.embeddings.openai import OpenAIEmbeddings
from pinecone import Pinecone
from rag import retrieve_doc
from settings import get_secret

# mysql
db_passwd = get_secret("MYSQL_PSW")

db = pymysql.connect(
    user='root',
    passwd=db_passwd,
    host='127.0.0.1',
    db='cfn-doc',
    charset='utf8',
)

print("DB connected!")

# pinecone
PINECONE_APIKEY = get_secret("PINECONE_APIKEY")
pc = Pinecone(api_key=f"{PINECONE_APIKEY}", environment="gcp-starter")
pc_index = pc.Index("cfn-doc")

# openai
os.environ["OPENAI_API_KEY"] = get_secret("OPENAI_APIKEY")
embedding = OpenAIEmbeddings()

st.title('RAG Prototype')

question = st.text_input('질문을 입력하세요:')

if question:
    st.write(retrieve_doc(question, db, pc_index))

db.close()
