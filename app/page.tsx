"use client";

import {
  usePostState,
  usePostStateRemove,
} from "./utils/hooks/store/usePostStore";
import { Button } from "@/components/ui";

export default function Home() {
  const posts = usePostState();
  const removePost = usePostStateRemove();

  const doTest = (postId: number) => {
    removePost(postId);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1>hi</h1>
      <h1>hi</h1>
      <h1>hi</h1>
      <div>
        {posts.map((post) => (
          <li key={post.postId}>
            <span>{post.postId}</span>
            <h1>{post.title}</h1>
            <p>{post.uploadDate}</p>
            <Button
              onClick={() => {
                doTest(post.postId);
              }}
            >
              remove
            </Button>
            <hr />
          </li>
        ))}
      </div>
      <Button
        onClick={() => {
          console.log(posts);
        }}
      >
        Check!
      </Button>
    </div>
  );
}
