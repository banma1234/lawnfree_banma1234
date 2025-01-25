"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { parseDate } from "../utils/parseDate";
import { handleSVG } from "../utils/handleSVG";
import { toast } from "../utils/hooks/use-toast";
import { Button, Input, Textarea } from "@/ui";
import {
  usePostState,
  usePostStateInput,
  usePostStateEdit,
} from "../utils/hooks/store/usePostStore";

/**
 * 게시글 `작성`/`수정` 페이지. next.js 정책으로 인해 Suspense로 감싸줌
 */
function Write() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState("");

  const addPost = usePostStateInput();
  const editPost = usePostStateEdit();

  const router = useRouter();
  const searchParams = useSearchParams().get("postid");
  /** 가장 `마지막` 포스트의 `postId` + 1 */
  const postLength = usePostState().length + 1;
  /** `true` : 신규작성 / `false` : 게시물 수정 */
  const isNewPost = searchParams ? false : true;

  /**
   * 쿼리값 참고하여 `수정`할 포스트의 내용 불러오는 함수
   */
  const getPostData = useCallback(() => {
    // 신규작성일 경우 return
    if (!searchParams) return;

    const targetPost = localStorage.getItem(`post-${searchParams}`);

    if (!targetPost) {
      setError(
        `해당하는 포스트가 존재하지 않습니다 | postId : ${searchParams}`
      );
      return;
    }
    const storedData = JSON.parse(targetPost);

    setContent(storedData.content);
    setTitle(storedData.postInfo.title);
  }, [searchParams]);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  /**
   * 에러 핸들링
   */
  useEffect(() => {
    if (!error.length) return;

    toast({ variant: "destructive", title: `${error}` });
    setError("");
  }, [error]);

  /**
   * 작성을 끝마친 포스트를 `추가`/`수정`하는 함수.
   * @param e 추가입력 방지
   */
  const submitPost = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title) return setError("제목을 입력해주세요");
    if (!content) return setError("내용을 입력해주세요");

    // `postStore`에 저장될 게시물 정보
    const postInfo = {
      postId: isNewPost ? postLength : Number(searchParams),
      title,
      uploadDate: parseDate(new Date()),
    };

    // 플래그 `isNewPost`을 기준으로 작성/수정 분기
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
        className="w-full h-auto text-2xl sm:text-3xl p-6 font-bold rounded-none whitespace-normal line-clamp-1 border-none focus-visible:ring-0 bg-stone-100"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="내용을 입력하세요."
        className="h-[480px] text-l border-dashed rounded-none border-stone-300 border-x-0 p-6 focus-visible:ring-0 resize-none bg-stone-100"
        value={content}
        wrap="hard"
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end mt-2">
        <Button
          className="w-[142px] h-[54px] text-xl rounded-xl font-bold bg-purple-600 hover:bg-purple-800"
          onClick={submitPost}
        >
          {handleSVG("CHECK", "30")} 작성 완료
        </Button>
      </div>
    </div>
  );
}

/**
 * `Suspense` 래퍼
 */
const WritePost = () => {
  return (
    <Suspense fallback={<SkeletonUiWrite />}>
      <Write />
    </Suspense>
  );
};

/**
 * `Write` 페이지 스켈레톤 ui
 */
const SkeletonUiWrite = () => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-stone-1200">
      &nbsp;
    </div>
  );
};

export default WritePost;
