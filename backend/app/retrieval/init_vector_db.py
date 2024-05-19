import configparser
import os
import time
from uuid import uuid4

from datasets import load_dataset
from dotenv import load_dotenv
from langchain.embeddings.openai import OpenAIEmbeddings
from markdown_splitter import MarkdownHeaderGroupSplitter
from pinecone import Pinecone
from tqdm.auto import tqdm

# huggingface hub
documents = load_dataset("WinF/cfn_document", data_dir="data")

# get the base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# load the .env file
load_dotenv(os.path.join(BASE_DIR, ".env"))

# pinecone
PINECONE_APIKEY = os.getenv("PINECONE_APIKEY")
pc = Pinecone(api_key=f"{PINECONE_APIKEY}")
pc_index = pc.Index("cfn-doc")

# openai
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_APIKEY")
embedding = OpenAIEmbeddings()

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

for record in tqdm(documents["train"]):
    is_included_doc = list(map(record["title"].startswith, included_docs))

    if True in is_included_doc:
        metadata = {
            "doc-id": str(record["id"]),
            "title": record["title"]
        }

        full_text = record["text"]
        full_text = full_text.replace("'", '"')
        doc_chunks = markdown_splitter.split_text(full_text)
        offset = 0
        for i, doc_chunk in enumerate(doc_chunks):
            record = {
                "chunk": i + offset,
                "content": doc_chunk.page_content,
                "section_title": doc_chunk.metadata["##"] if "##" in doc_chunk.metadata else None,
                **metadata,
            }
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
