import Header from "./header";
import Nav from "./Nav";
import Footer from "./footer";
import Meta from "./meta";

export default function Layout({ subjects, children }) {
  return (
    <div>
      <Meta />
      <div className="min-h-screen">
        <Header>
          <Nav subjects={subjects} />
        </Header>
        <main className="mx-2 mt-5">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
