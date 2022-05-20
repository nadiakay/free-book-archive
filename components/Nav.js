import Link from "next/link";
import ModalSelector from "./ModalSelector";

export default function Nav({ subjects }) {
  return (
    <ul className="font-normal text-xl flex flex-col md:flex-row items-center w-fit space-y-2 mx-auto md:mx-0 md:space-y-0 md:space-x-4">
      <li
        className="text-center px-2
        "
      >
        <ModalSelector items={subjects} path="subject" title="Subjects" />
      </li>
      <li className="text-center">
        <Link href="/about">About</Link>
      </li>
    </ul>
  );
}
