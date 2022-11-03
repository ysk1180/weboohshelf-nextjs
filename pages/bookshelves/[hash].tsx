import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import PastBookshelf from "components/PastBookshelf";
import Home from "components/Home";
import ShareLinks from "components/ShareLinks";
import Books from "components/Books";
import Breadcrumbs from "components/Breadcrumbs";

type Props = {
  bookshelf: any;
};

const BookshelfDetail = ({ bookshelf }: Props): JSX.Element => {
  const title = `${bookshelf.title} - Web本棚`
  const description = `Web上で本棚を共有できるサービスです。ログイン不要で簡単に本棚が作成できてシェアできます。`
  const url = `https://web-bookshelf.com/bookshelves/${bookshelf.h}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`https://webookshelf-${process.env.NODE_ENV}.s3-ap-northeast-1.amazonaws.com/images/${bookshelf.h}.png`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="my-2 mx-3">
        <Breadcrumbs list={[{display: `${bookshelf.user_name || '名無し'}さんの「${bookshelf.title}」`}]} />
        <div className="mb-8">
          <PastBookshelf bookshelf={bookshelf} />
          <ShareLinks hash={bookshelf.h} />
          <div className="my-8 md:my-10">
            <h2 className="mb-1 flex">
              <div className="mx-auto flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 mr-1 my-auto text-yellow-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                本棚に入っている本
              </div>
            </h2>
            <Books books={bookshelf.books.map(b => b.book)} displayCount='none' />
          </div>
        </div>
        <Home />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const hash = params?.hash as string

  const prisma = new PrismaClient()

  const bookshelves = await prisma.bookshelf.findMany({
    where: {
      h: hash
    },
    include: {
      books: {
        include: {
          book: true
        }
      }
    }
  })

  if (!bookshelves[0]) return { notFound: true };

  return {
    props: {
      bookshelf: bookshelves[0],
    },
    revalidate: 3600,
  };
};

export default BookshelfDetail;
