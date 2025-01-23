import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PostInfo } from "@/app/types/postType";

interface PostState {
  posts: PostInfo[];
  addPost: (postInfo: PostInfo, content: string) => void;
  removePost: (postId: number) => void;
  editPost: (postInfo: PostInfo, content: string) => void;
}

const usePostStore = create(
  persist<PostState>(
    (set, get) => ({
      posts: [],

      addPost: (postInfo: PostInfo, content: string) => {
        const KEY = `post-${postInfo.postId}`;
        const postValue = JSON.stringify({ postInfo, content });

        localStorage.setItem(KEY, postValue);

        set((prev: PostState) => ({
          posts: [...prev.posts, postInfo],
        }));
      },

      removePost: (postId: number) => {
        const KEY = `post-${postId}`;
        const posts = get().posts;

        localStorage.removeItem(KEY);

        const updatedPosts = posts
          .filter((post) => post.postId !== postId)
          .map((post) => {
            const targetKey = `post-${post.postId}`;
            const targetPost = localStorage.getItem(targetKey);

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

        set({ posts: updatedPosts });
      },

      editPost: (postInfo, content) => {
        const KEY = `post-${postInfo.postId}`;
        const postValue = JSON.stringify({ postInfo, content });

        localStorage.setItem(KEY, postValue);

        set((prev: PostState) => ({
          posts: prev.posts.map((post) => {
            if (post.postId === postInfo.postId) return postInfo;

            return post;
          }),
        }));
      },
    }),
    {
      name: `postStore`,
    }
  )
);

export const usePostState = () => usePostStore((state) => state.posts);

export const usePostStateInput = () => usePostStore((state) => state.addPost);
export const usePostStateEdit = () => usePostStore((state) => state.editPost);
export const usePostStateRemove = () =>
  usePostStore((state) => state.removePost);
