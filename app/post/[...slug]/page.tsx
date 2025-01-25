import Article from "./components/article";
import NavContainer from "./components/NavContainer";
//import type { Metadata } from "next";

export type paramsType = Promise<{ slug: string[] }>;

export default async function Post(props: { params: paramsType }) {
  const { slug } = await props.params;

  return (
    <section className="w-full max-w-[860px] p-6">
      <Article slug={slug} />
      <hr />
      {/* 이전/다음 포스트 라우팅 */}
      <NavContainer slug={slug} />
    </section>
  );
}

// /**
//  * 포스트의 각 상세 페이지를 `동적`으로 라우팅
//  * @param params 동적 라우팅 params
//  * @returns `meta 데이터`
//  */
export async function generateMetadata(props: { params: paramsType }) {
  const { slug } = await props.params;

  return {
    title: `${decodeURI(slug[1])}`,
  };
}
