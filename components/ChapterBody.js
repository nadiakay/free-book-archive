export default function ChapterBody({ content, style }) {
  return (
    <section
      className={"_" + style + " font-serif my-16"}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
