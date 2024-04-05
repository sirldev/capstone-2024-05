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
    - vscode에서는 fastapi로 설정하고 켜달라하면 알아서 켜줘가지고.. 다른 에디터는 잘 모르겠습니다.
