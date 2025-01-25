import Link from "next/link";

/**
 * 헤더 컴포넌트
 */
export default function Header() {
  return (
    <header className="w-full h-[40px] italic font-bold flex items-center justify-start border-none py-3 pl-8 text-stone-100 bg-purple-600">
      <Link href="/">
        <h1>lawnfree blog</h1>
      </Link>
    </header>
  );
}
