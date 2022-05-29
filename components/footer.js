import Link from "next/link";

export default function Footer() {
  return (
    <footer className="font-serif bg-accent-1 border-t border-slate-200 h-fit-content mx-4">
      <div className="py-12 flex flex-col lg:flex-row justify-between  justify-items-center space-y-2 lg:space-y-0 max-w-2xl mx-auto">
        <h3 className="text-lg font-bold tracking-tighter leading-tight ">
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
