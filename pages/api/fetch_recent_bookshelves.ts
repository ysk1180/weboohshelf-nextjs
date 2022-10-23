import { Prisma, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const fetchRecentBookshelves = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
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

  res.status(200).json({bookshelves, books: convertedBooks})
}

export default fetchRecentBookshelves
