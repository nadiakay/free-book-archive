import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Header />
        <main className="mx-auto md:max-w-6xl md:mt-5">{children}</main>
      </div>
      <Footer />
    </>
  );
}
