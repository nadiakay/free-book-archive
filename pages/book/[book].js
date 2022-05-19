import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import {
  getAllBooks,
  getBookBySlug,
  getChapterSlugs
} from "../../lib/api/books";
import { getAllSubjects } from "../../lib/api/subjects";

export async function getStaticProps({ params }) {
  const book = getBookBySlug(params.book, ["title", "author", "slug"]);
  const chapters = getChapterSlugs(book);
  const subjects = getAllSubjects();
  console.log(book);
  console.log("chapterslugs:", chapters);

  return {
    props: {
      book: book,
      chapters: chapters,
      subjects: subjects
    }
  };
}

export async function getStaticPaths() {
  const books = getAllBooks(["slug"]);
  console.log("books:", books);

  return {
    paths: books.map(book => {
      console.log("book.slug:", book.slug);
      return {
        params: {
          book: book.slug
        }
      };
    }),
    fallback: false
  };
}

export default function Book({ book, chapters, subjects }) {
  const router = useRouter();
  if (!router.isFallback && false) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout subjects={subjects}>
      {router.isFallback ? (
        <title>{"Loading…"}</title>
      ) : (
        <>
          <article className="mb-32 px-2 font-serif">
            <Head>
              <title>``</title>
            </Head>
            <h1 className="flex flex-row mt-4 mb-2 text-2xl">{book.title}</h1>
            <h3 className="border-b border-slate-400 ">{book.author}</h3>
            <ul className="space-y-3">
              {chapters.map((chapter, i) => (
                <li key={i}>
                  <Link href={`/${book.slug}/${chapter}`}>
                    <span>{i}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </>
      )}
    </Layout>
  );
}
