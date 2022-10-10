import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const fetchRecentBookshelves = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const query = req.query
  const hash = query.hash as string

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

  res.status(200).json({bookshelves})
}

export default fetchRecentBookshelves
