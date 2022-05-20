import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import Head from "next/head";
import BookPreview from "../../components/BookPreview";
import subjects from "../../data/subjects.json";
import { getBooksBySubject } from "../../lib/api/books";
import { getAllSubjects } from "../../lib/api/subjects";

export async function getStaticProps({ params }) {
  const subject = params.subject;
  const books = getBooksBySubject(params.subject);
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
          <article className="mb-32 px-2 font-serif">
            <Head>
              <title>{subject} Books</title>
            </Head>
            <h1 className="flex flex-row border-b border-slate-400 my-4 text-2xl">
              {subject} Books
            </h1>
            <ul className="text-lg space-y-3 mx-4">
              {books.map((book, i) => (
                <li key={i}>
                  <BookPreview book={book} />
                </li>
              ))}
            </ul>
          </article>
        </>
      )}
    </Layout>
  );
}
