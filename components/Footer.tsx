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
        <a href="https://twitter.com/ysk_pro" target="_blank" rel="noreferrer" className="mx-auto">
          開発者Twitterアカウント
        </a>
      </div>
    </div>
  )
};

export default Footer;
