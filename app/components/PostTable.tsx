"use client";

import { Table, TableBody, TableRow, TableCell } from "@/ui/shadCn/table";
import { usePostState } from "../utils/hooks/store/usePostStore";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AlertRemovePost from "./AlertRemovePost";
import { parseDate } from "../utils/parseDate";
import { PostInfo } from "../types/postType";

export default function PostTable() {
  const [loadedPosts, setLoadedPosts] = useState<PostInfo[]>();
  const [isLoading, setIsLoading] = useState(false);

  const postState = usePostState();
  const router = useRouter();
  const searchParams = useSearchParams().get("q");

  useEffect(() => {
    if (postState) {
      setIsLoading(true);
      setLoadedPosts(postState);
    }
  }, [postState]);

  useEffect(() => {
    if (!searchParams) {
      setLoadedPosts(postState);
      router.replace("/");
      return;
    }

    searchEngine(searchParams);
  }, [searchParams]);

  const searchEngine = (input: string) => {
    if (!loadedPosts) return;

    const targetData = loadedPosts.filter(post => post.title.includes(input));

    if (!targetData.length) {
      setLoadedPosts([]);
    } else {
      setLoadedPosts(targetData);
    }
  };

  if (!isLoading || !loadedPosts) return <Skeleton />;
  if (isLoading && !loadedPosts.length) return <PostNotFound />;

  return (
    <Table>
      <TableBody>
        {loadedPosts.map(post => (
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
              {parseDate(post.uploadDate)}
            </TableCell>
            <TableCell className="w-[50px] cursor-pointer">
              <AlertRemovePost postId={post.postId} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const Skeleton = () => {
  return (
    <div className="w-full h-[500px] flex flex-col">
      <div className="w-full h-[37px] flex flex-col justify-between">
        {[1, 2, 3, 4].map((item, i) => (
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
            <div className="w-[50px] p-2">
              <div className="bg-stone-100 rounded-md">&nbsp;</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PostNotFound = () => {
  return (
    <div>
      <h1>아무것도 없다 임마</h1>
    </div>
  );
};
