import Link from "next/link";

export default function BookPreview({ book }) {
  console.log(book);
  return (
    <div className="shadow-sm rounded-lg p-3 w-fit mx-auto flex flex-col justify-between items-center">
      <img
        src={`/assets/book/${book.slug}/cover.jpg`}
        alt={`Cover image for ${book.title}`}
        width="auto"
        height="100px"
        className="text-sm mb-4 mx-8 h-36"
      />
      <div className="max-w-xs text-center">
        <Link href={`/book/${book.slug}`} className="pb-2 text-center">
          <a className="text-base font-bold hover:underline text-center">
            {book.title}
          </a>
        </Link>
        <p className="text-sm text-center">{book.authors.join("; ")}</p>
      </div>
    </div>
  );
}
