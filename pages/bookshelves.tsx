import Head from "next/head";
import { GetServerSideProps } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import Breadcrumbs from "components/Breadcrumbs";
import Books from "components/Books";
import Paging from "components/Paging";
import { useState } from "react";
import { useRouter } from "next/router";
import PastBookshelf from "components/PastBookshelf";

type Props = {
  bookshelves: any[];
  page: number,
};

const BookshelvesPage = ({ bookshelves, page }: Props): JSX.Element => {
  const title = "作成された本棚一覧 - Web本棚"
  const description = "Web上で本棚を共有できるサービスです。ログイン不要で簡単に本棚が作成できてシェアできます。"
  const url = "https://web-bookshelf.com/bookshelves"

  const router = useRouter()
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
        <Breadcrumbs list={[{display: '本棚一覧'}]} />
        <div className="my-2">
          <h1 className="text-xl md:text-2xl font-bold mb-6">
            作成された本棚一覧
            {router.query.q && (
              <span className="text-sm font-normal text-gray-400 ml-2">
                「{router.query.q}」を含む本棚
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
                  placeholder="入っている本のタイトルで検索..."
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
          {bookshelves.length === 0 && router.query.q ? (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
              </svg>
              <p className="text-gray-400 text-lg mb-2">「{router.query.q}」を含む本棚が見つかりませんでした</p>
              <p className="text-gray-500 text-sm">別のキーワードで検索してみてください</p>
            </div>
          ) : (
            <>
              {bookshelves.map(bookshelf => (
                <div key={bookshelf.id}>
                  <PastBookshelf bookshelf={bookshelf} />
                </div>
              ))}
              <Paging page={page} hasNextPage={bookshelves.length === 20} />
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

  const bookshelves = await prisma.bookshelf.findMany({
    take: 20,
    skip: (page - 1) * 20,
    where: {
      books: {
        some: {
          book: {
            title: {
              contains: q.replace(/%/g, '')
            }
          }
        }
      }
    },
    include: {
      books: {
        include: {
          book: true
        }
      }
    },
    orderBy: {
      id: 'desc'
    }
  })

  if (bookshelves.length === 0 && !q) return { notFound: true };


  return {
    props: {
      bookshelves,
      page,
    },
  };
};

export default BookshelvesPage;
