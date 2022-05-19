import Link from "next/link";

export default function BookPreview({ book }) {
  console.log(book);
  return (
    <div>
      <Link href={`/book/${book.slug}`}>
        <a className="hover:underline">{book.title}</a>
      </Link>
    </div>
  );
}
