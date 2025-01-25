"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  usePostState,
  usePostStateInput,
  usePostStateEdit,
} from "../utils/hooks/store/usePostStore";
import { handleSVG } from "../utils/handleSVG";
import { toast } from "../utils/hooks/use-toast";
import { Button, Input, Textarea } from "@/ui";

export default function Write() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState("");

  const addPost = usePostStateInput();
  const editPost = usePostStateEdit();

  const router = useRouter();
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

    toast({ variant: "destructive", title: `${error}` });
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
      uploadDate: new Date(),
    };

    if (!isNewPost) {
      editPost(postInfo, content);
    } else {
      addPost(postInfo, content);
    }

    setTitle("");
    setContent("");

    toast({ title: "포스트 작성이 완료되었습니다" });
    router.replace("/");
  };

  return (
    <div className="rounded-xl overflow-hidden text-stone-800">
      <Input
        type="text"
        placeholder="제목을 입력하세요."
        className="w-full h-auto text-3xl p-6 font-bold rounded-none whitespace-normal line-clamp-1 border-none focus-visible:ring-0 bg-stone-100"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="내용을 입력하세요."
        className="h-[480px] text-l border-dashed rounded-none border-t-purple-400 p-6 focus-visible:ring-0 resize-none bg-stone-100"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div className="flex justify-end mt-2">
        <Button
          className="w-[142px] h-[54px] text-xl rounded-xl bg-purple-600 hover:bg-purple-800"
          onClick={submitPost}
        >
          {handleSVG("CHECK", "30")} 작성 완료
        </Button>
      </div>
    </div>
  );
}
