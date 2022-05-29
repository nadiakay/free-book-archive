import Link from "next/link";

export default function ChapterHeader({ book }) {
  return (
    <section className="font-serif p-4">
      <h2 className="font-bold text-2xl border-b border-slate-400 mb-5">
        <Link href={`/book/${book.slug}`}>{book.title}</Link>
      </h2>
    </section>
  );
}
