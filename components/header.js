import Link from "next/link";
import Image from "next/image";
import logo from "../public/assets/logo.png";

export default function Header() {
  return (
    <h2 className="text-2xl md:text-4xl font-bold font-serif leading-tight m-1">
      <Link href="/">
        <a className="flex flex-row hover:underline">
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
    </h2>
  );
}
