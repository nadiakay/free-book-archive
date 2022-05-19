import Layout from "../components/layout";
import { getAllBooks } from "../lib/api/books";
import { getAllSubjects } from "../lib/api/subjects";
import Head from "next/head";

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
          <title>Free Book Library</title>
        </Head>
        <p>Under Construction</p>
      </Layout>
    </>
  );
}
