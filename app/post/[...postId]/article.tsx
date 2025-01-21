"use client";

import React, { useState, useEffect } from "react";

interface wow {
  postId: number;
  title: string;
  uploadDate: string;
}

interface PostPost {
  postInfo: wow;
  content: string;
}

export default function Article(props: { postId: number }) {
  const [post, setContent] = useState<PostPost>();
  const postId = props.postId;

  useEffect(() => {
    const targetPost = localStorage.getItem(`post-${postId}`);

    if (!targetPost) {
      alert("damn");
      return;
    }
    setContent(JSON.parse(targetPost));
  }, [postId]);

  if (post) {
    return (
      <article>
        <h1>{post.postInfo.title}</h1>
        <p>{post.content}</p>
      </article>
    );
  }
}
