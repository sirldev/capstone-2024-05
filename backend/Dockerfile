FROM ubuntu:22.04

RUN apt-get update && apt-get upgrade -y

# install python 3.10
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa -y
RUN apt install python3.10
RUN apt install -y python3-pip

COPY . .

RUN pip3 install -r requirements.txt

WORKDIR /app

EXPOSE 8000