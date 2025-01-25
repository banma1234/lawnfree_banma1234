# 👨‍💻 lawnfree 과제테스트 | 박범수

> ## Contact
>
> **tel.** 010-8606-6857
> **mail.** banma1234@gmail.com

<br/>

## 📦 Usage

`Docker` 를 활용해 테스트서버를 구성, 웹앱을 실행합니다.

```bash
$ docker-compose up --build
```

이후 터미널의 안내에 따라 `localhost` 주소를 통해 앱을 실행하시면 되겠습니다.

<br/>

Docker가 없는 환경이라면 `git clone`을 활용한 일반적인 방법으로 웹앱을 실행합니다.

```bash
$ git clone https://github.com/banma1234/lawnfree_banma1234.git ~폴더명~
```

pnpm 모듈이 없다면 반드시 설치 후 모듈을 설치해주셔야 합니다.

```bash
$ npm install -g pnpm
$ pnpm install
```

```bash
$ pnpm run dev

or

$ pnpm run build
$ pnpm run start
```

<br/>

## 📋 Description

`Next.js 15+` 과 `React.19` 를 주축으로 한 `블로그 플랫폼` 웹앱 입니다.

<br/>

다음 기능을 수행합니다.

- 메인페이지에서 `게시물 목록`을 조회합니다. 원하는 게시물을 클릭해 해당 게시물의 `상세보기 페이지`로 이동 가능합니다.
- 상세보기 페이지에서 게시물의 `수정`, `삭제`가 가능합니다. 게시물의 삭제는 메인페이지의 `게시물 목록`에서도 가능합니다

<br/>

다음과 같은 사항을 고려하였습니다.

- `CSR`과 `SSG`를 적절히 활용하여 페이지 로딩 딜레이를 개선함으로 사용자 경험을 고려하였습니다. 앱을 `build`하여 이를 확인하실 수 있습니다.
- `meta data`와 페이지 라우팅을 `동적`으로 관리하여 Next.js의 장점을 최대한 활용하였습니다.
- `반응형 디자인`을 차용하여 모바일, 타블렛, PC 등 다양한 디바이스에서 앱을 사용 가능 하도록 하였습니다.
- 원활한 공유/배포를 위하여 `Docker`를 활용하였습니다. 플랫폼의 구분 없이 다양한 디바이스에서 `테스트 서버 구성` 및 `빌드`가 가능합니다.

<br/>

## 🎨 shadCn Components

활용한 `shadCn` 컴포넌트는 다음과 같습니다.

![대충 사진]()

<br/>

## state-management
