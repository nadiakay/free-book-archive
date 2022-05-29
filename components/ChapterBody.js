export default function ChapterBody({ content, style }) {
  return (
    <div
      className={"_" + style}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
