import Article from "./article";

export default async function Posts({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = await params;

  return (
    <main>
      <Article postId={Number(postId)} />
    </main>
  );
}
