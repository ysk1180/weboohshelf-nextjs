import Head from "next/head";
import { GetServerSideProps } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import Breadcrumbs from "components/Breadcrumbs";
import Books from "components/Books";
import Paging from "components/Paging";
import { useState } from "react";
import { useRouter } from "next/router";

type Props = {
  books: any[];
  page: number,
};

const BooksPage = ({ books, page }: Props): JSX.Element => {
  const title = "本棚に入れられた本一覧 - Web本棚"
  const description = `Web上で本棚を共有できるサービスです。ログイン不要で簡単に本棚が作成できてシェアできます。`
  const url = "https://web-bookshelf.com/books"

  const [keyword, setKeyword] = useState('')

  const router = useRouter()

  const onSubmit = () => {
    const query = router.query
    router.push({query: {...query, q: keyword}})
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
      </Head>
      <div className="mx-3">
        <Breadcrumbs list={[{display: '本一覧'}]} />
        <div className="my-2">
          <h1 className="text-lg mb-4">
            本棚に入れられた本一覧
            <span className="text-sm ml-2">{page}ページ目</span>
          </h1>
          <div className="mb-5 flex gap-2">
            <input 
              type='search'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="p-2 rounded w-3/4"
            />
            <button
              onClick={() => onSubmit()}
              className="w-1/4 border border-white hover:opacity-80 p-1.5 rounded flex text-gray-100"
            >
              <div className="mx-auto flex">
                <span className="my-auto">
                  検索
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 my-auto ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </button>
          </div>
          <Books books={books} displayCount='all' />
          <Paging page={page} hasNextPage={books.length === 20} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = Number(query['page'] || 1)
  const q = query['q'] ? `%${query['q']}%` : ''

  const prisma = new PrismaClient()

  const books: any = await prisma.$queryRaw(Prisma.sql`
    SELECT b2.*, t.count FROM "Book" AS b2
    INNER JOIN (
      SELECT b.id, COUNT(*) AS count FROM "Book" AS b
      INNER JOIN "BookshelfBook" AS bsb ON b.id = bsb.book_id
      ${q ? Prisma.sql`WHERE b.title LIKE ${q}` : Prisma.empty}
      GROUP BY b.id
      ORDER BY COUNT(*) DESC
      LIMIT 20
      OFFSET ${20 * (page - 1)}
    ) AS t ON t.id = b2.id
    ;`);

  if (books.length === 0) return { notFound: true };

  // countがそのままだと「error - TypeError: Do not know how to serialize a BigInt」エラーが出てしまうので返還している
  const convertedBooks = books.map((b: any) => ({...b, count: Number(b.count)}))

  return {
    props: {
      books: convertedBooks,
      page,
    },
  };
};

export default BooksPage;
