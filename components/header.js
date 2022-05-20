import Link from "next/link";
import Image from "next/image";
import logo from "../public/assets/logo.png";

export default function Header({ children }) {
  return (
    <h2
      className="bg-accent-1 border-b
   border-accent-2 flex flex-col md:flex-row justify-between text-2xl md:text-4xl font-bold font-serif p-4 pb-5"
    >
      <Link href="/" className="">
        <a className="flex flex-row items-center h-5 hover:underline mb-4 md:mb-0">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="h-auto w-auto max-h-6 max-w-5"
          />
          <span className="pl-1">Free Book Archive</span>
        </a>
      </Link>
      {children}
    </h2>
  );
}
