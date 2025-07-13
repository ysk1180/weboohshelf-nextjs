import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import { noIdBook } from 'types/expansion_book'

type Props = {
  hash: string
  selectedBooks?: noIdBook[]
}

const ShareLinks = ({hash, selectedBooks}: Props): JSX.Element => {
  const [copied, setCopied] = useState(false)
  
  // 本のタイトルをハッシュタグにする（最大3冊まで）
  const bookHashtags = selectedBooks
    ?.slice(0, 3)
    .map(book => {
      // タイトルから記号や空白を削除してハッシュタグを作成
      const cleanTitle = book.title
        .replace(/[「」『』【】\[\]\(\)（）\s:：]/g, '')
        .slice(0, 20) // 長すぎる場合は20文字まで
      return `#${cleanTitle}`
    })
    .join(' ') || ''
  
  // X（Twitter）用のテキストを作成
  const tweetText = `本棚を作りました📚\n\n#Web本棚 ${bookHashtags}`.trim()
  const shareUrl = `https://web-bookshelf.com/bookshelves/${hash}`
  return (
    <div className="flex">
      <div className="mx-auto flex flex-col sm:flex-row gap-3 max-w-md w-full">
        <a
          className="flex justify-center items-center bg-black hover:bg-gray-900 py-3 px-4 rounded-lg cursor-pointer transition transform hover:scale-105 shadow-lg border border-gray-700"
          href={`https://x.com/intent/post?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noreferrer"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span className="text-sm md:text-base font-medium">
            Xでポスト
          </span>
        </a>
        <CopyToClipboard 
          text={`https://web-bookshelf.com/bookshelves/${hash}`} 
          onCopy={() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
        >
          <button className="flex justify-center items-center bg-gray-600 hover:bg-gray-700 py-3 px-4 rounded-lg cursor-pointer transition transform hover:scale-105 shadow-lg relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <span className="text-sm md:text-base font-medium">
              {copied ? 'コピーしました！' : 'URLをコピー'}
            </span>
            {copied && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                ✓ コピー完了
              </div>
            )}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

export default ShareLinks