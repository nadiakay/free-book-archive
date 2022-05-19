import { getAllBooks } from "./books";

export function getAllSubjects() {
  const books = getAllBooks(["subject"]);

  subjects = books.map(item => item.subject);
  return subjects;
}
