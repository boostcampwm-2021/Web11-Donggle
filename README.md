<div align="center"><img src="https://user-images.githubusercontent.com/31230442/139629313-9558b15d-ee66-44d8-a5ab-20e07a0d332c.png" width="200px" alt="동글" /></div>

## 목차

- [목차](#목차)
- [🗺 프로젝트 소개](#-프로젝트-소개)
  - [데모](#데모)
  - [프로젝트 시작 계기](#프로젝트-시작-계기)
  - [프로젝트 내용](#프로젝트-내용)
  - [기술적 도전](#기술적-도전)
- [🛠 기술 스택](#-기술-스택)
- [🗿 프로젝트 멤버](#-프로젝트-멤버)
- [📚 위키](#-위키)

<br/>

## 🗺 프로젝트 소개

<div align="center"><img width="75%" alt="image" src="https://user-images.githubusercontent.com/55529617/215254756-7548067c-54fc-4b1f-858a-531c51202030.png"></div>

내 동네를 평가하고 지도에서 한눈에 다른 동네의 평점과 후기를 볼 수 있는 서비스 입니다.

프로젝트 및 기술, 협업 관련 자세한 내용은 [Donggle Notion](https://cooperative-decision-4e6.notion.site/d2eb2062764c4e45a229af84bae35515)에서 확인하실 수 있습니다.


### 데모

- [데모영상](https://www.youtube.com/watch?v=GMe61zuP8po)
- https://boost.boost-donggle.kro.kr/ (미운영)

### 프로젝트 시작 계기

- 내가 살고있는 동네를 소개해 보고 싶다!
- 다른 동네는 어떤지 알고 싶다!

### 프로젝트 내용

- 지도에서 동네별 평점을 한 눈에 확인할 수 있는 서비스!
- 확대/축소에 따라 동네 단위(도, 시/군/구, 동) 실시간 변경
- 내가 살고 있는 동네의 평점과 후기를 작성하고 공유

### 기술적 도전

- 행정구역 폴리곤 렌더링 최적화 과정
  - Document 구조 고민과 인덱싱
  - 상태 관리/ LFU 캐싱 기반 API 요청 줄이기
  - SWR을 활용한 캐싱 일반화
- Lazy Loading을 통한 첫 렌더링 최적화
- React.memo와 React Router 고려한 웹 최적화
- Intersection Observer API를 활용한 무한 스크롤
- JWT HTTPS Cookie 사용해 보안을 고려한 로그인
- Nginx와 Github Action을 이용한 CD
- Docker와 Docker Compose를 이용한 인프라 구성

<br/>

## 🛠 기술 스택

<div align="center">
  
| Front | Back | Infra |
| :---: | :---: | :---: |
| <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-764ABC?style=flat-square&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/styled--components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/geolocation--api-4285F4?style=flat-square&logo=google-maps&logoColor=white"/> <img src="https://img.shields.io/badge/Naver/Kakao--map-00ACC1?style=flat-square&logo=OpenStreetMap&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/> <img src="https://img.shields.io/badge/jest-23C213?style=flat-square&logo=jest&logoColor=white"/> | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/> <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white"/> | <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/> <img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=PM2&logoColor=white"/> <img src="https://img.shields.io/badge/Naver Cloud-03C75A?style=flat-square&logo=Naver&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/> <img src="https://img.shields.io/badge/Github Actions-2088FF?style=flat-square&logo=Github Actions&logoColor=white"/> |

</div>
<br/>

## 🗿 프로젝트 멤버

<div align="center">

|                       <img src="https://avatars.githubusercontent.com/u/55529617?v=4" width="100px">                       | <img src="https://github.com/mhsong95.png" width="100px"> | <img src="https://github.com/isanghaessi.png" width="100px"> | <img src="https://github.com/hongjw1938.png" width="100px"> |
| :------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------: | :----------------------------------------------------------: | :---------------------------------------------------------: |
| [J077 문혜현](https://www.notion.so/15-30-Web11-Donggle-d5df9c3cb5ea4e558c786f687decbd5a#a99beecf2fa44f38971036b05bb3ea4d) |        [J107\_송명회](https://github.com/mhsong95)        |        [J218 홍승용](https://github.com/isanghaessi)         |        [J219 홍종우](https://github.com/hongjw1938)         |

</div>
<br/>

## 📚 위키

<div align="center">

| 🤝 규칙                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 📝 명세서                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 🗂 백로그                                                                                                                                            | 🏃‍♂️ 스프린트                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 🙋‍♂️ 회의록                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 👯‍♀️ 스크럼                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <ul><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/팀-목표">팀 목표</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/그라운드-룰">그라운드 룰</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/git-전략">git 전략</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/네이밍-룰">네이밍 룰</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/React-코드-포맷">React 코드 포맷</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/ESLint&Prettier">ESLint&Prettier</a></li></ul> | <ul><li><a href="https://www.figma.com/file/Jnu0QBCLdbRJ94G5jhzl8F/%EB%8F%99%EB%84%A4%ED%9B%84%EA%B8%B0?node-id=0%3A1">디자인 명세서</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/ERD">ERD</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/인프라 구조">인프라 구조</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/프로젝트 폴더 구조">프로젝트 폴더 구조</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/API 명세서">API 명세서</a></li></ul> | <ul><li><a href="https://docs.google.com/spreadsheets/d/1dt-VD4Iwxucy0ygJFUK-5dqbiBJOHNPNBY00G2yfRPo/edit#gid=0">백로그 스프레드 시트</a></li></ul> | <ul><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/2주차 스프린트">2주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/3주차 스프린트">3주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/4주차 스프린트">4주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/5주차 스프린트">5주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/6주차 스프린트">6주차</a></li></ul> | <ul><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/1주차 회의록">1주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/2주차 회의록">2주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/3주차 회의록">3주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/4주차 회의록">4주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/5주차 회의록">5주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/6주차 회의록">6주차</a></li></ul> | <ul><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/1주차 스크럼">1주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/2주차 스크럼">2주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/3주차 스크럼">3주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/4주차 스크럼">4주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/5주차">5주차</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/6주차 스크럼">6주차</a></li></ul> |

</div>
