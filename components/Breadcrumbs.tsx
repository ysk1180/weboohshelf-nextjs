import Link from 'next/link';
import Head from 'next/head';

type Props = {
  list: { display: string; href?: string }[];
};

const Breadcrumbs = ({ list }: Props): JSX.Element => {
  const renderList = () =>
    list.map((e, index) => {
      if (index === list.length - 1) {
        return (
          <span key={e.display} className="text-sm text-gray-100">
            {e.display}
          </span>
        );
      } else {
        return (
          <span key={e.display} className="text-sm text-gyra-300 cursor-pointer hover:opacity-80">
            <Link href={e.href as string}>
              <a>{e.display}</a>
            </Link>
            <span className="text-gray-400 mx-1">{'>'}</span>
          </span>
        );
      }
    });

  const escape = (str) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return str.replace(/[&<>"']/g, (c) => map[c]);
  };

  const jsonLdList = () => {
    const top = [
      `{
        "type": "ListItem",
        "position": 1,
        "name": "Web本棚",
        "item": "https://web-bookshelf.com"
      }`,
    ];
    const other = list.map((e, index) => {
      if (index === list.length - 1) {
        return `{ "type": "ListItem", "position": ${index + 2}, "name": "${e.display
          }" }`;
      } else {
        return `{
          "type": "ListItem",
          "position": ${index + 2},
          "name": "${escape(e.display)}",
          "item": "https://web-bookshelf.com${e.href}"
        }`;
      }
    });
    return top.concat(other);
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "http://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [${jsonLdList()}]
            }`,
          }}
        />
      </Head>
      <div className="">
        <span className="text-sm text-gray-300 cursor-pointer hover:opacity-80">
          <Link href="/">
            <a>TOP</a>
          </Link>
        </span>
        <span className="text-gray-400 mx-1">{'>'}</span>
        {renderList()}
      </div>
    </>
  );
};

export default Breadcrumbs;
