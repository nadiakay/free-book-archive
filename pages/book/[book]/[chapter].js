import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../../components/layout";
import ChapterHeader from "../../../components/ChapterHeader";
import ChapterBody from "../../../components/ChapterBody";
import { getChapterBySlug, getAllChapters } from "../../../lib/api/chapters";
import { getAllSubjects } from "../../../lib/api/subjects";
import Head from "next/head";
import markdownToHtml from "../../../lib/markdownToHtml";
import { getBookBySlug } from "../../../lib/api/books";

export async function getStaticProps({ params }) {
  const chapter = getChapterBySlug(params.book, params.chapter, [
    "title",
    "book",
    "content",
    "slug",
    "author"
  ]);
  const content = await markdownToHtml(chapter.content || "");
  const subjects = getAllSubjects();
  const book = getBookBySlug(params.book, ["title", "slug"]);

  return {
    props: {
      book: book,
      chapter: {
        ...chapter,
        content
      },
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
          book: chapter.book,
          chapter: chapter.slug
        }
      };
    }),
    fallback: false
  };
}

export default function Chapter({ book, chapter, subjects }) {
  const router = useRouter();
  if (!router.isFallback && !chapter?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout subjects={subjects}>
      {router.isFallback ? (
        <title>{"Loading…"}</title>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{chapter.title}</title>
            </Head>
            <ChapterHeader book={book} chapter={chapter} />
            <ChapterBody content={chapter.content} />
          </article>
        </>
      )}
    </Layout>
  );
}
