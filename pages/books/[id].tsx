import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import SameBookBookshelves from "components/SameBookBookshelves";

type Props = {
  book: any;
};

const FacilityDetail = ({ book }: Props): JSX.Element => {
  const title = `${book.title} - Web本棚`

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        {/* TODO: パンくずリスト */}
        <div className="flex mb-6">
          <div className="w-1/3 md:w-1/4 mr-2.5 md:mr-4 mt-1.5">
            <img src={book.image} />
          </div>
          <div className="w-2/3 md:w-3/4">
            <h1 className="mb-4 mt-1 text-base md:text-xl">
              {book.title}
            </h1>
            {book.released_at && (
              <div className="my-1 text-xs md:text-sm text-gray-200">
                発売日：{book.released_at}
              </div>
            )}
            {!!book.page && book.page !== 0 && (
              <div className="my-1 text-xs md:text-sm text-gray-200">
                {book.page}ページ
              </div>
            )}
            <div className="mt-6">
              <a
                href={book.url}
                target="_blank"
                className="flex bg-yellow-200 border border-yellow-800 text-black px-5 py-3 rounded w-fit hover:opacity-80"
                rel="noreferrer"
              >
                <span className="my-auto md:text-lg">
                  Amazonの詳細ページ
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 ml-1 my-auto">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
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
    revalidate: 3600,
  };
};

export default FacilityDetail;
