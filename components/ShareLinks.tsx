import { CopyToClipboard } from 'react-copy-to-clipboard';

type Props = {
  hash: string
}

const ShareLinks = ({hash}: Props): JSX.Element => {
  return (
    <div className="flex">
      <div className="mx-auto flex gap-3 md:gap-5">
        <a
          className="flex bg-sky-500 py-3 px-3 rounded hover:opacity-80 cursor-pointer"
          href={`https://twitter.com/share?text=%23Web本棚&url=https://web-bookshelf.com/bookshelves/${hash}`}
          target="_blank"
          rel="noreferrer"
        >
          <span className="my-auto text-sm md:text-base">
            Twitterシェア
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 ml-1 my-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
        <div className="bg-gray-500 rounded flex">
          <div className="my-auto p-2 hover:opacity-80 cursor-pointer">
            <CopyToClipboard text={`https://web-bookshelf.com?/bookshelves/${hash}`} onCopy={() => alert("URLをコピーしました！")}>
              <span className="text-sm md:text-base">
                シェア用のURLをコピー
              </span>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareLinks