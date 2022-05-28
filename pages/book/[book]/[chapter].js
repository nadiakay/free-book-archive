import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Layout from "../../../components/layout";

import ChapterHeader from "../../../components/ChapterHeader";
import ChapterBody from "../../../components/ChapterBody";

import { getChapterBySlug, getAllChapters } from "../../../lib/api/chapter";
import { getAllSubjects } from "../../../lib/api/subjects";
import { getBookBySlug } from "../../../lib/api/book";

import * as styles from "../../../styles/book";

export async function getStaticProps({ params }) {
  console.log("styles:", styles);
  if (params.chapter.split(".").pop() == "html") {
    console.log("params.chapter:", params.chapter);
  }
  const chapter = getChapterBySlug(params.book, params.chapter, [
    "title",
    "book",
    "content",
    "slug",
    "author"
  ]);
  const subjects = getAllSubjects();
  const book = getBookBySlug(params.book, ["title", "slug"]);
  //console.log("chapter:", chapter);

  return {
    props: {
      book: book,
      chapter: chapter,
      subjects: subjects
    }
  };
}

export async function getStaticPaths() {
  const chapters = [
    ...getAllChapters(["slug", "book"]),
    ...getAllChapters(["slug", "book"]).map(chapter => {
      let ch = {};
      ch["book"] = chapter["book"];
      ch["slug"] = chapter["slug"] + ".html";
      return ch;
    })
  ];

  return {
    paths: chapters.map(chapter => {
      return {
        params: {
          book: chapter.book,
          chapter: chapter.slug
        }
      };
    }, {}),
    fallback: false
  };
}

export default function Chapter({ book, chapter, subjects }) {
  const router = useRouter();
  return (
    <Layout subjects={subjects}>
      {router.isFallback ? (
        <title>{"Loading…"}</title>
      ) : (
        <>
          <Head>
            <title>{chapter.title}</title>
          </Head>
          <section className="max-w-4xl mx-auto mt-4 font-serif">
            <ChapterHeader book={book} chapter={chapter} />
            <ChapterBody content={chapter.content} />
          </section>
        </>
      )}
    </Layout>
  );
}
