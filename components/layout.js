import Header from "./header";
import Footer from "./footer";
import Meta from "./meta";

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
