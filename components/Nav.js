import Link from "next/link";
import SubjectSelector from "./SubjectSelector";
import Searchbar from "./Searchbar";

export default function Nav() {
  return (
    <ul className="font-sans font-normal text-xl flex flex-col md:flex-row items-center w-fit space-y-2 mx-auto md:mx-0 md:space-y-0 md:space-x-2">
      <li
        className="text-center px-2
        "
      >
        <SubjectSelector />
      </li>
      <li className="text-center m-0">
        <Link href="/about">About</Link>
      </li>
      <li className="text-center m-0">
        <Link href="/about">Contact</Link>
      </li>
      <li className="text-center m-0">
        <Link href="/about">Search...</Link>
      </li>
    </ul>
  );
}
