import { ReactElement } from "react";
import Header from "components/Header";
import Footer from "components/Footer";

type Props = {
  children: ReactElement
}

const Layout = ({ children }:Props):JSX.Element => {
  return (
    <div>
      <Header />
      <div className="max-w-2xl md:m-auto">
        <main className="p-2">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
