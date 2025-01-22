import Article from "./components/article";

export default async function Posts({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = await params;

  return (
    <article>
      <Article postId={Number(postId)} />
    </article>
  );
}
