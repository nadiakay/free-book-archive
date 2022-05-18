import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/Layout";
import ChapterHeader from "../../components/ChapterHeader";
import ChapterBody from "../../components/ChapterBody";
import { getChapterBySlug, getAllChapters } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";

export default function Chapter({ chapter }) {
  const router = useRouter();
  if (!router.isFallback && !chapter?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
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

export async function getStaticProps({ params }) {
  const chapter = getChapterBySlug(params.slug, [
    "title",
    "book",
    "part",
    "slug",
    "author",
    "content",
    "coverImage"
  ]);
  const content = await markdownToHtml(chapter.content || "");

  return {
    props: {
      chapter: {
        ...chapter,
        content
      }
    }
  };
}

export async function getStaticPaths() {
  const chapters = getAllChapters(["slug"]);

  return {
    paths: chapters.map(chapter => {
      return {
        params: {
          slug: chapter.slug
        }
      };
    }),
    fallback: false
  };
}
