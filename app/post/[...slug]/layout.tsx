export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="w-full flex justify-center">{children}</section>;
}
