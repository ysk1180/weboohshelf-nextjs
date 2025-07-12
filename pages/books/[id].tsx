import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import SameBookBookshelves from "components/SameBookBookshelves";
import Breadcrumbs from "components/Breadcrumbs";

type BookData = {
  id: number;
  asin: string;
  title: string;
  image: string | null;
  url: string;
  page: number | null;
  released_at: string | null;
  author?: string;
};

type Props = {
  book: BookData;
};

const BookPage = ({ book }: Props): JSX.Element => {
  const title = `${book.title}${book.author ? ` - ${book.author}` : ''} | Web本棚`
  const description = `「${book.title}」${book.author ? `（${book.author}）` : ''}を含むみんなの本棚を探索。この本と一緒によく読まれているおすすめの本も発見できます。Web本棚で新しい読書体験を。`
  const url = `https://web-bookshelf.com/books/${book.id}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
      </Head>
      <div className="my-2 mx-3">
        <Breadcrumbs list={[
          {href: '/books', display: '本一覧'},
          {display: book.title},
        ]} />
        <div className="flex mb-6 mt-4">
          <div className="w-1/3 md:w-1/4 mr-3 md:mr-4 mt-1.5">
            <img 
              src={book.image || '/book-placeholder.png'} 
              alt={book.title}
              className="w-full h-auto shadow-lg rounded"
            />
          </div>
          <div className="w-2/3 md:w-3/4">
            <h1 className="mb-2 mt-1 text-base md:text-xl font-bold">
              {book.title}
            </h1>
            {book.author && (
              <div className="mb-3 text-sm md:text-base text-gray-100">
                {book.author}
              </div>
            )}
            <div className="flex flex-wrap gap-x-4 text-xs md:text-sm text-gray-300">
              {book.released_at && (
                <div className="my-1">
                  発売日：{book.released_at}
                </div>
              )}
              {!!book.page && book.page !== 0 && (
                <div className="my-1">
                  {book.page}ページ
                </div>
              )}
            </div>
            <div className="mt-6">
              <a
                href={book.url}
                target="_blank"
                className="inline-flex bg-yellow-200 border border-yellow-800 text-black px-4 md:px-5 py-2.5 md:py-3 rounded hover:opacity-80 transition-opacity"
                rel="noreferrer"
              >
                <span className="my-auto text-sm md:text-base">
                  Amazonで見る
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 ml-1 my-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div>
          <SameBookBookshelves book={book} />
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = Number(params?.id)

  const prisma = new PrismaClient()

  const book = await prisma.book.findUnique({
    where: {
      id: id
    },
  })

  if (!book) return { notFound: true };

  return {
    props: {
      book,
    },
    revalidate: 10,
  };
};

export default BookPage;
