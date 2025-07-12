import Link from "next/link";

const Footer = ():JSX.Element => {
  return (
    <div className="py-5 md:py-8 text-sm md:text-base text-gray-300">
      <div className="flex">
        <div className="flex mx-auto">
          <div>
            <Link href="/terms">
              <a>
                利用規約
              </a>
            </Link>
          </div>
          <div className="mx-2">
            /
          </div>
          <div>
            <Link href="/privacy">
              <a>
                プライバシーポリシー
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex mt-1">
        <a href="https://twitter.com/ysk_pro" target="_blank" rel="noreferrer" className="mx-auto inline-flex items-center gap-1">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          開発者Xアカウント
        </a>
      </div>
    </div>
  )
};

export default Footer;
