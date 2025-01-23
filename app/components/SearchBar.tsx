"use client";

import { Input } from "@/ui";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleSVG } from "../utils/handleSVG";

export default function SearchBar() {
  const [input, setInput] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams().get("q");
  const focusPoint = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusPoint.current) focusPoint.current.focus();
  }, [focusPoint, searchParams]);

  useEffect(() => {
    searchByInputData(input);
  }, [input]);

  const searchByInputData = (input: string) => {
    router.replace(`?q=${input}`);
  };

  return (
    <div className="flex">
      <div className="flex justify-center items-center pl-3 rounded-l-lg text-stone-400 bg-stone-100">
        {handleSVG("SEARCH", "16")}
      </div>
      <Input
        type="search"
        className="text-sm sm:w-[350px] 3xs:w-full bg-stone-100 border-none rounded-l-none focus-visible:ring-0"
        placeholder="검색어를 입력하세요."
        value={input}
        onChange={e => setInput(e.target.value)}
        ref={focusPoint}
      />
    </div>
  );
}
