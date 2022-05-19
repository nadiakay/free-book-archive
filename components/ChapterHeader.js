import Link from "next/link";

export default function ChapterHeader({ book, chapter }) {
  return (
    <section className=" font-serif p-1 pb-3">
      <h2 className="font-bold text-2xl pb-5">
        <Link href={`/book/${book.slug}`}>{book.title}</Link>
      </h2>
      <h1 className="text-2xl flex flex-row items-center">
        <span className="pr-3">{chapter.slug}.</span>
        <span className="border-b border-slate-400 mt-4">{chapter.title}</span>
      </h1>
      <div></div>
    </section>
  );
}
