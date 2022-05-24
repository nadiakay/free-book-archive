const htmlDirectory = join(process.cwd(), "_html");

export function getHtmlSlugs() {
  return fs.readdirSync(htmlDirectory);
}
export function getHtmlChapters(book) {
  const chaptersDirectory = join(htmlDirectory, `${book.slug}`);
  fs.readdirSync(chaptersDirectory);
}

export function getChapterBySlug(bookSlug, slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(htmlDirectory, bookSlug, `${realSlug}.md`);
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
