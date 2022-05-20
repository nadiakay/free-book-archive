import Link from "next/link";

export default function BookPreview({ book }) {
  console.log(book);
  return (
    <div>
      <Link href={`/book/${book.slug}`} className="pb-2">
        <a className="text-lg font-bold hover:underline ">{book.title}</a>
      </Link>
      <p className="text-sm">{book.author}</p>
    </div>
  );
}
