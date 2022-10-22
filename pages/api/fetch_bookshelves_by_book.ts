import { Prisma, PrismaClient } from '@prisma/client'
import { count } from 'console'
import type { NextApiRequest, NextApiResponse } from 'next'

const fetchBookshelvesByBook = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const query = req.query
  const bookId = Number(query.book_id)

  const prisma = new PrismaClient()

  const bookshelves = await prisma.bookshelf.findMany({
    take: 5,
    where: {
      books: {
        some: {
          book_id: bookId,
        },
      },
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

  const books = await prisma.$queryRaw(Prisma.sql`
    select b2.*, t.count from Book b2
      inner join (
      select b.id, count(*) as count
      from Book b
      inner join BookshelfBook bsb2 on b.id = bsb2.book_id
      where not b.id = ${bookId} and exists (
        select 1
        from Bookshelf bs
        where bsb2.bookshelf_id = bs.id and exists
          (select 1
          from BookshelfBook bsb
          where bsb.book_id = ${bookId}
            and bsb.bookshelf_id = bs.id)
      )
      group by b.id
      order by count(*) desc
      limit 10
      ) t on t.id = b2.id
    ;`)

  // countがそのままだと「error - TypeError: Do not know how to serialize a BigInt」エラーが出てしまうので返還している
  const convertedBooks = books.map((b: object) => ({...b, count: Number(b.count)}))

  res.status(200).json({bookshelves, books: convertedBooks})
}

export default fetchBookshelvesByBook
