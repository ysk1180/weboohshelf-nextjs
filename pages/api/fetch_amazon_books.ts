import type { NextApiRequest, NextApiResponse } from 'next'
import amazonPaapi from 'amazon-paapi'

export type Book = {
  asin: string
  url: string
  title: string
  image: string
}

const fetchAmazonBooks = async (
  req: NextApiRequest,
  res: NextApiResponse<Book[]>
) => {
  const { keyword } = req.query

  const commonParameters = {
    AccessKey  : process.env.AMAZON_API_ACCESS_KEY,
    SecretKey  : process.env.AMAZON_API_SECRET_KEY,
    PartnerTag : process.env.AMAZON_ASSOCIATE_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.co.jp'
  };

  const data = await amazonPaapi.SearchItems(commonParameters, {
    Keywords   : keyword,
    SearchIndex: 'Books',
    ItemCount  : 10,
    Resources  : [
      'ItemInfo.Title',
      'Images.Primary.Large',
    ]
  })

  const returnData: Book[] = []
  data.SearchResult.Items.forEach(item => {
    returnData.push({
      asin  : item.ASIN,
      url   : item.DetailPageURL,
      title : item.ItemInfo.Title.DisplayValue,
      image : item.Images.Primary.Large.URL,
    });
  });

  res.status(200).json(returnData)
}

export default fetchAmazonBooks
