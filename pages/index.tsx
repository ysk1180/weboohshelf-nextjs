import { Prisma, PrismaClient } from '@prisma/client'
import Home from 'components/Home'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { expansionBook } from 'types/expansion_book'

type Props = {
  bookshelves: any[]
  books: expansionBook[]
  bookshelfCount: number
  bookCount: number
}

const Index = ({bookshelves, books, bookshelfCount, bookCount}: Props): JSX.Element => {
  const title = 'Web本棚'
  const description = `Web上で本棚を共有できるサービスです。ログイン不要で簡単に本棚が作成できてシェアできます。`
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
    select b2.*, count from Book b2
    inner join (
      select b.id, count(*) as count from Book b
      inner join BookshelfBook bsb on b.id = bsb.book_id
      group by b.id
      order by count(*) desc
      limit 10
    ) t on t.id = b2.id
    ;`)

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
