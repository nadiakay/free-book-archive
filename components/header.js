import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";
import logo from "../public/assets/logo.png";

export default function Header() {
  return (
    <h2
      className="bg-accent-1 border-b
   border-accent-2 flex flex-col md:flex-row justify-between text-2xl md:text-4xl font-bold font-serif leading-tight p-2"
    >
      <Link href="/">
        <a className="flex flex-row hover:underline mb-4 md:mb-auto">
          <div className="w-10">
            <Image
              src={logo}
              alt="Logo"
              width={306}
              height={182}
              layout="responsive"
            />
          </div>
          <span className="pl-1">Free Book Archive</span>
        </a>
      </Link>
      <Nav />
    </h2>
  );
}
