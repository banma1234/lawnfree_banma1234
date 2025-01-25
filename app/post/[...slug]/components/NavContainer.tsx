"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/ui";
import { handleSVG } from "@/app/utils/handleSVG";
import { usePostState } from "@/app/utils/hooks/store/usePostStore";

/**
 * 상세보기 페이지 내에서 이전/다음 포스트 라우팅 지원하는 컴포넌트
 * @param props 페이지 정보
 */
export default function NavContainer(props: { slug: string[] }) {
  const postId = props.slug[1];
  const postState = usePostState();

  let prev = undefined;
  let next = undefined;

  // `postStore`에 저장된 `postInfo` 순회하며 필터링
  for (const post of postState) {
    const compare = Number(postId);

    if (compare === post.postId + 1) next = post;
    else if (compare === post.postId - 1) prev = post;

    // 해당하는 포스트 정보 찾았다면 break
    if (prev && next) break;
  }

  return (
    <nav className="w-full flex flex-col py-6 mb-20 justify-between sm:flex-row gap-2">
      {/* 이전 포스트 존재한다면 display */}
      {prev ? (
        <Link href={`/post/${prev.title}/${prev.postId}`}>
          <Button className="w-full sm:w-[210px] py-7 px-3 flex gap-4 justify-start bg-inherit break-words shadow-none text-white bg-purple-500 hover:bg-purple-600">
            <div>{handleSVG("ARROW_LEFT", "30")}</div>
            <div className="text-left text-xs leading-3">
              <span>이전 포스트</span>
              <h3 className="text-lg break-words whitespace-normal line-clamp-1">
                {prev?.title}
              </h3>
            </div>
          </Button>
        </Link>
      ) : (
        <div></div>
      )}
      {/* 다음 포스트 존재한다면 display */}
      {next && (
        <Link href={`/post/${next.title}/${next.postId}`}>
          <Button className="w-full sm:w-[210px] py-7 px-3 gap-4 flex justify-start bg-inherit break-words shadow-none text-white bg-purple-500 hover:bg-purple-600">
            <div className="text-right text-xs leading-3">
              <span>다음 포스트</span>
              <h3 className="text-lg break-words whitespace-normal line-clamp-1">
                {next?.title}
              </h3>
            </div>
            <div>{handleSVG("ARROW_RIGHT", "30")}</div>
          </Button>
        </Link>
      )}
    </nav>
  );
}
