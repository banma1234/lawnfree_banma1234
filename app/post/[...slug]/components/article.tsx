"use client";

import { Post } from "@/app/types/postType";
import { toast } from "@/app/utils/hooks/use-toast";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import AlertRemovePost from "@/app/components/AlertRemovePost";

/**
 * 상세보기 페이지
 * @param props 페이지 정보
 */
export default function Article(props: { slug: string[] }) {
  const [post, setContent] = useState<Post>();
  const [error, setError] = useState("");
  const [title, postId] = props.slug;

  /**
   * 에러 핸들링
   */
  useEffect(() => {
    if (!error.length) return;

    toast({ variant: "destructive", title: `${error}` });
    setError("");
  }, [error]);

  /**
   * 해당하는 포스트 정보 localStorage에서 로드
   */
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
      <article className="mt-6 min-h-[620px]">
        <h1 className="border-8 border-y-0 border-r-0 border-purple-600 text-4xl font-bold pl-6 my-6">
          {post.postInfo.title}
        </h1>
        <menu className="flex justify-between text-stone-500 pr-6">
          <span className="flex flex-row">
            작성일. {post.postInfo.uploadDate}
          </span>
          <ul className="flex flex-row gap-4">
            {/* 포스트 수정 */}
            <Link href={`/write?postid=${postId}&title=${encodeURI(title)}`}>
              <li className="font-bold hover:text-stone-800">수정</li>
            </Link>
            {/* 포스트 삭제 */}
            <AlertRemovePost postId={Number(postId)}>
              <li className="cursor-pointer font-bold hover:text-stone-800">
                삭제
              </li>
            </AlertRemovePost>
          </ul>
        </menu>
        <div className="whitespace-pre-line py-16">{post.content}</div>
      </article>
    );
  }
}
