import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";

export default function Index({ previewBooks }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Free Book Library</title>
        </Head>
        <p>Under Construction</p>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  // const previewBooks = getBooks([fields]).slice(0, 5);

  return {
    props: {}
  };
}
