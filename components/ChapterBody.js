export default function ChapterBody({ content, style }) {
  console.log("style:", style);
  return (
    <div className="mx-4 ">
      <div
        className={"_" + style}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
