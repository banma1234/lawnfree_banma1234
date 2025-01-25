import { headers } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="md:w-4/5 max-w-[860px] sm:w-5/6 h-full mt-8 rounded-xl overflow-hidden text-stone-800">
      {children}
    </section>
  );
}

/**
 * `동적`으로 meta 데이터 생성 및 반환. 게시글 `수정`의 경우 대상 포스트의 정보 적용
 * @returns `meta 데이터`
 */
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
    title: `(수정 중) ${decodeURI(title)}`,
    description: "기존 글을 수정 중입니다.",
  };
}
