import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { getBookSlugs } from "./books";

const booksDirectory = join(process.cwd(), "_books");

export function getChapterSlugs() {
  const slugs = fs
    .readdirSync(booksDirectory)
    .map(slug => fs.readdirSync(join(booksDirectory, slug)));
  const flatSlugs = [].concat(...slugs);
  return flatSlugs;
}

export function getChapterBySlug(bookSlug, slug, fields = []) {
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

export function getChapterSlugsByBook(bookSlug) {
  const realSlug = bookSlug.replace(/\.md$/, "");
  const chaptersDirectory = join(booksDirectory, `${realSlug}`);
  return fs.readdirSync(chaptersDirectory).filter(slug => slug !== `index.md`);
}

export function getAllChapters(fields = []) {
  const books = getBookSlugs();
  const chapters = books.map(book =>
    getChapterSlugsByBook(book).map(slug =>
      getChapterBySlug(book, slug, fields)
    )
  );
  const flatChapters = [].concat(...chapters);
  return flatChapters;
}
