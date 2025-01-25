import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-[32px] flex justify-start bg-purple-800">
      <Link href="/">
        <h1>Home</h1>
      </Link>
    </header>
  );
}
