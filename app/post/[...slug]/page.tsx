import Article from "./components/article";
import type { Metadata } from "next";

export default async function Posts({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = await params;

  return (
    <article>
      <Article slug={slug} />
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const [title] = (await params).slug;

  return {
    title: `${decodeURIComponent(title)}`,
  };
}
