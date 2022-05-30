import Link from "next/link";

export default function Footer() {
  return (
    <footer className="font-sans bg-white border-t border-gray-200 h-fit-content px-4">
      <div className="py-12 flex flex-col lg:flex-row justify-between  justify-items-center space-y-2 lg:space-y-0 max-w-2xl mx-auto tracking-tight">
        <h3 className="font-serif font-bold text-lg leading-tight mb-4">
          Free Book Archive
        </h3>
        <Link href="https://nadiakonieczny.com">
          <a className="hover:underline m-0">Site by Nadia</a>
        </Link>
        <Link href={`https://github.com/nadiakay/free-book-archive`}>
          <a className="hover:underline m-0">Source code (GitHub)</a>
        </Link>
      </div>
    </footer>
  );
}
