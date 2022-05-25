import Head from "next/head";
import Link from "next/link";

import BookCard from "../components/BookCard";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <nav className="w-full border-b border-solid border-indigo-600">
        <ul className="flex justify-center space-x-2">
          <li>
            <Link href="/index2">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/add-book">
              <a>Add post</a>
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <div>
          {posts.length === 0 ? (
            <h2>No added posts</h2>
          ) : (
            <ul>
              {posts.map((post, i) => (
                <BookCard post={post} key={i} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      posts: ["message"]
    }
  };
}
