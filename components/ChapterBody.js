import markdownStyles from "./markdown-styles.module.css";

export default function ChapterBody({ content }) {
  return (
    <div className="max-w-2xl pl-2 pr-1 mx-auto md:max-w-4xl">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
