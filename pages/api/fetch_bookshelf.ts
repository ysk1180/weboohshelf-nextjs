import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const fetchBookshelf = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const query = req.query
  const hash = query.hash as string

  const prisma = new PrismaClient()

  const bookshelf = await prisma.bookshelf.findMany({
    where: {
      hash: hash
    },
    include: {
      books: {
        include: {
          book: true
        }
      }
    }
  })

  res.status(200).json({bookshelf: bookshelf[0]})
}

export default fetchBookshelf
