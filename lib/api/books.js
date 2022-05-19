import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const booksDirectory = join(process.cwd(), "_books");

export function getBookSlugs() {
  return fs.readdirSync(booksDirectory);
}

export function getChapterSlugs(book) {
  const chaptersDirectory = join(booksDirectory, `${book.slug}`);
  console.log("chaptersDirectory:", chaptersDirectory);
  return fs.readdirSync(chaptersDirectory);
}

export function getBookBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(booksDirectory, `${realSlug}`, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  const items = {};

  fields.forEach(field => {
    if (field === "slug") {
      items[field] = realSlug;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllBooks(fields = []) {
  const slugs = getBookSlugs();
  const books = slugs.map(slug => getBookBySlug(slug, fields));
  return books;
}

export function getBooksBySubject(subject) {
  const books = getAllBooks([
    "title",
    "slug",
    "author",
    "coverImage",
    "subject"
  ]).filter(book => book.subject === subject);

  return books;
}
