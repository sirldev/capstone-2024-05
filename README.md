# Stack OrderFlow

> 2024 KookminUniv SW 캡스톤 디자인 5조  
> Github page : [https://kookmin-sw.github.io/capstone-2024-05/](https://kookmin-sw.github.io/capstone-2024-05/)

<br/>
<br/>

## 📔 목차
- [💡 프로젝트 소개](#💡-프로젝트-소개)
- [🛠️ 기술스택](#🛠️-기술스택)
- [💻 서비스 구조도](#💻-서비스-구조도)
- [📌 주요 기능](#📌-주요-기능)
- [🧑‍💻 팀 소개](#🧑‍💻-팀-소개)
<!-- - [✏️ 사용법](#-사용법)
- [📹 시연 영상](#-시연-영상) -->

<br/>
<br/>

## 💡 프로젝트 소개

### 프로젝트 목표
Amazon Web Services(AWS) CloudFormation 서비스의 템플릿 파일을 사용자 입력한 자연어를 통하여 생성하여 AWS 리소스 생성에 도움을 주는 프로젝트입니다.   
[AWS CloudFormation이란?](https://docs.aws.amazon.com/ko_kr/AWSCloudFormation/latest/UserGuide/Welcome.html)

### 프로젝트 개발 배경
CloudFormation은 AWS 리소스를 자동으로 생성해 주는 서비스입니다. 사용하려는 AWS 리소스를 템플릿 파일로 작성하면, CloudFormation이 이를 분석해서 AWS 리소스를 생성합니다. 하지만 CloudFormation 서비스를 사용하기 위해서는 먼저 CloudFormation의 개념과 템플릿 언어를 학습하여야 합니다. 또 템플릿이 길고 복잡해질 경우 오류를 찾기 힘들고 관리하기가 어려워집니다. 우리는 이에 불편함을 느끼고 CloudFormation의 구체적인 문법을 모르더라도, 자연어를 통해 AWS 인프라를 구성할 수 있는 서비스를 개발하기로 하였습니다.

### 기대 효과
* **진입장벽 완화** : 자연어 처리를 통한 CloudFormation 템플릿 생성으로 템플릿 생성에 필요한 언어와 문법에 대한 학습의 진입장벽을 낮출 수 있습니다.
* **인프라 구축 시간 단축** : 복잡한 JSON 또는 YAML 템플릿을 직접 작성하는 대신, 자연어로 원하는 인프라의 설명을 입력하기만 하면 되므로 인프라 구축에 필요한 시간을 줄일 수 있습니다.
* **오류 감소** : **'Stack OrderFlow'** 를 통해 생성된 템플릿은 유효성 검사를 진행하므로, 사용자가 직접 템플릿을 작성했을 때 발생할 수 있는 실수를 방지할 수 있습니다.
* **지식 공유** : 템플릿 파일 허브 기능을 통해 사용자들은 다른 사람들이 어떤 요구사항으로 어떤 템플릿을 생성했는지 볼 수 있어, 리소스 관리에 대한 지식과 영감을 얻을 수 있습니다.

<br/>
<br/>

## 🛠️ 기술스택

### 🤖 AI
<div style="text-align:center">
  <table >
    <tr>
      <td><strong>Framework</strong></td>
      <td><img src="https://img.shields.io/badge/LangChain-294444?style=&logo=LangChain&logoColor=white" style="margin-top: 6px;"/>
    </tr>
    <tr>
      <td><strong>Library</strong></td>
      <td><img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=&logo=pytorch&logoColor=white" style="margin-top: 6px;"/>
    </tr>
   </table>     
  </div>
<br />

### 💾 Backend
<div style="text-align:center">
  <table >
    <tr>
      <td><strong>Framework</strong></td>
      <td><img src="https://img.shields.io/badge/FastAPI-009688?style=&logo=fastapi&logoColor=white" style="margin-top: 6px;"/>
    </tr>
    <tr>
      <td><strong>Database</strong></td>
      <td><img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=&logo=postgreSQL&logoColor=white" style="margin-top: 6px;"/>
    </tr>
   </table>     
  </div>
<br />

### 🖥️ Frontend
<div style="text-align:center">
  <table >
    <tr>
      <td><strong>Framework</strong></td>
      <td><img src="https://img.shields.io/badge/Next.js-000000?style=e&logo=nextdotjs&logoColor=white" style="margin-top: 6px;"/>
    </tr>
   </table>     
  </div>
  <br />


### 📚 Tools
<div style="text-align:center">
  <table>
  <tr>
      <td><strong>Version Control</strong></td>
      <td><img alt="RED" src ="https://img.shields.io/badge/git-E6484F.svg?style=&logo=git&logoColor=white" style="margin-top: 6px;"/>  <img alt="RED" src ="https://img.shields.io/badge/github-%23121011.svg?style=&logo=github&logoColor=white style="margin-top: 6px;""/> </td>
    </tr>
    <tr>
      <td><strong>Project Management</strong></td>
      <td><img alt="RED" src ="https://img.shields.io/badge/Notion-000000.svg?&style=&logo=Notion&logoColor=white" style="margin-top: 6px;"/></td>
    </tr>
    <tr>
      <td><strong>Design</strong></td>
      <td><img alt="RED" src ="https://img.shields.io/badge/Figma-F24E1E.svg?&style=&logo=Figma&logoColor=white" style="margin-top: 6px;"/></td>
    </tr>
   </table>  
  </div>
<br />

<br/>

## 💻 서비스 구조도



<br/><br/>

## 📌 주요 기능

* 사용자 프롬프트 기반 템플릿 생성


* 템플릿 유효성 검사 
   

* 템플릿 허브   
	* 사용자의 서비스 이용 사례 저장 및 공유

* 템플릿 수정 기능
	* 사용자가 직접 Template에 내용을 추가 / 삭제할 수 있는 기능



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
> - 학번 : 2019
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

