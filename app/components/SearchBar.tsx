"use client";

import { Input, Button } from "@/ui";
import { toast } from "../utils/hooks/use-toast";
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

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchByInputData();
    }
  };

  const searchByInputData = () => {
    if (!input) {
      toast({ variant: "destructive", title: "검색어를 입력해주세요." });

      if (!searchParams) return;
      router.replace("/");
    }

    router.replace(`?q=${input}`);
  };

  return (
    <div className="flex gap-1">
      <Input
        className="md:w-full bg-stone-100 border-none focus-visible:ring-0"
        placeholder="검색"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => activeEnter(e)}
        ref={focusPoint}
      />
      <Button
        className="bg-purple-600 hover:bg-purple-900"
        onClick={searchByInputData}
      >
        {handleSVG("search", "18")}
      </Button>
    </div>
  );
}
