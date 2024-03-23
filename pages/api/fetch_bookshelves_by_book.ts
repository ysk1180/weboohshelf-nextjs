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

  const books: any = await prisma.$queryRaw(Prisma.sql`
    SELECT b2.*, t.count FROM "Book" AS b2
    INNER JOIN (
      SELECT b.id, COUNT(*) AS count
      FROM "Book" AS b
      INNER JOIN "BookshelfBook" AS bsb2 ON b.id = bsb2.book_id
      WHERE NOT b.id = ${bookId} AND EXISTS (
        SELECT 1
        FROM "Bookshelf" AS bs
        WHERE bsb2.bookshelf_id = bs.id AND EXISTS (
          SELECT 1
          FROM "BookshelfBook" AS bsb
          WHERE bsb.book_id = ${bookId}
          AND bsb.bookshelf_id = bs.id
        )
      )
      GROUP BY b.id
      ORDER BY COUNT(*) DESC
      LIMIT 10
    ) AS t ON t.id = b2.id
    ;`);

  // countがそのままだと「error - TypeError: Do not know how to serialize a BigInt」エラーが出てしまうので返還している
  const convertedBooks = books.map((b: any) => ({...b, count: Number(b.count)}))

  res.status(200).json({bookshelves, books: convertedBooks})
}

export default fetchBookshelvesByBook
