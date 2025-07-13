import Link from "next/link";

const Header = ():JSX.Element => {
  return (
    <nav
      id="header"
      className="bg-black w-full h-12"
    >
      <div className="flex items-center h-full max-w-3xl mx-auto px-4 md:px-0">
        <Link href="/">
          <a className="py-2 text-xl">
            <img src="/logo.png" alt="Web本棚" className="h-8" />
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
