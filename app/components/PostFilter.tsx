"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/shadCn/select";
import React from "react";
import { useFilterStateChange } from "../utils/hooks/store/useFilterState";

const PostFilter = React.memo(() => {
  return <Filter />;
});

function Filter() {
  const changeOptionByFilter = useFilterStateChange();

  const handleFilterOption = (selectedOption: string) => {
    changeOptionByFilter(selectedOption);
  };

  return (
    <Select defaultValue="STANDARD" onValueChange={e => handleFilterOption(e)}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="정렬기준" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="STANDARD">기본</SelectItem>
          <SelectItem value="RECENT">최신순</SelectItem>
          <SelectItem value="PAST">오래된순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default PostFilter;
