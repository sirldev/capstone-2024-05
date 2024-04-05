from typing import Union
import typer
import subprocess
import json

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse(request=request, name="main.html")


@app.get("/items/{id}", response_class=HTMLResponse)
async def read_item(request: Request, id: int):

    return templates.TemplateResponse(
        request=request, name="item.html", context={"id": id}
    )


@app.get("/template_validation/{file_name}", response_class=HTMLResponse)
def validation_template(request: Request, file_name: str):
    # print(file_name)
    validation_cmd = [
        "aws",
        "cloudformation",
        "validate-template",
        "--template-body",
        "file://examples/" + file_name,
    ]

    with open(f"./examples/{file_name}", "r") as file:
        content = file.read()

    cmd = " ".join(validation_cmd)
    # print(cmd)

    result = subprocess.run(validation_cmd, capture_output=True, text=True)
    print(result)

    if result.returncode:
        return templates.TemplateResponse(
            request=request,
            name="template-validation-fail.html",
            context={
                "title": file_name,
                "result": result.stderr,
                "cmd": cmd,
                "content": content,
            },
        )
    else:
        return templates.TemplateResponse(
            request=request,
            name="template-validation-success.html",
            context={
                "title": file_name,
                "result": json.loads(result.stdout),
                "cmd": cmd,
                "content": content,
            },
        )
