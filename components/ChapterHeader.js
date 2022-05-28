import Link from "next/link";

export default function ChapterHeader({ book, chapter }) {
  return (
    <section className=" font-serif pb-3">
      <h2 className="font-bold text-2xl border-b border-slate-400 mb-5">
        <Link href={`/book/${book.slug}`}>{book.title}</Link>
      </h2>
      <h1 className="text-2xl mt-4">{chapter.title}</h1>
      <div></div>
    </section>
  );
}
