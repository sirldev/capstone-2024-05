 <img width=300 style="margin-top: 6px;" src="https://github.com/kookmin-sw/capstone-2024-05/assets/81635179/2bbcbe69-8e55-4c46-b214-dd3f0e27206a?raw=true" >


> 2024 KookminUniv SW 캡스톤 디자인 5조  
> Github page : [https://kookmin-sw.github.io/capstone-2024-05/](https://kookmin-sw.github.io/capstone-2024-05/)

<br/>
<br/>

## 📔 목차
- [💡 프로젝트 소개](#-프로젝트-소개)
- [🛠️ 기술스택](#-기술스택)
- [💻 서비스 구조도](#-서비스-구조도)
- [📌 주요 기능](#-주요-기능)
- [🧑‍💻 팀 소개](#-팀-소개)


<br/>

### ​

## 💡 프로젝트 소개

<img width=600 src="https://github.com/kookmin-sw/capstone-2024-05/assets/81635179/fcfcbdec-b046-4d95-b35b-8220cd13223c">

<br />

### 프로젝트 목표
사용자가 입력한 자연어를 바탕으로 Amazon Web Services(AWS) CloudFormation의 Template을 생성하여 복잡한 문법을 익히지 않고도 클라우드 인프라 관리를 돕는 서비스를 개발하는 것입니다.  
[AWS CloudFormation이란?](https://docs.aws.amazon.com/ko_kr/AWSCloudFormation/latest/UserGuide/Welcome.html)

<br />

### 프로젝트 개발 배경
CloudFormation은 AWS 리소스를 자동으로 생성해 주는 서비스입니다. 사용하려는 AWS 리소스를 템플릿 파일로 작성하면, CloudFormation이 이를 분석하여 AWS 리소스를 생성합니다. 하지만 CloudFormation 서비스를 사용하기 위해서는 먼저 CloudFormation의 개념과 템플릿 언어를 학습하여야 합니다. 또 템플릿이 길고 복잡해질 경우 오류를 찾기 힘들고 관리하기가 어려워집니다. 우리는 이에 불편함을 느끼고 CloudFormation의 구체적인 문법을 모르더라도, 자연어를 통해 AWS 인프라를 구성할 수 있는 서비스를 개발하기로 하였습니다.

<br />

### 소개 영상
[<img width=600 src="https://github.com/kookmin-sw/capstone-2024-05/assets/81635179/bbcb5d29-7b9a-40bd-bf60-066fdaa544d7">](https://youtu.be/4CN9mUhLxfo) 

<!-- [![소개 영상](https://github.com/kookmin-sw/capstone-2024-05/assets/81635179/43c4b6ed-c02e-4522-b842-2e4592baabea)](https://youtu.be/4CN9mUhLxfo)  -->

<br />

### 기대 효과
#### 생산성 증가
7,000개가 넘는 AWS CloudFormation 문서를 읽고 이해하지 않아도 쉽고 빠르게 인프라를 구성할 수 있습니다.
#### 정확도 증가
AWS CloudFormation에 특화된 서비스로 기존 GPT-4 모델에 비해 정확하고 신뢰성 있는 템플릿을 생성합니다.
#### 재사용성 증가
생성된 템플릿을 다른 사용자가 재사용 할 수 있고, LLM fine-tuning을 위한 학습 데이터로 활용할 수 있습니다.

<br/>
<br/>



## 📌 주요 기능

<img width=600 src="https://github.com/kookmin-sw/capstone-2024-05/assets/81635179/66ef5327-8c5f-46d3-83ea-ca7811fe2819">

### 템플릿 생성
RAG 기법을 적용하기 위해, 사용자 prompt를 바탕으로 관련이 있는 AWS CloudFormation 공식 문서를 검색합니다. 사용자 프롬프트와 검색된 관련 문서를 함께 GPT-4 API에 요청하여 템플릿을 생성합니다.

### 유효성 검증
생성한 템플릿은 Validation API를 호출하여 유효성을 확인합니다. 유효하지 않은 템플릿은 Self-Feedback을 통해 스스로 개선 후 다시 유효성을 확인합니다. 결과적으로 유효한 템플릿만을 사용자에게 반환합니다.

<img width=600 src="https://github.com/kookmin-sw/capstone-2024-05/assets/81635179/2333b76a-1238-4abe-9163-9326c89d15af">

### 템플릿 에디터
생성된 템플릿은 JSON 형식에 맞게 구조화 되어 사용자에게 보여집니다. 환경 변수 등 private value를 즉각적으로 수정할 수 있습니다. 수정한 Template은 JSON 파일로 다운받아 바로 AWS CloudFormation에서 사용할 수 있습니다.

<img width=600 src="https://github.com/kookmin-sw/capstone-2024-05/assets/81635179/577a46ec-92be-43f4-bd5a-5df79561d9f1">

### Template Hub
생성된 템플릿은 사용자 간 공유할 수 있습니다. 템플릿을 생성할 때 AWS 리소스 기반 Hashtag를 추출합니다. 사용자들은 Template Hub에서 Hashtag 기반으로 검색하여 필요한 템플릿을 찾을 수 있습니다.

<br /> <br />

## 🛠️ 기술스택

### 🤖 AI

<div markdown="1" style="text-align:center">

<table>
  <tr>
    <td><strong>Framework</strong></td>
    <td><img src="https://img.shields.io/badge/🦜 LangChain-294444?style=&logo=LangChain&logoColor=white" style="margin-top: 6px;"/></td>
  </tr>
</table>

</div>

<br />

### 💾 Backend

<div markdown="1" style="text-align:center">

<table>
  <tr>
    <td><strong>Framework</strong></td>
    <td><img src="https://img.shields.io/badge/FastAPI-009688?style=&logo=fastapi&logoColor=white" style="margin-top: 6px;"/></td>
  </tr>
  <tr>
    <td><strong>Database</strong></td>
    <td><img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=&logo=postgreSQL&logoColor=white" style="margin-top: 6px;"/> <img src="https://img.shields.io/badge/Pinecone-%23121011.svg?style=&logo=pinecone&logoColor=white" style="margin-top: 6px;"/>
    </td>
  </tr>
</table>

</div>

<br />

### 🖥️ Frontend

<div markdown="1" style="text-align:center">

<table>
  <tr>
    <td><strong>Framework</strong></td>
    <td><img src="https://img.shields.io/badge/Next.js-000000?style=e&logo=nextdotjs&logoColor=white" style="margin-top: 6px;"/></td>
  </tr>
</table>

</div>

<br />

### ♾️ DevOps

<div markdown="1" style="text-align:center">

<table>
  <tr>
    <td><strong>Cloud</strong></td>
    <td><img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=e&logo=amazonaws&logoColor=white" style="margin-top: 6px;"/></td>
  </tr>
  <tr>
    <td><strong>CI/CD</strong></td>
    <td><img src="https://img.shields.io/badge/Github Actions-2088FF.svg?&style=&logo=githubactions&logoColor=white" style="margin-top: 6px;"/></td>
  </tr>
</table>

</div>

<br />

### 📚 Tools

<div markdown="1" style="text-align:center">

<table>
  <tr>
    <td><strong>Version Control</strong></td>
    <td><img src="https://img.shields.io/badge/git-E6484F.svg?style=&logo=git&logoColor=white" style="margin-top: 6px;"/> <img src="https://img.shields.io/badge/github-%23121011.svg?style=&logo=github&logoColor=white" style="margin-top: 6px;"/></td>
  </tr>
  <tr>
    <td><strong>Project Management</strong></td>
    <td><img src="https://img.shields.io/badge/Notion-000000.svg?&style=&logo=Notion&logoColor=white" style="margin-top: 6px;"/></td>
  </tr>
  <tr>
    <td><strong>Design</strong></td>
    <td><img src="https://img.shields.io/badge/Figma-F24E1E.svg?&style=&logo=Figma&logoColor=white" style="margin-top: 6px;"/></td>
  </tr>
</table>

</div>

<br />

<br/>

## 💻 서비스 구조도

![orderFlow_1](https://github.com/kookmin-sw/capstone-2024-05/assets/81635179/673c3dbd-a059-4959-a0d4-ab4851bad77b)

<br/><br/>

<br/><br/>

## 🧑‍💻 팀 소개

- 윤상원[팀장]
> - 학번 : 20181651
> - position : AI [Leader], BE
> - Email : yoonsw0532@kookmin.ac.kr

- 하준혁 
> - 학번 : 20181705
> - position : FE [Leader], BE
> - Email : sirl@kookmin.ac.kr

- 성창엽
> - 학번 : 20191611
> - position : BE [Leader], AI
> - Email : scy6500@kookmin.ac.kr

- 이현승
> - 학번 : 20191653
> - position : AI, BE
> - Email : dlgustmd3590@kookmin.ac.kr

- 홍승현
> - 학번 : 20213100
> - position : FE
> - Email : ghdtmdgus100@kookmin.ac.kr