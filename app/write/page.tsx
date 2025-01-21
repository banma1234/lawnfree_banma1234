"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  usePostState,
  usePostStateInput,
  usePostStateEdit,
} from "../utils/hooks/store/usePostStore";
import { parseDate } from "../utils/parseDate";
import { Button, Input, Textarea } from "@/components/ui";

export default function Write() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState("");

  const addPost = usePostStateInput();
  const editPost = usePostStateEdit();

  const searchParams = useSearchParams().get("postid");
  const postLength = usePostState().length + 1;
  const isNewPost = searchParams ? false : true;

  const getPostData = useCallback(() => {
    if (!searchParams) return;

    const targetPost = localStorage.getItem(`post-${searchParams}`);

    if (!targetPost) {
      setError("그런거 없다");
      return;
    }
    const storedData = JSON.parse(targetPost);

    setContent(storedData.content);
    setTitle(storedData.postInfo.title);
  }, [searchParams]);

  useEffect(() => {
    if (!error.length) return;

    alert(error);
    setError("");
  }, [error]);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  const submitPost = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title || !content) return setError("제목 / 내용을 입력해주세요");

    const postInfo = {
      postId: isNewPost ? postLength : Number(searchParams),
      title,
      uploadDate: parseDate(new Date()),
    };

    if (!isNewPost) {
      editPost(postInfo, content);
    } else {
      addPost(postInfo, content);
    }

    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <Button onClick={submitPost}>Click</Button>
    </div>
  );
}
