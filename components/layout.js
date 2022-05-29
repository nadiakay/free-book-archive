import Header from "./header";
import Nav from "./Nav";
import Footer from "./footer";
import Meta from "./meta";
import cn from "classnames";

export default function Layout({ style, subjects, children }) {
  return (
    <div>
      <Meta />
      <div className={cn(style, "min-h-screen")}>
        <Header>
          <Nav subjects={subjects} />
        </Header>
        <main className="mx-2 pb-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
