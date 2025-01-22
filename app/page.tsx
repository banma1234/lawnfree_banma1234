import PostTable from "./components/PostTable";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="mt-20 lg:w-[700px] md:w-4/5">
        <PostTable />
      </div>
    </section>
  );
}
