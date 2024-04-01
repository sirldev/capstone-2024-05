import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from utils.setup import setup_db, setup_embedding, setup_pinecone


def retrieve_doc(question, db, vector_db, embedding, top_k):
    embedded_question = embedding.embed_documents([question])

    query_result = vector_db.query(
        vector=embedded_question,
        top_k=top_k,
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
        content = cursor.fetchone()

        temp_result = {"score": score, "title": title, "content": content[0]}
        retrieved_docs.append(temp_result)

    return retrieved_docs


if __name__ == "__main__":
    # mysql
    db = setup_db()

    # pinecone
    pc_index = setup_pinecone()

    # openai
    embedding = setup_embedding()

    question = input("질문을 입력하세요: ")

    result = retrieve_doc(question, db, pc_index, embedding, top_k=3)

    for r in result:
        print(f"score: {r['score']}\n\ntitle: {r['title']}\n\ncontent: {r['content']}\n\n")

    db.close()
