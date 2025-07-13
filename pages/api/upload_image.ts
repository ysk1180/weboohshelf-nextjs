import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type returnData = {
  hash: string
} | {
  error: string
}

const uploadImage = async (
  req: NextApiRequest,
  res: NextApiResponse<returnData>
) => {
  // POSTメソッドのみ許可
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }

  try {
    // 環境変数チェック
    if (!process.env.AWS_ACCESS_KEY_ID_S3 || !process.env.AWS_SECRET_ACCESS_KEY_S3) {
      console.error('Missing S3 credentials')
      throw new Error('S3 credentials not configured')
    }

    const { imageData, selectedBooks, title, user_name, twitter_id } = req.body

    if (!imageData || !selectedBooks || !Array.isArray(selectedBooks)) {
      throw new Error('Missing required fields')
    }

    const fileData = imageData.replace(/^data:\w+\/\w+;base64,/, '')
    const decodedFile = Buffer.from(fileData, 'base64')

    const l = 8;
    const c = "abcdefghijklmnopqrstuvwxyz0123456789";
    const cl = c.length;
    let hash = "";
    for(var i=0; i<l; i++){
      hash += c[Math.floor(Math.random()*cl)];
    }

    console.log('Generated hash:', hash)
    console.log('NODE_ENV:', process.env.NODE_ENV)
    console.log('S3 bucket:', `webookshelf-${process.env.NODE_ENV}`)

    const s3 = new S3Client({
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_S3 as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_S3 as string,
      }
    })

    // 本番環境のバケット名を明確に指定
    const bucketName = process.env.NODE_ENV === 'production' 
      ? 'webookshelf-production' 
      : `webookshelf-${process.env.NODE_ENV}`
    
    console.log('Using S3 bucket:', bucketName)
    
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
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

    // ISRのオンデマンド再生成は本番環境で問題が発生するため一旦無効化
    // TODO: 本番環境でのrevalidate対応を検討

    res.status(200).json({hash})
  } catch (error) {
    console.error('Upload error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    // 一時的に本番環境でも詳細なエラー情報を出力
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorDetails = {
      error: errorMessage,
      stack: error instanceof Error ? error.stack?.split('\n').slice(0, 3).join('\n') : undefined,
      env: process.env.NODE_ENV,
      bucket: `webookshelf-${process.env.NODE_ENV}`,
      hasS3Credentials: !!(process.env.AWS_ACCESS_KEY_ID_S3 && process.env.AWS_SECRET_ACCESS_KEY_S3)
    }
    
    res.status(500).json(errorDetails)
  }
}

export default uploadImage