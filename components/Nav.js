import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex flex-col md:flex-row hover:underline">
      <ul>
        <li>
          <select>Subject</select>
        </li>
        <li>
          <Link href="/about">Abpout</Link>
        </li>
        <li>Contact</li>
        <li>Search</li>
      </ul>
    </nav>
  );
}
