import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const chaptersDirectory = join(process.cwd(), "_chapters");

export function getChapterSlugs() {
  return fs.readdirSync(chaptersDirectory);
}

export function getChapterBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(chaptersDirectory, `${realSlug}.md`);
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

export function getAllChapters(fields = []) {
  const slugs = getChapterSlugs();
  const chapters = slugs
    .map(slug => getChapterBySlug(slug, fields))
    // sort chapters in descending order
    .sort((chapter1, chapter2) => (chapter1.order > chapter2.order ? -1 : 1));
  return chapters;
}
