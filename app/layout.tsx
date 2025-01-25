import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/ui";
import Header from "./components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html className="w-full h-full" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-full h-full antialiased`}
      >
        <Header />
        <main className="flex flex-col items-center justify-center text-stone-800">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
