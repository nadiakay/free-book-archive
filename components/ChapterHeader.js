export default function ChapterHeader({ book, part, title }) {
  return (
    <section className=" font-serif p-1 pb-3">
      <h2 className="font-bold text-2xl pb-5">{book}</h2>
      <h1 className="text-2xl flex flex-row">
        <span className="pr-3">{part}.</span>
        <span className="border-b border-slate-400 mt-4">{title}</span>
      </h1>
      <div></div>
    </section>
  );
}
