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
                    "content": f"{config['prompt']['instruction_generation']}\n```\n{document}",
                },
            ],
        )
        original_response = completion.choices[0].message.content
        response = original_response
        for i in range(1, 4):
            try:
                s_idx = response.find("```json")
                e_idx = response.find("```", 3)
                s_idx += 7  # "```json" length
                raw_json = response[s_idx:e_idx]
                json_object = json.loads(raw_json)
                response = response[e_idx + 3 :]
                with open(
                    f"{OUTPUT_DATA_PATH}/{file_name}_{i}.json", "w", encoding="utf-8"
                ) as json_file:
                    json.dump(json_object, json_file, ensure_ascii=False, indent="\t")
            except Exception as e:
                with open("./parsing_error.txt", "a") as file:
                    file.write(f"{file_name}_{i}.json" + "\n")
                    file.write(str(e) + "\n")
                    file.write(original_response + "\n")
                    file.write("\n")
