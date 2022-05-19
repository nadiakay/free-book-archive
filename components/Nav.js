import Link from "next/link";
import ModalSelector from "./ModalSelector";
import Searchbar from "./Searchbar";
//import subjects from "../data/subjects.json";

export default function Nav({ subjects }) {
  return (
    <ul className="font-sans font-normal text-xl flex flex-col md:flex-row items-center w-fit space-y-2 mx-auto md:mx-0 md:space-y-0 md:space-x-4">
      <li
        className="text-center px-2
        "
      >
        <ModalSelector items={subjects} path="subject" title="Subjects" />
      </li>
      <li className="text-center m-0">
        <Link href="/about">About</Link>
      </li>
      <li className="text-center m-0">
        <Link href="/contact">Contact</Link>
      </li>
      <li className="text-center m-0">
        <Link href="/serach">Search...</Link>
      </li>
    </ul>
  );
}
