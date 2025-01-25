import PostTable from "./components/PostTable";
import SearchBar from "./components/SearchBar";
import { handleSVG } from "./utils/handleSVG";
import { Button } from "@/ui";
import { Table, TableHead, TableHeader, TableRow } from "@/ui/shadCn/table";

export default function Home() {
  return (
    <section className="w-full flex justify-center">
      <div className="mt-20 max-w-[680px] w-full px-3">
        <menu className="flex flex-row w-full justify-end pb-3 gap-3">
          <SearchBar />
          <a href={"/write"}>
            <Button className="bg-purple-600 hover:bg-purple-800">
              {handleSVG("WRITE", "18")} 글 작성
            </Button>
          </a>
        </menu>
        <StaticTableHead />
        <PostTable />
      </div>
    </section>
  );
}

/**
 * 불필요한 리랜더링 없게끔 TableHead `정적` 컴포넌트로 분리
 */
const StaticTableHead = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-stone-50 border-stone-300">
          <TableHead className="w-[60px] text-center">id</TableHead>
          <TableHead className="text-center">제목</TableHead>
          <TableHead className="w-[80px] text-center">작성일</TableHead>
          <TableHead className="w-[50px]">삭제</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
};
