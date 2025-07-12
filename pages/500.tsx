import Head from 'next/head';
import Link from 'next/link';

const Custom500 = (): JSX.Element => {
  const title = '500 サーバーエラー - Web本棚';
  const description = `予期せぬエラーが発生しました。しばらく経ってから再度アクセスしてください。Web本棚でお気に入りの本をシェアしましょう。`

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
            <h1 className="text-6xl md:text-8xl font-bold text-gray-200 mb-4">500</h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-2">サーバーエラー</h2>
          </div>
          
          <div className="mb-8 max-w-sm mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-32 h-32 mx-auto text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          
          <p className="text-gray-400 mb-8 px-4">
            予期せぬエラーが発生しました。<br />
            申し訳ございませんが、しばらく経ってから再度お試しください。
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
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-gray-200 rounded-lg py-3 px-6 font-medium transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              ページを再読み込み
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom500;
