import Layout from "../components/layout";
import { getBookSlugs, getBookBySlug } from "../lib/api/book";
import { getAllSubjects } from "../lib/api/subjects";
import Head from "next/head";
import Link from "next/link";

export async function getStaticProps() {
  const books = getBookSlugs();
  console.log("books:", books);
  const book0 = getBookBySlug(books[0], ["title"]);
  console.log("book0:", book0);
  const subjects = getAllSubjects();

  return {
    props: {
      books: books,
      subjects: subjects
    }
  };
}

export default function Test({ books, subjects }) {
  return (
    <>
      <Head>
        <title>TEST PAGE</title>
      </Head>
      <Layout subjects={subjects}>
        <section className="max-w-4xl mx-auto mb-32 font-serif">
          <h1 className="text-2xl border-b border-slate-400 mb-3">TEST PAGE</h1>
          <p className="mx-4 my-4">
            Our collection of ebooks is freely available in web accessible
            format suited for desktop or mobile devices. All texts are public
            domain or licensed for redistribution as noted.
          </p>
          <h2 className="font-bold text-xl mb-2">Browse by Subject:</h2>
          <ul className="text-lg space-y-2 mx-4">
            {subjects.map((subject, i) => (
              <li key={i}>
                <Link href={`/subject/${subject}`}>
                  {<a className="hover:underline ">{subject}</a>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </>
  );
}
