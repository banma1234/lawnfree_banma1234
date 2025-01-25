import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-[40px] flex items-center justify-start py-3 pl-8 text-stone-100 bg-purple-800">
      <Link href="/">
        <h1>lawnfree blog</h1>
      </Link>
    </header>
  );
}
