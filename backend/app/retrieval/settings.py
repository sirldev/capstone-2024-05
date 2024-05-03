import json
import os

with open(os.path.join(os.path.dirname(__file__), "secrets.json")) as f:
    secrets = json.loads(f.read())


def get_secret(key, secrets=secrets):
    return secrets[key]
