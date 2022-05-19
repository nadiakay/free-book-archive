import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import { getAllBooks, getBookBySlug } from "../../lib/api/books";
import { getAllSubjects } from "../../lib/api/subjects";
import {
  getChapterBySlug,
  getChapterSlugsByBook
} from "../../lib/api/chapters";

export async function getStaticProps({ params }) {
  const book = getBookBySlug(params.book, [
    "title",
    "author",
    "subject",
    "slug"
  ]);
  const chapters = getChapterSlugsByBook(book.slug).map(slug =>
    getChapterBySlug(params.book, slug, ["title", "slug"])
  );
  const subjects = getAllSubjects();

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

  return {
    paths: books.map(book => {
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
          <article className="mb-32 px-4 font-serif">
            <Head>
              <title>{book.title}</title>
            </Head>
            <h1 className="flex flex-row mt-5 mb-4 text-2xl">{book.title}</h1>
            <h4 className="text-md mb-2 pl-2">Author: {book.author}</h4>
            <h4 className="border-b border-slate-400 mb-4 pb-2 pl-2">
              Subject: {book.subject}
            </h4>
            <ul className="space-y-3">
              {chapters.map((chapter, i) => (
                <li key={i}>
                  <Link href={`/book/${book.slug}/${chapter.slug}`}>
                    <a className="hover:underline">
                      {i + 1}. {chapter.title}
                    </a>
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
