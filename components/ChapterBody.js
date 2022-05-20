import markdownStyles from "./markdown-styles.module.css";

export default function ChapterBody({ content }) {
  return (
    <div className="mx-4 ">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
