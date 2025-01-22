"use client";

import {
  Table,
  TableHeader,
  TableCaption,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  usePostState,
  usePostStateRemove,
} from "./utils/hooks/store/usePostStore";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function PostTable() {
  const [isLoading, setIsLoading] = useState(false);
  const posts = usePostState();
  const removePost = usePostStateRemove();

  const removeTargetPost = (postId: number) => {
    removePost(postId);
  };

  useEffect(() => {
    if (posts) {
      setIsLoading(true);
    }
  }, [posts]);

  if (!isLoading) return <SkelletonUi />;
  if (isLoading && !posts.length) return <PostNotFound />;

  return (
    <Table>
      <TableCaption>설명충 등판.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">postId</TableHead>
          <TableHead>제목</TableHead>
          <TableHead>수정</TableHead>
          <TableHead className="text-right">삭제</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map(post => (
          <TableRow key={post.postId}>
            <TableCell>{post.postId}</TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell>
              <Link href={`/write?postid=${post.postId}`}>수정</Link>
            </TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => {
                removeTargetPost(post.postId);
              }}
            >
              삭제
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
