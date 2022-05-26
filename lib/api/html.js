import fs from "fs";
import { join, extname } from "path";
import * as cheerio from "cheerio";

const htmlDirectory = join(process.cwd(), "_html");

export function getBookSlugs() {
  return fs.readdirSync(htmlDirectory);
}

export function getBookChapters(bookSlug) {
  const chaptersDirectory = join(htmlDirectory, `${bookSlug}`);
  return fs.readdirSync(chaptersDirectory).filter(file => {
    return extname(file).toLocaleLowerCase() === ".html";
  });
}

export function getChapterBySlugs(bookSlug, chapterSlug, fields = []) {
  const realSlug = chapterSlug.replace(/\.html$/, "");
  const fullPath = join(htmlDirectory, bookSlug, `${realSlug}.html`);
  const doc = fs.readFileSync(fullPath, "utf8");
  const $ = cheerio.load(doc);
  const title = $("title").text();
  const html = $(".mw-content-ltr").html();

  const items = {};

  fields.forEach(field => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = html;
    }
    if (field === "title") {
      if (title) {
        items[field] = title;
      } else items[field] = "";
    }
    if (field === "book") {
      items[field] = bookSlug;
    }
  });

  return items;
}

export function getBookBySlug(slug, fields = []) {
  const path = join(htmlDirectory, `${slug}`);

  const items = {};

  fields.forEach(field => {
    if (field === "slug") {
      items[field] = slug;
    }
    if (field === "title") {
      const doc = fs.readFileSync(join(path, "0.html"), "utf8");
      const $ = cheerio.load(doc);
      const title = $("title").text();
      items[field] = title;
    }
  });

  return items;
}

export function getAllChapters(fields = []) {
  const bookSlugs = getBookSlugs();
  const chapters = bookSlugs.map(bookSlug =>
    getBookChapters(bookSlug).map(slug =>
      getChapterBySlugs(bookSlug, slug, fields)
    )
  );
  const flatChapters = [].concat(...chapters);
  return flatChapters;
}
