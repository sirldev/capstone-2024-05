import os

import pymysql
from dotenv import load_dotenv
from langchain.embeddings.openai import OpenAIEmbeddings
from pinecone import Pinecone

# get the base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# load the .env file
load_dotenv(os.path.join(BASE_DIR, ".env"))


def setup_db():
    db_passwd = os.getenv("MYSQL_PSW")

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
    PINECONE_APIKEY = os.getenv("PINECONE_APIKEY")
    pc = Pinecone(api_key=PINECONE_APIKEY, environment="gcp-starter")
    pc_index = pc.Index("cfn-doc")

    return pc_index


def setup_embedding():
    os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_APIKEY")
    embedding = OpenAIEmbeddings()

    return embedding
