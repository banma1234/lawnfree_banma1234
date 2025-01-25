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

![Image](https://github.com/user-attachments/assets/56f1a9f5-3df8-4c37-bdd2-b9a75c1295cb)

일부 컴포넌트는 컴포넌트를 직접 수정하여 사용하였습니다.

<br/>

## 📚 state-management

`zustand`를 활용한 상태관리 로직을 구성하였습니다. zustand를 선택한 이유는 다음과 같습니다.

- 빠르고 간단하게 관련 기능을 구현할 수 있습니다. `Redux`, `ContextApi`에 비해 더 가볍고 적은 코드구성으로 상태관리 로직을 구성할 수 있습니다.
- store의 특정 메소드를 `분할`, `사용`하여 불필요한 랜더링이 발생하지 않습니다.
- `hooks`의 형태로 이용 가능해 편리합니다.

<br/>

각 기능들을 분할하여 각각 호출할 수 있기 때문에 `단일 store`로 로직을 구성하였습니다. store의 구성은 다음과 같습니다.

```typescript
// utils/hooks/store/usePostStore.ts

/**
 * 포스트를 전역으로 관리하는 state store. 제공하는 기능은 다음과 같다.
 * - `posts` : 포스트 `목록` 반환
 * - `addPost` : 포스트 `신규 작성`
 * - `removePost` : 포스트 `삭제`
 * - `editPost` : 포스트 `수정`
 */
interface PostState {
  posts: PostInfo[];
  addPost: (postInfo: PostInfo, content: string) => void;
  removePost: (postId: number) => void;
  editPost: (postInfo: PostInfo, content: string) => void;
}
```

각각의 메소드가 서로 다른 `custom-hooks`로 분할되어 쓰임에 맞게 호출되는 구조입니다.

```tsx
/** @returns 포스트 `목록` 반환 */
export const usePostState = () => usePostStore((state) => state.posts);

/** @returns 신규 포스트 `추가`하는 `메소드` 반환 */
export const usePostStateInput = () => usePostStore((state) => state.addPost);
/** @returns 대상 포스트 `수정`하는 `메소드` 반환 */
export const usePostStateEdit = () => usePostStore((state) => state.editPost);
/** @returns 대상 포스트 `삭제`하는 `메소드` 반환 */
export const usePostStateRemove = () =>
  usePostStore((state) => state.removePost);
```

<br/>

### posts[]

배열 형태의 저장소 입니다. 포스트의 정보 `postInfo`를 저장합니다.

```typescript
export interface PostInfo {
  postId: number;
  title: string;
  uploadDate: string;
}
```

postInfo는 `content`. 즉 포스트의 실제 `내용`을 제외한 정보 객체입니다.

페이지에서 포스트의 `전체 목록`을 출력하거나 `라우팅`, `검색어 필터` 등에 사용할 때에는 가장 큰 용량의 content는 필요 없기 때문입니다. 때문에 `content`는 별도의 `localStorage` 공간에 `postId`를 key로 하여 보관합니다.

```tsx
addPost: (postInfo: PostInfo, content: string) => {
    const KEY = `post-${postInfo.postId}`;
    const postValue = JSON.stringify({ postInfo, content });

    // 포스트의 `content`를 localhost에 저장
    localStorage.setItem(KEY, postValue);

    // `postInfo` 저장
    set((prev: PostState) => ({
        posts: [...prev.posts, postInfo],
    }));
},

```

<br/>

```typescript
const usePostStore = create(
  persist<PostState>(
    //            ~~~~~~~           //
    //            ~~~~~~~           //
    {
      name: `postStore`,
    }
  )
);
```

postInfo는 state로써 `store`에 저장되는 것 외에도 DB가 없는 환겨에서 데이터 영구 보존을 위해 `persist`를 활용해 `postStore`라는 localhost 저장소에 content와는 분리하여 따로 저장합니다.
