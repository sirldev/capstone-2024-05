from typing import List

import openai


def gpt_genereate(instruction: str, retrieved_doc: List[dict]):
    docs = "\n\n".join([doc["content"] for doc in retrieved_doc])

    message = f"""
    주어진 문서의 내용을 바탕으로, 지시 사항을 수행하는 JSON 형식의 템플릿 파일을 생성해줘.

    [지시 사항]
    {instruction}

    [문서]
    {docs}
    """

    completion = openai.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[
            {
                "role": "user",
                "content": message,
            },
        ],
    )

    response = completion.choices[0].message.content

    return response


def gpt_generate_no_rag(instruction: str):

    message = f"""
    지시 사항을 수행하는 JSON 형식의 템플릿 파일을 생성해줘.

    [지시 사항]
    {instruction}
    """

    completion = openai.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[
            {
                "role": "user",
                "content": message,
            },
        ],
    )

    response = completion.choices[0].message.content

    return response
