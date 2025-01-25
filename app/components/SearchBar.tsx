"use client";

import { Input } from "@/ui";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { handleSVG } from "../utils/handleSVG";

/**
 * 검색창. 입력받은 `input` 데이터를 url `쿼리`로 전송
 */
export default function SearchBar() {
  const [input, setInput] = useState<string>("");

  const router = useRouter();
  const focusPoint = useRef<HTMLInputElement>(null);

  /**
   * 페이지 입장시 `Input` 컴포넌트에 focus
   */
  useEffect(() => {
    if (focusPoint.current) focusPoint.current.focus();
  }, [focusPoint]);

  useEffect(() => {
    searchByInputData(input);
  }, [input]);

  /**
   * 입력값 url `쿼리`로 전송
   * @param input `Input` 입력값
   */
  const searchByInputData = (input: string) => {
    router.replace(`?q=${input}`);
  };

  return (
    <div className="flex w-full justify-end">
      <div className="flex justify-center items-center pl-3 rounded-l-lg text-stone-400 bg-stone-100">
        {handleSVG("SEARCH", "16")}
      </div>
      <Input
        type="search"
        className="text-sm sm:w-[350px] 3xs:w-full bg-stone-100 border-none rounded-l-none focus-visible:ring-0"
        placeholder="검색어를 입력하세요."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={focusPoint}
      />
    </div>
  );
}
