import { headers } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="md:w-3/5 sm:4/5 h-full mt-8 rounded-xl overflow-hidden text-stone-800">
      {children}
    </section>
  );
}

export async function generateMetadata() {
  const postId = (await headers()).get("x-path-postid");
  const title = (await headers()).get("x-path-title");

  if (!postId || !title) {
    return {
      title: "새 글 작성 | 박범수",
      description: "신규 글 작성 페이지 입니다.",
    };
  }

  return {
    title: `(수정 중) ${title}`,
    description: "기존 글을 수정 중입니다.",
  };
}
