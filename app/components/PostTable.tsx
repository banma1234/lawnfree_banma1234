"use client";

import { Table, TableBody, TableRow, TableCell } from "@/ui/shadCn/table";
import { usePostState } from "../utils/hooks/store/usePostStore";
import { useRouter } from "next/navigation";
import { handleSVG } from "../utils/handleSVG";
import { PostInfo } from "../types/postType";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import AlertRemovePost from "./AlertRemovePost";
import Image from "next/image";

/**
 * 게시물 전체 `목록`을 반환하는 컴포넌트
 */
function PostTableView() {
  const [loadedPosts, setLoadedPosts] = useState<PostInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /** 검색어 쿼리스트링 */
  const searchParams = useSearchParams().get("q");
  const postState = usePostState();
  const router = useRouter();

  /**
   * 데이터 로딩
   */
  useEffect(() => {
    if (postState) {
      setIsLoading(true);
      setLoadedPosts(postState);
    }
  }, [postState]);

  /**
   * 쿼리 스트링값에 변동 발생시 게시물 검색 수행
   */
  useEffect(() => {
    // 검색창이 비워졌을 때. 즉 `input`값이 없을 시 기존 데이터로 덮어씌운 후 메인화면으로 라우트
    if (!searchParams) {
      setLoadedPosts(postState);
      router.replace("/");
      return;
    }

    searchEngine(searchParams);
  }, [searchParams]);

  /**
   * `input`값에 따라 검색을 수행하는 로직
   * @param input 검색창 입력값
   */
  const searchEngine = (input: string) => {
    // 게시물 로딩 미완료시 return
    if (!loadedPosts) return;

    const targetData = postState.filter((item) => item.title.includes(input));

    if (!targetData.length) {
      // 해당사항 없으면 빈 배열 반환
      setLoadedPosts([]);
    } else {
      setLoadedPosts(targetData);
    }
  };

  // 로딩은 완료됬으나 포스트가 없는 경우 notfound 반환
  if (isLoading && !loadedPosts.length) return <PostNotFound />;

  return (
    <Table className="w-full">
      <TableBody>
        {loadedPosts.map((post) => (
          <TableRow key={post.postId}>
            <TableCell className="w-[60px] text-center">
              {post.postId}
            </TableCell>
            <TableCell>
              <Link
                className="overflow-hidden whitespace-normal line-clamp-1 hover:underline"
                href={`/post/${post.title}/${post.postId}`}
              >
                {post.title}
              </Link>
            </TableCell>
            <TableCell className="text-center w-[80px]">
              {post.uploadDate}
            </TableCell>
            <TableCell className="w-[50px] cursor-pointer">
              <AlertRemovePost postId={post.postId}>
                {handleSVG("DELETE", "18")}
              </AlertRemovePost>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function PostTable() {
  return (
    <Suspense fallback={<SkeletonUiTable />}>
      <PostTableView />
    </Suspense>
  );
}

/**
 * 메인화면 로딩중 나타나는 스켈레톤 ui
 */
const SkeletonUiTable = () => {
  return (
    <div className="w-full h-[500px] flex flex-col">
      <div className="w-full h-[37px] flex flex-col justify-between">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <div key={i} className="flex flex-row">
            <div className="w-[60px] p-2">
              <div className="bg-stone-100 rounded-md">&nbsp;</div>
            </div>
            <div className="grow p-2">
              <div className="bg-stone-100 rounded-md">&nbsp;</div>
            </div>
            <div className="w-[80px] p-2">
              <div className="bg-stone-100 rounded-md">&nbsp;</div>
            </div>
            <div className="w-[50px] py-2 px-3">
              <div className="bg-stone-100 rounded-md">&nbsp;</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 포스트가 없을 경우 출력되는 이미지
 * @returns post_not_found.svg
 */
const PostNotFound = () => {
  return (
    <Image
      className="mt-6"
      src={"/post_not_found.svg"}
      width={"700"}
      height={"420"}
      alt="엑박 이미지"
    />
  );
};
