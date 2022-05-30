import Header from "./header";
import Nav from "./Nav";
import Footer from "./footer";
import Meta from "./meta";
import cn from "classnames";

export default function Layout({ subjects, children }) {
  return (
    <div>
      <Meta />
      <div className="bg-slate-200 min-h-screen">
        <Header>
          <Nav subjects={subjects} />
        </Header>
        <main className="mx-2 pb-8">
          <section className="shadow-xl border border-gray-200 rounded-sm bg-white max-w-4xl mx-auto mt-4 font-sans">
            <div className="mx-4 pt-4 pb-8">{children}</div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
