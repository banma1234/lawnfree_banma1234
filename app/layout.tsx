import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "@/ui";
import Header from "./components/Header";
import "./globals.css";

const myFont = Noto_Sans_KR({
  weight: ["400"],
  subsets: ["latin"],
  fallback: ["-apple-system", "Apple SD Gothic Neo", "Roboto", "sans-serif"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "lawnfree 블로그 | 박범수",
  description: "lawnfree 과제제출용 웹앱입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 커스텀 스크롤바 스타일
    <html
      className="w-full h-full overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      lang="en"
    >
      <body className={`${myFont.className} w-full antialiased`}>
        <Header />
        <main className="h-full flex flex-col items-center text-stone-800">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
