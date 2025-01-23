import PostTable from "./components/PostTable";
import Link from "next/link";
import SearchBar from "./components/SearchBar";
import { Button } from "@/ui";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="mt-20 lg:w-[700px] md:w-4/5">
        <div className="flex flex-row w-full justify-end p-3 gap-3">
          <SearchBar />
          <Link href={"/write"}>
            <Button>새글 작성</Button>
          </Link>
        </div>
        <PostTable />
      </div>
    </section>
  );
}
