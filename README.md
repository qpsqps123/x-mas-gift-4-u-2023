# X Mas Gift 4 U.

2023 크리스마스를 맞이해, 아내를 위해 준비한 선물 랜덤 추첨 서비스입니다.
산타가 내는 문제들을 모두 맞추면, 산타가 랜덤 박스를 선물합니다.
랜덤 박스를 클릭하면 무작위로 선별된 선물이 튀어나와, 안에 있는 선물이 무엇인지 알게 됩니다.

배포 주소는 https://x-mas-gift-4-u-2023.vercel.app/ 입니다.

정답 확인은 https://github.com/qpsqps123/x-mas-gift-4-u-2023/blob/main/src/constants/answerList.js 에서 할 수 있습니다.

## 주요 기능

### 오프닝 & 화면 전환 애니메이션

![Opening animation and transition animation example](./public/images/readme/x-mas-gift-4-u-2023-readme-openingAndTransition.gif)

### 주관식 문제

![Short answer question example](./public/images/readme/x-mas-gift-4-u-2023-readme-shortAnswerQuestion.png)

### 객관식 문제

![Multiple choice question example](./public/images/readme/x-mas-gift-4-u-2023-readme-multipleChoiceQuestion.png)

### 정답인 경우

정답 시 기분 좋은 산타가 표시됩니다.

![answer response example](./public/images/readme/x-mas-gift-4-u-2023-readme-answerResponse.gif)

### 오답인 경우

오답 시 슬픈 산타와 함께 알림이 표시됩니다. 알림에는 디바운싱이 적용되었습니다.

![Invalid answer response example](./public/images/readme/x-mas-gift-4-u-2023-readme-invalidAnswerResponse.gif)

### 선물 랜덤 추첨

선물 박스를 누르면 랜덤 추첨이 진행됩니다.

![Opening random box example](./public/images/readme/x-mas-gift-4-u-2023-readme-openRandomBox.gif)

### 중복 추첨 방지

추첨 선물 결과와 개봉 시간을 Firebase로 보내 중복 추첨을 방지합니다.

![Prevent duplicate drawing through posting gift data to Firebase example](./public/images/readme/x-mas-gift-4-u-2023-readme-postGiftData.gif)

### 비정상적인 접근 방지

URL을 통한 비정상적인 접속을 방지합니다.

![Preventing invalid access example](./public/images/readme/x-mas-gift-4-u-2023-readme-invalidAccess.gif)

## 기술 스택

<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white"> <img src="https://img.shields.io/badge/CSS%20Module-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">  
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
