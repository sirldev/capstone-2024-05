import configparser
import os
import time
from uuid import uuid4

import pymysql
from datasets import load_dataset
from dotenv import load_dotenv
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pinecone import Pinecone
from settings import get_secret
from tqdm.auto import tqdm

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

# huggingface hub
documents = load_dataset("WinF/cfn_document", data_dir="data")

# config file
load_dotenv()
config = configparser.ConfigParser()
config.read("retrieval.conf")

# pinecone
PINECONE_APIKEY = get_secret("PINECONE_APIKEY")
pc = Pinecone(api_key=f"{PINECONE_APIKEY}", environment="gcp-starter")
pc_index = pc.Index("cfn-doc")

# openai
os.environ["OPENAI_API_KEY"] = get_secret("OPENAI_APIKEY")
embedding = OpenAIEmbeddings()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    length_function=len,
    separators=["\n\n", "\n", " ", ""],
)

batch_size = 50
texts = []
metadatas = []
count = 0
cursor = db.cursor()

for _, record in enumerate(tqdm(documents["train"])):
    metadata = {
        "doc-id": str(record["id"]),
        "title": record["title"]
    }

    full_text = record["text"]
    full_text = full_text.replace("'", '"')
    sql = f"insert into documents(content) values('{full_text}')"
    cursor.execute(sql)
    idx = cursor.lastrowid
    text_chunks = text_splitter.split_text(full_text)
    for i, text in enumerate(text_chunks):
        record = {
            "chunk": i,
            "document-index": idx,
            **metadata
        }
        metadatas.append(record)
        texts.append(text)
        count = count + 1
        if count > batch_size:
            ids = [str(uuid4()) for _ in range(len(texts))]
            embeds = embedding.embed_documents(texts)
            try:
                pc_index.upsert(vectors=zip(ids, embeds, metadatas))
                texts = []
                metadatas = []
                count = 0
            except Exception as e:
                print(e)
                print("retry")
                time.sleep(1)

db.commit()
db.close()
