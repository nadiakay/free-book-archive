import { getAllBooks } from "./books";

export function getAllSubjects() {
  const subjects = getAllBooks(["subject"])
    .map(item => item.subject)
    .filter((value, index, self) => self.indexOf(value) === index);
  return subjects;
}
