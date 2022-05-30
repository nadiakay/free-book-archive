import Link from "next/link";
import Image from "next/image";
import Logo from "./logo";

export default function Header({ children }) {
  return (
    <h2
      className="bg-white border-b shadow-sm flex-auto
      border-gray-300 relative flex flex-col md:flex-row text-xl md:text-xl font-serif p-4 mb-8"
    >
      <div className="flex flex-row items-center flex-1">
        <Link href="/">
          <a className="flex flex-row items-stretch hover:underline pb-4 md:pb-0">
            <Logo styles="shrink-0 max-h-6 self-center" />
            <span className="shrink-0 font-bold tracking-tight pl-2 self-center">
              Free Book Archive
            </span>
          </a>
        </Link>
      </div>

      <div className="flex items-center flex-0 font-sans">{children}</div>
    </h2>
  );
}
