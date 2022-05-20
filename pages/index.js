import Layout from "../components/layout";
import { getAllBooks } from "../lib/api/books";
import { getAllSubjects } from "../lib/api/subjects";
import Head from "next/head";
import Link from "next/link";

export async function getStaticProps() {
  const books = getAllBooks(["title"]);
  const subjects = getAllSubjects();

  return {
    props: {
      books: books,
      subjects: subjects
    }
  };
}

export default function Index({ books, subjects }) {
  console.log(books);

  return (
    <>
      <Layout subjects={subjects}>
        <Head>
          <title>Free Book Archive: Home</title>
        </Head>
        <article className="max-w-4xl mx-2 mt-4 font-serif">
          <h1 className="font-bold text-lg mb-3">
            Welcome to the Free Book Archive!
          </h1>
          <p className="mx-4 mb-4">
            Our collection of ebooks is freely available in web accessible
            format suited for desktop or mobile devices. All texts are public
            domain or licensed for redistribution as noted.
          </p>
          <h2 className="font-bold text-lg mb-2">Browse Subjects:</h2>
          <ul className="text-lg space-y-2 mx-4">
            {subjects.map((subject, i) => (
              <li key={i}>
                <Link href={`/subject/${subject}`}>
                  {<a className="hover:underline ">{subject}</a>}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </Layout>
    </>
  );
}
