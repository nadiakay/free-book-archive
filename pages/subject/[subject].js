import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import Head from "next/head";
import BookPreview from "../../components/BookPreview";
import { getBooksBySubject } from "../../lib/api/book";
import { getAllSubjects } from "../../lib/api/subjects";

export async function getStaticProps({ params }) {
  const subject = params.subject;
  const books = getBooksBySubject(params.subject, [
    "title",
    "slug",
    "authors",
    "subjects"
  ]);
  const subjects = getAllSubjects();

  return {
    props: {
      subject: subject,
      books: books,
      subjects: subjects
    }
  };
}

export async function getStaticPaths() {
  const subjects = getAllSubjects();

  return {
    paths: subjects.map(subject => {
      return {
        params: {
          subject: subject
        }
      };
    }),
    fallback: false
  };
}

export default function Subject({ subject, books, subjects }) {
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
          <section className="max-w-4xl mx-auto mb-32 font-serif">
            <Head>
              <title>{subject} Books</title>
            </Head>
            <h1 className="border-b border-slate-400 mb-4 text-2xl">
              {subject} Books
            </h1>
            <ul className="flex flex-row flex-wrap text-lg mx-4">
              {books.map((book, i) => (
                <li key={i} className="mx-4  py-4 grow">
                  <BookPreview book={book} />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </Layout>
  );
}
