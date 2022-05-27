import fs from "fs";
import { join } from "path";

const booksDirectory = join(process.cwd(), "_book");

export function getBookSlugs() {
  return fs.readdirSync(booksDirectory);
}

export function getBookBySlug(slug, fields = []) {
  const path = join(booksDirectory, `${slug}`);

  const data = JSON.parse(fs.readFileSync(join("data/book", slug + ".json")));

  const items = {};

  fields.forEach(field => {
    if (field === "slug") {
      items[field] = slug;
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

export function getBooksBySubject(subject, fields = []) {
  const books = getAllBooks(["slug", "subjects"])
    .filter(book => book.subjects.some(el => el == subject))
    .map(book => getBookBySlug(book.slug, fields));
  console.log("books by subject:", subject, books);

  return books;
}
