import type { NextApiRequest, NextApiResponse } from 'next'
import amazonPaapi from 'amazon-paapi'
import { noIdBook } from 'types/expansion_book';

const fetchAmazonBooks = async (
  req: NextApiRequest,
  res: NextApiResponse<noIdBook[] | { error: string }>
) => {
  const { keyword } = req.query

  const commonParameters = {
    AccessKey  : process.env.AMAZON_API_ACCESS_KEY,
    SecretKey  : process.env.AMAZON_API_SECRET_KEY,
    PartnerTag : process.env.AMAZON_ASSOCIATE_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.co.jp'
  };

  try {
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

  const returnData: noIdBook[] = []
  data.SearchResult.Items.forEach(item => {
    try {
      let formattedD = ''
      // ContentInfoが存在するかチェック
      if (item.ItemInfo?.ContentInfo?.PublicationDate?.DisplayValue) {
        const d = new Date(item.ItemInfo.ContentInfo.PublicationDate.DisplayValue)
        formattedD = `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`
      }
      
      // 必須フィールドの存在確認
      if (!item.ASIN || !item.ItemInfo?.Title?.DisplayValue) {
        console.warn('Missing required fields for item:', item.ASIN)
        return
      }
      
      returnData.push({
        asin: item.ASIN,
        url: item.DetailPageURL || '',
        title: item.ItemInfo.Title.DisplayValue,
        image: item.Images?.Primary?.Large?.URL || null,
        page: item.ItemInfo?.ContentInfo?.PagesCount?.DisplayValue 
          ? Number(item.ItemInfo.ContentInfo.PagesCount.DisplayValue) 
          : null,
        released_at: formattedD || null,
      });
    } catch (error) {
      console.error('Error processing Amazon item:', error, item.ASIN)
    }
  });

    res.status(200).json(returnData)
  } catch (error) {
    console.error('Amazon API error:', error)
    res.status(500).json({ error: 'Amazon APIでエラーが発生しました' })
  }
}

export default fetchAmazonBooks
