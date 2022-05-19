import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { getBookSlugs } from "./books";

const booksDirectory = join(process.cwd(), "_books");

export function getChapterSlugs() {
  const slugs = fs
    .readdirSync(booksDirectory)
    .map(slug => fs.readdirSync(join(booksDirectory, slug)));
  console.log("slugs:", slugs);
  return slugs;
}

export function getChapterBySlug(bookSlug, slug, fields = []) {
  console.log("bookslug:", bookSlug);
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(booksDirectory, bookSlug, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getChapterSlugsByBook(book) {
  console.log("getChapterSlugsByBook book:", book);
  const realSlug = book.slug.replace(/\.md$/, "");
  console.log("realslug:", realSlug);
  const chaptersDirectory = join(booksDirectory, `${realSlug}`);
  console.log("chaptersDirectory:", chaptersDirectory);
  return fs.readdirSync(chaptersDirectory).filter(slug => slug !== `index.md`);
}

export function getAllChapters(fields = []) {
  //Fix this
  const bookSlugs = getBookSlugs();
  const slugs = getChapterSlugs();
  const chapters = slugs
    .map(slug => getChapterBySlug(book.slug, slug, fields))
    // sort chapters in descending order
    .sort((chapter1, chapter2) => (chapter1.order > chapter2.order ? -1 : 1));
  return chapters;
}
