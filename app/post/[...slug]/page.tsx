import Article from "./components/Article";
import NavContainer from "./components/NavContainer";
import type { Metadata } from "next";

/**
 * 포스트 `상세보기` 페이지. 각 페이지를 `동적`으로 라우팅
 */
export default async function Posts({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = await params;

  return (
    <section className="w-full max-w-[860px] p-6">
      <Article slug={slug} />
      <hr />
      {/* 이전/다음 포스트 라우팅 */}
      <NavContainer slug={slug} />
    </section>
  );
}

/**
 * 포스트의 각 상세 페이지를 `동적`으로 라우팅
 * @param params 동적 라우팅 params
 * @returns `meta 데이터`
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const [title] = (await params).slug;

  return {
    title: `${decodeURI(title)}`,
  };
}
