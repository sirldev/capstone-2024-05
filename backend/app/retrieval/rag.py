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

    retrieved_docs = retriever_from_llm.get_relevant_documents(query=question)

    return retrieved_docs


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
