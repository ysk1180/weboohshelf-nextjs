import Head from 'next/head';
import Link from 'next/link';

const Custom404 = (): JSX.Element => {
  const title = 'ページが見つかりませんでした - Web本棚';
  const description = `Web上で本棚を共有できるサービスです。ログイン不要で簡単に本棚が作成できてシェアできます。`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      <div className="m-3">
        <h1 className="text-center text-xl my-3">ページが見つかりませんでした</h1>
        <img src="/not_found.jpeg" />
        <p className="my-3">
          お探しのページが見つかりませんでした。アドレスが間違っているか、ページが移動した可能性があります。
        </p>
        <div className="flex my-4">
          <button className="mx-auto border border-wheite rounded py-3 px-4 hover:opacity-80">
            <Link href="/">
              <a>
                トップページに戻る
              </a>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Custom404;
