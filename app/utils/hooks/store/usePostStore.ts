import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PostInfo } from "@/app/types/postType";

interface PostState {
  posts: PostInfo[];
  addPost: (postInfo: PostInfo, content: string) => void;
  removePost: (postId: number) => void;
  editPost: (postInfo: PostInfo, content: string) => void;
}

/**
 * 포스트를 전역으로 관리하는 state store. 제공하는 기능은 다음과 같다.
 * - 포스트 `목록` 반환
 * - 포스트 `신규 작성`
 * - 포스트 `삭제`
 * - 포스트 `수정`
 */
const usePostStore = create(
  persist<PostState>(
    (set, get) => ({
      /**
       * 포스트 목록
       */
      posts: [],

      /**
       * 신규 포스트를 `추가`하는 메소드. `content`와 `postInfo`를 분리하여 저장한다
       * @param postInfo `content`를 제외한 포스트 정보
       * @param content 포스트의 실질적인 내용
       */
      addPost: (postInfo: PostInfo, content: string) => {
        const KEY = `post-${postInfo.postId}`;
        const postValue = JSON.stringify({ postInfo, content });

        // 포스트의 `content`를 저장
        localStorage.setItem(KEY, postValue);

        // `postInfo` 저장
        set((prev: PostState) => ({
          posts: [...prev.posts, postInfo],
        }));
      },

      /**
       * 대상 포스트를 `삭제`하는 메소드. `postId`에 대응하는 포스트를 삭제한다
       * @param postId
       */
      removePost: (postId: number) => {
        const KEY = `post-${postId}`;
        const posts = get().posts;

        // 대응하는 `content` 삭제
        localStorage.removeItem(KEY);

        // 대상 포스트를 삭제한 후 기존 포스트들의 정보를 업데이트
        const updatedPosts = posts
          .filter((post) => post.postId !== postId)
          .map((post) => {
            const targetKey = `post-${post.postId}`;
            const targetPost = localStorage.getItem(targetKey);

            // 삭제한 포스트보다 뒤에 위치한 포스트들의 `postId` 1 증가
            if (post.postId > postId && targetPost) {
              localStorage.removeItem(targetKey);

              const { content } = JSON.parse(targetPost);
              const updatedPost = { ...post, postId: post.postId - 1 };

              localStorage.setItem(
                `post-${updatedPost.postId}`,
                JSON.stringify({ postInfo: updatedPost, content })
              );

              return updatedPost;
            }

            return post;
          });

        // 업데이트된 포스트의 `postInfo` 업데이트
        set({ posts: updatedPosts });
      },

      /**
       * 대상 포스트를 `수정`하는 메소드
       * @param postInfo
       * @param content
       */
      editPost: (postInfo, content) => {
        const KEY = `post-${postInfo.postId}`;
        const postValue = JSON.stringify({ postInfo, content });

        // `content` 업데이트
        localStorage.setItem(KEY, postValue);

        // `postInfo` 업데이트
        set((prev: PostState) => ({
          posts: prev.posts.map((post) => {
            if (post.postId === postInfo.postId) return postInfo;

            return post;
          }),
        }));
      },
    }),
    /**
     * `postInfo`를 보관하는 localStorage
     */
    {
      name: `postStore`,
    }
  )
);

/** @returns 포스트 `목록` 반환 */
export const usePostState = () => usePostStore((state) => state.posts);

/** @returns 신규 포스트 `추가`하는 `메소드` 반환 */
export const usePostStateInput = () => usePostStore((state) => state.addPost);
/** @returns 대상 포스트 `수정`하는 `메소드` 반환 */
export const usePostStateEdit = () => usePostStore((state) => state.editPost);
/** @returns 대상 포스트 `삭제`하는 `메소드` 반환 */
export const usePostStateRemove = () =>
  usePostStore((state) => state.removePost);
