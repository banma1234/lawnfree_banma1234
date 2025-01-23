import PostTable from "./components/PostTable";
import Link from "next/link";
import SearchBar from "./components/SearchBar";
import { handleSVG } from "./utils/handleSVG";
import { Button } from "@/ui";

export default function Home() {
  return (
    <section>
      <div className="mt-20 lg:w-[700px] m:w-4/5 px-3">
        <div className="flex flex-row w-full justify-end pb-3 gap-3">
          <SearchBar />
          <Link href={"/write"}>
            <Button className="bg-purple-600 hover:bg-purple-800">
              {handleSVG("WRITE", "18")} 글 작성
            </Button>
          </Link>
        </div>
        <PostTable />
      </div>
    </section>
  );
}
