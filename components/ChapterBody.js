import bookStyles from "./book-styles.module.css";

export default function ChapterBody({ content, style }) {
  return (
    <div className="mx-4 ">
      <div
        className={bookStyles["_" + style]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
