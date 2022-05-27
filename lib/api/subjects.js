import { getAllBooks } from "./book";

export function getAllSubjects() {
  const subjects = [].concat
    .apply(
      [],
      getAllBooks(["subjects"]).map(item => item.subjects)
    )
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();
  return subjects;
}
