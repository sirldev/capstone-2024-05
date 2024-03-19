import os
import json
import openai
import configparser
from dotenv import load_dotenv

CONFIG_PATH = "llm/llm.conf"
RAW_DATA_PATH = "llm/raw_data"
OUTPUT_DATA_PATH = "llm/output"

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

config = configparser.ConfigParser()
config.read(CONFIG_PATH)

raw_data_list = os.listdir(RAW_DATA_PATH)

for file_name in raw_data_list:
    with open(f"{RAW_DATA_PATH}/{file_name}", "r") as raw_file:
        document = raw_file.read()
        completion = openai.chat.completions.create(
            model=config["model"]["type"],
            messages=[
                {"role": "system", "content": config["prompt"]["persona"]},
                {
                    "role": "user",
                    "content": f"{config['prompt']['instruction_generation']}\n```\n{document}\n```\n'''\n{config['prompt']['instruction_generation_one_shot']}\n'''",
                },
            ],
        )
        response = completion.choices[0].message.content
        response = response.replace("```", "")
        for i in range(1, 4):
            s_idx = response.find(f"{i}번: ")
            s_idx += 4  # "{i}번: " length
            e_idx = response.find(f"{i + 1}번: ")
            if e_idx == -1:  # not exist -> last data
                e_idx = len(response)
            raw_json = response[s_idx:e_idx]
            json_object = json.loads(raw_json)
            with open(
                f"{OUTPUT_DATA_PATH}/{file_name}_{i}.json", "w", encoding="utf-8"
            ) as json_file:
                json.dump(json_object, json_file, ensure_ascii=False, indent="\t")
