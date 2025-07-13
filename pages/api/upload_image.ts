import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type returnData = {
  hash: string
}

const uploadImage = async (
  req: NextApiRequest,
  res: NextApiResponse<returnData>
) => {
  const { imageData, selectedBooks, title, user_name, twitter_id } = req.body

  const fileData = imageData.replace(/^data:\w+\/\w+;base64,/, '')
  const decodedFile = Buffer.from(fileData, 'base64')

  const l = 8;
  const c = "abcdefghijklmnopqrstuvwxyz0123456789";
  const cl = c.length;
  let hash = "";
  for(var i=0; i<l; i++){
    hash += c[Math.floor(Math.random()*cl)];
  }

  const s3 = new S3Client({
    region: 'ap-northeast-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID_S3 as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_S3 as string,
    }
  })

  s3.send(
    new PutObjectCommand({
      Bucket: `webookshelf-${process.env.NODE_ENV}`,
      Key: `images/${hash}.png`,
      Body: decodedFile,
    })
  )

  const prisma = new PrismaClient()

  const bookshelf = await prisma.bookshelf.create({
    data: {
      title,
      h: hash,
      user_name,
      twitter_id,
    }
  })
  for (const { asin, title, url, image, page, released_at } of selectedBooks) {
    let book = await prisma.book.findUnique({
      where: {
        asin
      },
    })
    if (!book) {
      book = await prisma.book.create({
        data: {
          asin,
          title,
          url,
          image,
          page: page | 0,
          released_at,
        }
      })
    }
    await prisma.bookshelfBook.create({
      data: {
        book_id: book.id,
        bookshelf_id: bookshelf.id,
      }
    })
  }

  // ISRのオンデマンド再生成を試みる（Next.js 12.2以降で利用可能）
  try {
    await res.revalidate('/')
  } catch (err) {
    // エラーが発生しても処理を続行
    console.log('ISR revalidation failed:', err)
  }

  res.status(200).json({hash})
}

export default uploadImage
