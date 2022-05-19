import Layout from "../components/layout";
import { getAllBooks } from "../lib/api/books";
import Head from "next/head";

export async function getStaticProps() {
  const books = getAllBooks(["title"]);

  return {
    props: {
      books: books
    }
  };
}

export default function Index({ books }) {
  console.log(books);

  return (
    <>
      <Layout>
        <Head>
          <title>Free Book Library</title>
        </Head>
        <p>Under Construction</p>
      </Layout>
    </>
  );
}
