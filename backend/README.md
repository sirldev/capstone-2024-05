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

### requirments 설치하기

    - pip install -r requirements.txt

### 서버 실행하기

    - main함수 실행하면 됨.
    - app폴더로 이동 후
    - uvicorn main:app --reload

### 서버 디렉토리 구조

    - /app
        - /api : API 코드가 모여있는 폴더입니다.
            - /routes : domain별로 구분하여 개발 중입니다.
                - templates.py
                - users.pu
            - main.py
        - /db : 데이터베이스 관련 코드가 모여있는 폴더입니다.
            - database.py : 현재 운영중인 DB를 연결하는 코드입니다.
                - DB의존성 주입을 위한 get_db 메서드가 있습니다.
                    - 세션 생성, 운영, 종료를 처리해주는 함수입니다.
                    - DB사용 시에는 이 메서드 사용해주시면 됩니다.
                    - api 메서드 파라미터에 db: Session = Depends(get_db) 작성해주시고 db 객체 사용해주시면 됩니다.
            - models.py
        - /retrieval
            - init_vector_db.py
            - markdown_splitter.py
            - rag_prototype.py
            - rag.py
            - settings.py
        - /static
            - /examples
                - example-error.json
                - example-valid.json
            - style.css
        - /templates
            - item.html
            - main.html
            - template-validation-fail.html
            - template-validation-success.html
        - /utils
            - gpt.py
            - setup.py
        - main.py
    - .env
        : 데이터베이스 URL을 저장해야합니다. 연락주시면(현승) 별도로 전달드리겠습니다. (DB_URL)
    - README.md
    - requirements.txt
