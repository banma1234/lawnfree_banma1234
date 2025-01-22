"use client";

import React, { useState, useEffect } from "react";
import { Post } from "@/app/types/postType";
import { toast } from "@/app/utils/hooks/use-toast";

export default function Article(props: { postId: number }) {
  const [post, setContent] = useState<Post>();
  const [error, setError] = useState("");
  const postId = props.postId;

  useEffect(() => {
    if (!error.length) return;

    toast({ variant: "destructive", title: `${error}` });
    setError("");
  }, [error]);

  useEffect(() => {
    const targetPost = localStorage.getItem(`post-${postId}`);

    if (!targetPost) {
      setError("해당 포스트는 존재하지 않습니다.");
      return;
    }
    setContent(JSON.parse(targetPost));
  }, [postId]);

  if (post) {
    return (
      <section>
        <h1>{post.postInfo.title}</h1>
        <p>{post.content}</p>
      </section>
    );
  }
}
