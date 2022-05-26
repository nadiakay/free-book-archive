import Layout from "../components/layout";
import { getAllSubjects } from "../lib/api/subjects";
import Head from "next/head";
import Link from "next/link";

export async function getStaticProps() {
  const subjects = getAllSubjects();

  return {
    props: {
      subjects: subjects
    }
  };
}

export default function About({ subjects }) {
  return (
    <>
      <Head>
        <title>About: Free Book Archive</title>
      </Head>
      <Layout subjects={subjects}>
        <section className="max-w-4xl mx-auto mb-32 font-serif">
          <h1 className="text-2xl border-b border-slate-400 mb-4">
            About the Free Book Archive
          </h1>
          <article className="mx-4 space-y-3">
            <p>
              Site by{" "}
              <Link href="https://nadiakonieczny.com">
                <a className="underline">Nadia Konieczny</a>
              </Link>
              . Source code is available on{" "}
              <Link href="https://github.com/nadiakay/free-book-archive">
                <a className="underline">GitHub</a>
              </Link>
              .
            </p>
            <p>
              All texts are in the public domain or available for use under
              license, as indicated.
            </p>
          </article>
        </section>
      </Layout>
    </>
  );
}