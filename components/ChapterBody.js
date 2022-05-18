import markdownStyles from "./markdown-styles.module.css";

export default function ChapterBody({ content }) {
  return (
    <div className="max-w-2xl px-1 mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
