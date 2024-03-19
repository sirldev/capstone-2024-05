import json

with open("secrets.json") as f:
    secrets = json.loads(f.read())


def get_secret(key, secrets=secrets):
    return secrets[key]
