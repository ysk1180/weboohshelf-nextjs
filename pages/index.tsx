import Home from 'components/Home'
import type { NextPage } from 'next'
import Head from 'next/head'

const Index: NextPage = () => {
  const title = 'Web本棚'
  const description = `Web上で本棚を共有できるサービスです。ログイン不要で簡単に本棚が作成できてシェアできます。`
  const url = `https://web-bookshelf.com/`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
      </Head>
      <div className="my-2 mx-3">
        <Home />
      </div>
    </>
  )
}

export default Index
