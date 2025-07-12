import Head from 'next/head';
import Link from 'next/link';

const Custom404 = (): JSX.Element => {
  const title = '404 ページが見つかりません - Web本棚';
  const description = `お探しのページが見つかりませんでした。Web本棚のトップページから、お気に入りの本でオリジナルの本棚を作成してみませんか？`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-gray-200 mb-4">404</h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-2">ページが見つかりません</h2>
          </div>
          
          <div className="mb-8 max-w-sm mx-auto">
            <img 
              src="/not_found.jpeg" 
              alt="404 Not Found"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <p className="text-gray-400 mb-8 px-4">
            お探しのページが見つかりませんでした。<br />
            アドレスが間違っているか、ページが移動した可能性があります。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <a className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-6 font-medium transition transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                トップページに戻る
              </a>
            </Link>
            <Link href="/books">
              <a className="inline-flex items-center justify-center border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-gray-200 rounded-lg py-3 px-6 font-medium transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                本一覧を見る
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;
