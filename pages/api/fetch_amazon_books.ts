import type { NextApiRequest, NextApiResponse } from 'next'
import amazonPaapi from 'amazon-paapi'
import { Book } from '@prisma/client';

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
      'ItemInfo.ContentInfo',
    ]
  })

  const returnData: Book[] = []
  data.SearchResult.Items.forEach(item => {
    const d = new Date(item.ItemInfo.ContentInfo.PublicationDate.DisplayValue)
    const formattedD = `${d.getFullYear()}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`
    returnData.push({
      asin: item.ASIN,
      url: item.DetailPageURL,
      title: item.ItemInfo.Title.DisplayValue,
      image: item.Images.Primary.Large.URL,
      page: item.ItemInfo.ContentInfo.PagesCount?.DisplayValue,
      released_at: formattedD,
    });
  });

  res.status(200).json(returnData)
}

export default fetchAmazonBooks
