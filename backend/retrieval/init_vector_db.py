import configparser
import os
import time
from sys import getsizeof
from uuid import uuid4

import pymysql
from datasets import load_dataset
from dotenv import load_dotenv
from langchain.embeddings.openai import OpenAIEmbeddings
# from langchain.text_splitter import (MarkdownHeaderTextSplitter,
#                                      RecursiveCharacterTextSplitter)
from markdown_splitter import MarkdownHeaderGroupSplitter
from pinecone import Pinecone
from settings import get_secret
from tqdm.auto import tqdm

# BASE_DIR = os.path.dirname(__file__)

# mysql
# db_passwd = get_secret("MYSQL_PSW")

# db = pymysql.connect(
#     user='root',
#     passwd=db_passwd,
#     host='127.0.0.1',
#     db='cfn-doc',
#     charset='utf8',
# )

# print("DB connected!")

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

# text_splitter = RecursiveCharacterTextSplitter(
#     chunk_size=1000,
#     chunk_overlap=200,
#     length_function=len,
#     separators=["\n\n", "\n", " ", ""],
# )

headers_to_split_on = [
    # ("#", "Header 1"),
    ("##", "Header 2"),
]

markdown_splitter = MarkdownHeaderGroupSplitter(
    headers_to_split_on_cnt=2, strip_headers=False
)

batch_size = 50
texts = []
metadatas = []
count = 0
included_docs = [
    "aws-properties-",
    "aws-resource-",
    "quickref",
]
# excluded_docs = []
# cursor = db.cursor()

# with open(os.path.join(BASE_DIR, "excluded_docs.txt"), "r") as f:
#     excluded_docs = f.readlines()

# excluded_docs = list(map(str.rstrip, excluded_docs))

for record in tqdm(documents["train"]):
    is_included_doc = list(map(record["title"].startswith, included_docs))

    if True in is_included_doc:
        metadata = {
            "doc-id": str(record["id"]),
            "title": record["title"]
        }

        full_text = record["text"]
        full_text = full_text.replace("'", '"')
        # sql = f"insert into documents(content) values('{full_text}')"
        # cursor.execute(sql)
        # idx = cursor.lastrowid
        doc_chunks = markdown_splitter.split_text(full_text)
        offset = 0
        for i, doc_chunk in enumerate(doc_chunks):
            record = {
                "chunk": i + offset,
                "content": doc_chunk.page_content,
                # "document-index": idx,
                **metadata,
                **doc_chunk.metadata,
            }
            # if getsizeof(record) > 40000:
            #     record1 = {
            #         "chunk": i + offset,
            #         "content": doc_chunk.page_content[:len(doc_chunk.page_content)//2],
            #         **metadata,
            #         **doc_chunk.metadata,
            #     }
            #     metadatas.append(record1)
            #     texts.append(doc_chunk.page_content[:len(doc_chunk.page_content)//2])
            #     offset += 1

            #     record2 = {
            #         "chunk": i + offset,
            #         "content": doc_chunk.page_content[len(doc_chunk.page_content)//2:],
            #         **metadata,
            #         **doc_chunk.metadata,
            #     }
            #     metadatas.append(record2)
            #     texts.append(doc_chunk.page_content[len(doc_chunk.page_content)//2:])
            #     count = count + 2
            # else:
            metadatas.append(record)
            texts.append(doc_chunk.page_content)
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

# db.commit()
# db.close()
