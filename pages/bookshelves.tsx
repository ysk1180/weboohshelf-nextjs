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
        <Breadcrumbs list={[{display: '本棚一覧'}]} />
        <div className="my-2">
          <h1 className="text-lg mb-4">
            作成された本棚一覧
            <span className="text-sm ml-2">{page}ページ目</span>
          </h1>
          <div className="mb-5 flex gap-2">
            <input 
              type='search'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="p-2 rounded w-3/4"
              placeholder="入っている本のタイトルで検索"
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
          {bookshelves.map(bookshelf => (
            <div key={bookshelf.id}>
              <PastBookshelf bookshelf={bookshelf} />
            </div>
          ))}
          <Paging page={page} hasNextPage={bookshelves.length === 20} />
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
              contains: q
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

  if (bookshelves.length === 0) return { notFound: true };


  return {
    props: {
      bookshelves,
      page,
    },
  };
};

export default BookshelvesPage;
