"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/ui/shadCn/table";
import { usePostState } from "../utils/hooks/store/usePostStore";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AlertRemovePost from "./AlertRemovePost";

export default function PostTable() {
  const [isLoading, setIsLoading] = useState(false);
  const posts = usePostState();

  useEffect(() => {
    if (posts) {
      setIsLoading(true);
    }
  }, [posts]);

  if (!isLoading) return <SkelletonUi />;
  if (isLoading && !posts.length) return <PostNotFound />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">id</TableHead>
          <TableHead className="text-center">제목</TableHead>
          <TableHead className="w-[80px] text-center">작성일</TableHead>
          <TableHead className="w-[50px]">수정</TableHead>
          <TableHead className="w-[50px]">삭제</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.postId}>
            <TableCell className="text-center">{post.postId}</TableCell>
            <TableCell>
              <Link
                className="overflow-hidden whitespace-normal line-clamp-1 hover:underline"
                href={`/post/${post.postId}`}
              >
                {post.title}
              </Link>
            </TableCell>
            <TableCell className="text-center">{post.uploadDate}</TableCell>
            <TableCell className="w-[50px]">
              <Link href={`/write?postid=${post.postId}`}>수정</Link>
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

const SkelletonUi = () => {
  return <div className="w-full h-full bg-black">haha</div>;
};

const PostNotFound = () => {
  return (
    <div>
      <h1>아무것도 없다 임마</h1>
    </div>
  );
};
