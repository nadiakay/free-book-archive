import fs from "fs";
import { join } from "path";
import { getBookSlugs, getBookBySlug } from "./book";

const booksDirectory = join(process.cwd(), "_book");

export function getChapterBySlug(bookSlug, chapterSlug, fields = []) {
  var chapterSlug = chapterSlug.replace(/\.html$/, "");
  const book = getBookBySlug(bookSlug);

  const items = {};

  fields.forEach(field => {
    const bookData = JSON.parse(
      fs.readFileSync(join("data/book", bookSlug + ".json"))
    );
    //console.log("bookData:", bookData);

    if (field === "slug") {
      console.log("chapterSlug:", chapterSlug);
      items[field] = chapterSlug;
    }
    if (field === "book") {
      items[field] = bookData["slug"];
    }
    if (field === "content") {
      const path = join(booksDirectory, bookSlug, `${chapterSlug}.html`);
      console.log("chapterpath:", path);
      const content = fs.readFileSync(path, "utf8");
      items[field] = content;
    }
    //console.log("data[chapters]:", bookData["chapters"]);
  });

  return items;
}

//fix this
export function getChaptersByBook(bookSlug) {
  const realSlug = bookSlug.replace(/\.md$/, "");
  const chaptersDirectory = join(booksDirectory, `${realSlug}`);
  return fs.readdirSync(chaptersDirectory).filter(slug => slug !== `index.md`);
}

//fix this
export function getAllChapters(fields = []) {
  const books = getBookSlugs();
  const chapters = books.map(book =>
    getChaptersByBook(book).map(slug => getChapterBySlug(book, slug, fields))
  );
  const flatChapters = [].concat(...chapters);
  return flatChapters;
}
