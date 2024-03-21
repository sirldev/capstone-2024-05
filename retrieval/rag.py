import os

import pymysql
from langchain.embeddings.openai import OpenAIEmbeddings
from pinecone import Pinecone
from settings import get_secret


def retrieve_doc(question, db, vector_db, embedding):
    os.environ["OPENAI_API_KEY"] = get_secret("OPENAI_APIKEY")
    embedding = OpenAIEmbeddings()

    embedded_question = embedding.embed_documents([question])

    query_result = vector_db.query(
        vector=embedded_question,
        top_k=5,
        include_values=False,
        include_metadata=True
    )

    cursor = db.cursor()
    retrieved_docs = []

    for result in query_result.matches:
        document_index = int(result.metadata["document-index"])
        title = result.metadata["title"]
        score = result.score
        sql = f"select content from documents where document_index={document_index}"
        cursor.execute(sql)
        content = cursor.fetchall()

        temp_result = {"score": score, "title": title, "content": content}
        retrieved_docs.append(temp_result)

    return retrieved_docs


if __name__ == "__main__":
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

    question = input("질문을 입력하세요: ")

    result = retrieve_doc(question, db, pc_index, embedding)

    for r in result:
        print(f"score: {r['score']}\n\ntitle: {r['title']}\n\ncontent: {r['content']}\n\n")

    db.close()
