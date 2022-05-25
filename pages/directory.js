import { connectToDatabase } from "../../lib/mongodb";

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();

  const books = await db.collection("books").find({}).limit(10).toArray();

  const book = getBookBySlug(params.book, [
    "title",
    "author",
    "subject",
    "slug"
  ]);
  const chapters = getChapterSlugsByBook(book.slug).map(slug =>
    getChapterBySlug(params.book, slug, ["title", "slug"])
  );
  const subjects = getAllSubjects();

  return {
    props: {
      book: book,
      chapters: chapters,
      subjects: subjects
    }
  };
}

export default function Directory({ subjects }) {
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
          </section>
        </>
      )}
    </Layout>
  );
}
