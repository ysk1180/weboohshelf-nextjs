import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';

type Props = {
  hash: string
}

const ShareLinks = ({hash}: Props): JSX.Element => {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex">
      <div className="mx-auto flex flex-col sm:flex-row gap-3 max-w-md w-full">
        <a
          className="flex justify-center items-center bg-sky-500 hover:bg-sky-600 py-3 px-4 rounded-lg cursor-pointer transition transform hover:scale-105 shadow-lg"
          href={`https://twitter.com/share?text=%23Web本棚&url=https://web-bookshelf.com/bookshelves/${hash}`}
          target="_blank"
          rel="noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#fff" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429" /></svg>
          <span className="text-sm md:text-base font-medium">
            Twitterでシェア
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