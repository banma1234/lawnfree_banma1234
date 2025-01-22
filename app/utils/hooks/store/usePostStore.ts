import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PostInfo } from "@/app/types/post";

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
        localStorage.setItem(
          `post-${postInfo.postId}`,
          JSON.stringify({ postInfo, content }),
        );
        set((prev: PostState) => ({
          posts: [...prev.posts, postInfo],
        }));
      },

      removePost: (postId: number) => {
        localStorage.removeItem(`post-${postId}`);
        const posts = get().posts;

        const updatedPosts = posts
          .filter(post => post.postId !== postId)
          .map(post => {
            const target = localStorage.getItem(`post-${post.postId}`);

            if (post.postId > postId && target) {
              localStorage.removeItem(`post-${post.postId}`);

              const { content } = JSON.parse(target);
              const updatedPost = { ...post, postId: post.postId - 1 };

              localStorage.setItem(
                `post-${updatedPost.postId}`,
                JSON.stringify({ postInfo: updatedPost, content }),
              );
              return updatedPost;
            }
            return post;
          });

        set({ posts: updatedPosts });
      },

      editPost: (postInfo, content) => {
        localStorage.setItem(
          `post-${postInfo.postId}`,
          JSON.stringify({ postInfo, content }),
        );
        set((prev: PostState) => ({
          posts: prev.posts.map(post => {
            if (post.postId === postInfo.postId) {
              return postInfo;
            }
            return post;
          }),
        }));
      },
    }),
    {
      name: `postStore`,
    },
  ),
);

export const usePostState = () => usePostStore(state => state.posts);

export const usePostStateInput = () => usePostStore(state => state.addPost);
export const usePostStateEdit = () => usePostStore(state => state.editPost);
export const usePostStateRemove = () => usePostStore(state => state.removePost);
