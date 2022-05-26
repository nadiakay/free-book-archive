import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import Layout from "../../../components/layout";
import ChapterHeader from "../../../components/ChapterHeader";
import ChapterBody from "../../../components/ChapterBody";

import {
  getChapterBySlugs,
  getAllChapters,
  getBookBySlug
} from "../../../lib/api/html";
import { getAllSubjects } from "../../../lib/api/subjects";

export async function getStaticProps({ params }) {
  const chapter = getChapterBySlugs(params.book2, params.chapter2, [
    "title",
    "content",
    "slug"
  ]);
  const subjects = getAllSubjects();
  const book = getBookBySlug(params.book2, ["slug", "title"]);
  console.log("chapter:", chapter);

  return {
    props: {
      book2: book,
      chapter2: chapter,
      subjects: subjects
    }
  };
}

export async function getStaticPaths() {
  const chapters = getAllChapters(["slug", "book"]);

  return {
    paths: chapters.map(chapter => {
      return {
        params: {
          book2: chapter.book,
          chapter2: chapter.slug
        }
      };
    }),
    fallback: false
  };
}

export default function Chapter({ book2, chapter2, subjects }) {
  const router = useRouter();
  if (!router.isFallback && !true) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout subjects={subjects}>
      {router.isFallback ? (
        <title>{"Loading…"}</title>
      ) : (
        <>
          <Head>
            <title>{chapter2.title}</title>
          </Head>
          <section className="max-w-4xl mx-auto mt-4 font-serif">
            <ChapterHeader book={book2} chapter={chapter2} />
            <ChapterBody content={chapter2.content} />
          </section>
        </>
      )}
    </Layout>
  );
}
