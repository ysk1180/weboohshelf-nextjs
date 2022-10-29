import Link from "next/link";

const Header = ():JSX.Element => {
  return (
    <nav
      id="header"
      className="bg-black w-full h-12"
    >
      <div className="flex items-center h-full max-w-3xl md:mx-auto">
        <Link href="/">
          <a className="px-4 py-2 text-xl">
            <img src="/logo.png" />
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
