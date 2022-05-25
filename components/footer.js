import Link from "next/link";
import { EXAMPLE_PATH } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="font-serif bg-accent-2 border-t border-slate-400 mt-20">
      <div className="py-12 flex flex-col lg:flex-row items-start w-fit mx-auto">
        <h3 className="text-lg font-bold tracking-tighter leading-tight text-center lg:text-left mb-4 lg:pr-4 lg:w-1/2">
          Free Book Archive
        </h3>
        <div className="flex flex-col justify-center items-start space-y-2 lg:pl-4 lg:w-1/2">
          <Link href="https://nadiakonieczny.com">Site by Nadia.</Link>
          <Link href={`https://github.com/nadiakay/free-book-archive`}>
            <a className="hover:underline">Source code (GitHub)</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
