import Link from "next/link";
import Image from "next/image";
import Logo from "./logo";

export default function Header({ children }) {
  return (
    <h2
      className="bg-accent-1 border-b
   border-accent-2 relative flex flex-col md:flex-row space-between text-2xl md:text-4xl font-bold font-serif p-4 pb-5 mb-8"
    >
      <div className="flex items-center flex-1">
        <Link href="/">
          <a className="flex flex-row items-center hover:underline pb-4 md:pb-0">
            <Logo />
            <span className="pl-2">Free Book Archive</span>
          </a>
        </Link>
      </div>

      <div className="flex items-center flex-0">{children}</div>
    </h2>
  );
}
