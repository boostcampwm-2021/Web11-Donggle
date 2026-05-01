<div align="right">
  <a href="https://github.com/boostcampwm-2021/Web11-Donggle">Korean</a> | <b>English</b>
</div>

<div align="center"><img src="https://user-images.githubusercontent.com/31230442/139629313-9558b15d-ee66-44d8-a5ab-20e07a0d332c.png" width="200px" alt="Donggle" /></div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [🗺 About the Project](#-about-the-project)
  - [Demo](#demo)
  - [Motivation](#motivation)
  - [Project Details](#project-details)
  - [Technical Challenges](#technical-challenges)
- [🛠 Tech Stack](#-tech-stack)
- [🗿 Project Members](#-project-members)
- [📚 Wiki](#-wiki)

<br/>

## 🗺 About the Project

<div align="center"><img width="75%" alt="image" src="https://user-images.githubusercontent.com/55529617/215254756-7548067c-54fc-4b1f-858a-531c51202030.png"></div>

A service that allows you to rate your neighborhood and view ratings and reviews of other neighborhoods at a glance on a map.

For more details regarding the project, technical decisions, and collaboration, please visit our [Donggle Notion](https://cooperative-decision-4e6.notion.site/d2eb2062764c4e45a229af84bae35515).

### Demo

- [Demo Video](https://www.youtube.com/watch?v=GMe61zuP8po)
- https://boost.boost-donggle.kro.kr/ (Offline)

### Motivation

- I want to introduce the neighborhood I live in!
- I want to know what other neighborhoods are like!

### Project Details

- A service where you can check neighborhood ratings at a glance on a map!
- Real-time boundary updates (Province, City/District, Neighborhood) based on zoom levels.
- Write and share ratings and reviews about your own neighborhood.

### Technical Challenges

- Optimizing the rendering of administrative district polygons
  - Designing document structures and indexing
  - State management / Reducing API requests based on LFU caching
  - Generalizing caching using SWR
- Optimizing initial rendering via Lazy Loading
- Web optimization considering React.memo and React Router
- Implementing infinite scrolling using the Intersection Observer API
- Secure login implementation using JWT and HTTPS Cookies
- Continuous Deployment (CD) using Nginx and Github Actions
- Infrastructure setup using Docker and Docker Compose

<br/>

## 🛠 Tech Stack

<div align="center">
  
| Front | Back | Infra |
| :---: | :---: | :---: |
| <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-764ABC?style=flat-square&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/styled--components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/geolocation--api-4285F4?style=flat-square&logo=google-maps&logoColor=white"/> <img src="https://img.shields.io/badge/Naver/Kakao--map-00ACC1?style=flat-square&logo=OpenStreetMap&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/> <img src="https://img.shields.io/badge/jest-23C213?style=flat-square&logo=jest&logoColor=white"/> | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/> <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white"/> | <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/> <img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=PM2&logoColor=white"/> <img src="https://img.shields.io/badge/Naver Cloud-03C75A?style=flat-square&logo=Naver&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/> <img src="https://img.shields.io/badge/Github Actions-2088FF?style=flat-square&logo=Github Actions&logoColor=white"/> |

</div>
<br/>

## 🗿 Project Members

<div align="center">

|                       <img src="https://avatars.githubusercontent.com/u/55529617?v=4" width="100px">                       | <img src="https://github.com/mhsong95.png" width="100px"> | <img src="https://github.com/isanghaessi.png" width="100px"> | <img src="https://github.com/hongjw1938.png" width="100px"> |
| :------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------: | :----------------------------------------------------------: | :---------------------------------------------------------: |
| [J077 Moon Hyehyeon](https://www.notion.so/15-30-Web11-Donggle-d5df9c3cb5ea4e558c786f687decbd5a#a99beecf2fa44f38971036b05bb3ea4d) |        [J107 Song Myeonghoe](https://github.com/mhsong95)        |        [J218 Hong Seungyong](https://github.com/isanghaessi)         |        [J219 Hong Jongwoo](https://github.com/hongjw1938)         |

</div>
<br/>

## 📚 Wiki

<div align="center">

| 🤝 Rules                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 📝 Specifications                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 🗂 Backlog                                                                                                                                            | 🏃‍♂️ Sprints                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 🙋‍♂️ Meeting Minutes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 👯‍♀️ Scrums                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <ul><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/팀-목표">Team Goals</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/그라운드-룰">Ground Rules</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/git-전략">Git Strategy</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/네이밍-룰">Naming Conventions</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/React-코드-포맷">React Code Format</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/ESLint&Prettier">ESLint & Prettier</a></li></ul> | <ul><li><a href="https://www.figma.com/file/Jnu0QBCLdbRJ94G5jhzl8F/%EB%8F%99%EB%84%A4%ED%9B%84%EA%B8%B0?node-id=0%3A1">Design Specifications</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/ERD">ERD</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/인프라 구조">Infrastructure Architecture</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/프로젝트 폴더 구조">Project Folder Structure</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/API 명세서">API Specifications</a></li></ul> | <ul><li><a href="https://docs.google.com/spreadsheets/d/1dt-VD4Iwxucy0ygJFUK-5dqbiBJOHNPNBY00G2yfRPo/edit#gid=0">Backlog Spreadsheet</a></li></ul> | <ul><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/2주차 스프린트">Week 2</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/3주차 스프린트">Week 3</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/4주차 스프린트">Week 4</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/5주차 스프린트">Week 5</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/6주차 스프린트">Week 6</a></li></ul> | <ul><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/1주차 회의록">Week 1</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/2주차 회의록">Week 2</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/3주차 회의록">Week 3</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/4주차 회의록">Week 4</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/5주차 회의록">Week 5</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/6주차 회의록">Week 6</a></li></ul> | <ul><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/1주차 스크럼">Week 1</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/2주차 스크럼">Week 2</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/3주차 스크럼">Week 3</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/4주차 스크럼">Week 4</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/5주차">Week 5</a></li><li><a href="https://github.com/boostcampwm-2021/WEB11/wiki/6주차 스크럼">Week 6</a></li></ul> |

</div>