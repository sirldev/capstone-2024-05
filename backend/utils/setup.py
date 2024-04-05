import os

import pymysql
from langchain.embeddings.openai import OpenAIEmbeddings
from pinecone import Pinecone
from retrieval.settings import get_secret


def setup_db():
    db_passwd = get_secret("MYSQL_PSW")

    db = pymysql.connect(
        user='root',
        passwd=db_passwd,
        host='127.0.0.1',
        db='cfn-doc',
        charset='utf8',
    )

    print("DB connected!")

    return db


def setup_pinecone():
    PINECONE_APIKEY = get_secret("PINECONE_APIKEY")
    pc = Pinecone(api_key=f"{PINECONE_APIKEY}", environment="gcp-starter")
    pc_index = pc.Index("cfn-doc")

    return pc_index


def setup_embedding():
    os.environ["OPENAI_API_KEY"] = get_secret("OPENAI_APIKEY")
    embedding = OpenAIEmbeddings()

    return embedding
