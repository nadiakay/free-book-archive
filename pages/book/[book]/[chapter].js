import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../../components/layout";

import ChapterHeader from "../../../components/ChapterHeader";
import ChapterBody from "../../../components/ChapterBody";

import { getAllSubjects } from "../../../lib/api/subjects";
import { getBookBySlug } from "../../../lib/api/book";
import { getChapterBySlug, getAllChapters } from "../../../lib/api/chapter";

export async function getStaticProps({ params }) {
  const chapter = getChapterBySlug(params.book, params.chapter, [
    "title",
    "book",
    "content",
    "slug",
    "author"
  ]);
  const subjects = getAllSubjects();
  const book = getBookBySlug(params.book, ["title", "slug", "id"]);

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
    //get paths for both [slug] and [slug].html
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
          <ChapterHeader book={book} />
          <ChapterBody content={chapter.content} style={book.id} />
        </>
      )}
    </Layout>
  );
}
