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
  console.log("flatslugs:", flatSlugs);
  return flatSlugs;
}

export function getChapterBySlug(bookSlug, slug, fields = []) {
  console.log("bookslug:", bookSlug);
  console.log("slug:", slug);
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(booksDirectory, bookSlug, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  console.log("data:", data);
  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    console.log("data[field:", data[field]);
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });
  console.log("itesm:", items);

  return items;
}

export function getChapterSlugsByBook(bookSlug) {
  console.log("getChapterSlugsByBook bookSlug:", bookSlug);
  const realSlug = bookSlug.replace(/\.md$/, "");
  console.log("realslug:", realSlug);
  const chaptersDirectory = join(booksDirectory, `${realSlug}`);
  console.log("chaptersDirectory:", chaptersDirectory);
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
