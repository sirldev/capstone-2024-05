# Template Validation API

### AWS CLI Configure

    1. aws 접속 후 IAM(Identity and Access Management) 접속
    2. 사용자 - 사용자 생성
    3. 권한 정책 - 권한추가
        - cloudformation 검색 후 나온거 전부 추가함. (에러 나오면서 두 개인가 빠짐)
    4. 보안자격증명 - 액세스 키 만들기
    5. 콘솔에서 aws configure 실행한 뒤
        - AWS Access Key ID 입력
        - AWS Secret Access KEy 입력
        - Default region name : ap-northeast-2 입력
        - Default output format : json 입력

### How to install (without Docker)

- repository clone

```shell
git clone https://github.com/kookmin-sw/capstone-2024-05.git
```

- Backend 디렉토리로 이동

```shell
cd backend
```

- Python 가상 환경 설정

```shell
python -m venv .venv
source venv/bin/activate

```

- 필요한 package 설치

```shell
pip install -r requirements.txt
```

- AWS CLI Configure 설정

- 실행

```shell
cd app
uvicorn main:app --host=0.0.0.0 --port=8000
```

### How to install (with Docker)

- repository clone

```shell
git clone https://github.com/kookmin-sw/capstone-2024-05.git
```

- Backend 디렉토리로 이동

```shell
cd backend
```

- Docker 빌드 후 내부 컨테이너 진입

```shell
docker build . -t [image name]
docker run -it -p [host port]:8000 --env-file .env [image name]
```

- AWS CLI Configure 설정

- 실행

```shell
cd app
uvicorn main:app --host=0.0.0.0 --port=8000
```

### ENV

DB_URL

ACCESS_TOKEN_EXPIRE_MINUTES

SECRET_KEY

ALGORITHM

PINECONE_APIKEY

OPENAI_APIKEY

### 서버 디렉토리 구조

    - /app
        - /api : Functional APIs
            - /routes
                - hashtag.py
                - templates.py
                - users.pu
            - router.py
        - /db : Database Management
            - database.py
            - models.py
        - /retrieval : RAG Implementation
            - init_vector_db.py
            - markdown_splitter.py
            - rag_prototype.py
            - rag.py
            - settings.py
        - /static : Static Files
            - /examples
                - example-error.json
                - example-valid.json
            - tmp.json
        - /templates : HTML Templates
            - main.html
        - /utils : Utility Modules
            - auth.py
            - gpt.py
            - setup.py
        - main.py
    - .env
    - README.md
    - requirements.txt
    - Dockerfile
