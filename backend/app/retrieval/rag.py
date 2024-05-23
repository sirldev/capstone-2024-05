import logging
import os
import sys

from langchain.chat_models import ChatOpenAI
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain.vectorstores import Pinecone

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from utils.setup import setup_embedding, setup_pinecone


def retrieve_doc(question, pc_index, embedding, llm):

    vector_db = Pinecone(pc_index, embedding.embed_query, "content")

    retriever_from_llm = MultiQueryRetriever.from_llm(
        retriever=vector_db.as_retriever(), llm=llm
    )

    logging.basicConfig()
    logging.getLogger("langchain.retrievers.multi_query").setLevel(logging.INFO)

    retrieved_docs = retriever_from_llm.get_relevant_documents(query=question)

    doc_ids = list(set([doc.metadata["doc-id"] for doc in retrieved_docs]))
    docs = []

    for doc_id in doc_ids:
        result_syntax = pc_index.query(
            vector=[0] * 1536,
            filter={
                "doc-id": {"$eq": doc_id},
                "section_title": {"$eq": "통사론"},
            },
            top_k=3,
            include_metadata=True
        )

        for idx in range(len(result_syntax["matches"])):
            document = {
                    "title": result_syntax["matches"][idx]["metadata"]["title"],
                    "content": result_syntax["matches"][idx]["metadata"]["content"],
                }
            docs.append(document)

        result_prop = pc_index.query(
            vector=[0] * 1536,
            filter={
                "doc-id": {"$eq": doc_id},
                "section_title": {"$eq": "속성"},
            },
            top_k=3,
            include_metadata=True
        )

        for idx in range(len(result_prop["matches"])):
            document = {
                    "title": result_prop["matches"][idx]["metadata"]["title"],
                    "content": result_prop["matches"][idx]["metadata"]["content"],
                }
            docs.append(document)

    return docs


if __name__ == "__main__":

    logging.basicConfig()
    logging.getLogger("langchain.retrievers.multi_query").setLevel(logging.INFO)

    # pinecone
    pc_index = setup_pinecone()

    # openai
    embedding = setup_embedding()
    llm = ChatOpenAI()

    question = input("질문을 입력하세요: ")

    result = retrieve_doc(question, pc_index, embedding, llm=llm)

    print(result)
