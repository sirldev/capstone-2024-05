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

    - [출처](https://taptorestart.tistory.com/entry/FastAPI-%EB%94%94%EB%A0%89%ED%84%B0%EB%A6%AC-%EA%B5%AC%EC%A1%B0%EB%A5%BC-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%95%98%EB%8A%94-%EA%B2%8C-%EC%A2%8B%EC%9D%84%EA%B9%8C)
    - fastAPI 개발자의 제안사항이다.
    - /api : 엔드포인트별로 파일 구분
        - endpoints: items.py, login.py, users.py, utils.py
    - /core: 공통 파일 config.py, security.py, celery_app.py
    - /crud: 기본 get, create, update, remove base.py, crud_item.py, crud_user.py
    - /db: 데이터베이스 관련 파일 base.py, base_class.py, init_db.py, session.py
    - /models: 데이터베이스 테이블과 매칭되는 모델 item.py, user.py
    - /schemas: 스프링의 DTO와 비슷 item.py, user.py, msg.py, token.py
    - /tests: 테스트 파일

    위 내용을 참고하여 구조화 했다. (개발과정에서 수정될 가능성이 매우 높다.)
