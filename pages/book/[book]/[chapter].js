import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../../components/layout";
import ChapterHeader from "../../../components/ChapterHeader";
import ChapterBody from "../../../components/ChapterBody";
import { getChapterBySlug, getAllChapters } from "../../../lib/api/chapters";
import { getAllSubjects } from "../../../lib/api/subjects";
import Head from "next/head";
import markdownToHtml from "../../../lib/markdownToHtml";
import { getAllBooks } from "../../../lib/api/books";

export async function getStaticProps({ params }) {
  const chapter = getChapterBySlug(params.book.slug, params.slug, [
    "title",
    "book",
    "content",
    "slug",
    "author"
  ]);
  console.log("chapter:", chapter);
  const content = await markdownToHtml(chapter.content || "");
  const subjects = getAllSubjects();

  return {
    props: {
      chapter: {
        ...chapter,
        content
      },
      subjects: subjects
    }
  };
}

export async function getStaticPaths() {
  const chapters = getAllChapters(["slug"]);
  console.log("chapters:", chapters);

  return {
    paths: chapters.map(chapter => {
      return {
        params: {
          bookSlug: chapter.book,
          chapter: chapter.slug
        }
      };
    }),
    fallback: false
  };
}

export default function Chapter({ bookSlug, chapter, subjects }) {
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
            <ChapterHeader
              book={chapter.book}
              part={chapter.part}
              title={chapter.title}
            />
            <ChapterBody content={chapter.content} />
          </article>
        </>
      )}
    </Layout>
  );
}
