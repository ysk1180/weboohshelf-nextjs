import { Prisma, PrismaClient } from '@prisma/client'
import Home from 'components/Home'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import { expansionBook } from 'types/expansion_book'

type Props = {
  bookshelves: any[]
  books: expansionBook[]
  bookshelfCount: number
  bookCount: number
}

const Index = ({bookshelves, books, bookshelfCount, bookCount}: Props): JSX.Element => {
  const title = 'Web本棚 - 無料でお気に入りの本をシェアしよう'
  const description = `Web本棚は、ログイン不要でお気に入りの本を選んでオリジナルの本棚を作成できる無料サービスです。最大5冊まで選んで、Xやブログで簡単にシェアできます。`
  const url = `https://web-bookshelf.com/`

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
        <Home
          bookshelves={bookshelves}
          books={books}
          bookshelfCount={bookshelfCount}
          bookCount={bookCount}
        />
      </div>
    </>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()

  const bookshelves = await prisma.bookshelf.findMany({
    take: 5,
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

  const books: any = await prisma.$queryRaw(Prisma.sql`
    SELECT b2.*, t.count FROM "Book" b2
    INNER JOIN (
      SELECT b.id, COUNT(*) AS count FROM "Book" b
      INNER JOIN "BookshelfBook" bsb ON b.id = bsb.book_id
      GROUP BY b.id
      ORDER BY COUNT(*) DESC
      LIMIT 10
    ) t ON t.id = b2.id
    ;`);

  // countがそのままだと「error - TypeError: Do not know how to serialize a BigInt」エラーが出てしまうので返還している
  const convertedBooks = books.map((b: any) => ({...b, count: Number(b.count)}))

  const bookshelfCount = await prisma.bookshelf.count()
  const bookCount = await prisma.book.count()

  return {
    props: {
      bookshelves,
      books: convertedBooks,
      bookshelfCount,
      bookCount,
    },
    revalidate: 3600,
  };
};
