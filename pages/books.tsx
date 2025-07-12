import Head from "next/head";
import { GetServerSideProps } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import Breadcrumbs from "components/Breadcrumbs";
import Books from "components/Books";
import Paging from "components/Paging";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

type Props = {
  books: any[];
  page: number,
};

const BooksPage = ({ books, page }: Props): JSX.Element => {
  const router = useRouter()
  const searchQuery = router.query.q as string
  const title = searchQuery 
    ? `「${searchQuery}」の検索結果 - Web本棚` 
    : `人気の本一覧${page > 1 ? ` (ページ${page})` : ''} - Web本棚`
  const description = searchQuery
    ? `「${searchQuery}」を含む本の一覧。Web本棚でみんなが選んだ人気の本を探して、あなたの読書リストに追加しよう。`
    : `Web本棚でみんなが選んだ人気の本一覧。多くの人に読まれているおすすめの本を発見して、新しい読書体験を始めよう。`
  const url = "https://web-bookshelf.com/books"

  const [keyword, setKeyword] = useState(router.query.q as string || '')

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const query = router.query
    if (keyword) {
      router.push({query: {...query, q: keyword, page: 1}})
    } else {
      const {q, ...rest} = query
      router.push({query: rest})
    }
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
          <h1 className="text-xl md:text-2xl font-bold mb-6">
            本棚に入れられた本一覧
            {router.query.q && (
              <span className="text-sm font-normal text-gray-400 ml-2">
                「{router.query.q}」の検索結果
              </span>
            )}
            <span className="text-sm font-normal text-gray-400 ml-2">{page}ページ目</span>
          </h1>
          <form onSubmit={onSubmit} className="mb-6">
            <div className="flex gap-2 max-w-2xl">
              <div className="relative flex-1">
                <input 
                  type='search'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="本のタイトルを検索..."
                  className="p-3 pr-10 rounded-lg w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                />
                {keyword && (
                  <button
                    type="button"
                    onClick={() => setKeyword('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-6 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 text-white font-medium transition transform hover:scale-105"
              >
                <span>検索</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </div>
          </form>
          {books.length === 0 && router.query.q ? (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <p className="text-gray-400 text-lg mb-2">「{router.query.q}」に一致する本が見つかりませんでした</p>
              <p className="text-gray-500 text-sm">別のキーワードで検索してみてください</p>
            </div>
          ) : (
            <>
              <Books books={books} displayCount='all' />
              <Paging page={page} hasNextPage={books.length === 20} />
            </>
          )}
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

  if (books.length === 0 && !q) return { notFound: true };

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
