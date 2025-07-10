import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { noIdBook } from "types/expansion_book"

type Props = {
  setSelectedBooks: Dispatch<SetStateAction<noIdBook[]>>
}

const SelectBook = ({setSelectedBooks}: Props): JSX.Element => {
  const [keyword, setKeyword] = useState("")
  const [candidateBooks, setCandidateBooks] = useState<noIdBook[]>([])
  const [openCandidates, setOpenCandidates] = useState(true)

  // ユーザーが入力後に少し待ってから検索を走らせる（入力途中のものでAmazonAPIにアクセスしてしまうのを防ぐため）
  // 参考：https://stackoverflow.com/questions/42217121/how-to-start-search-only-when-user-stops-typing
  useEffect(() => {
    const delayFn = setTimeout(() => {
      onSubmit()
    }, 800)

    return () => clearTimeout(delayFn)
  }, [keyword])

  const onSubmit = async() => {
    if(!keyword) {
      setCandidateBooks([])
      return
    }

    const res = await fetch(`/api/fetch_amazon_books?keyword=${keyword}`)
    const data = await res.json()
    setCandidateBooks(data)
    setOpenCandidates(true)
  }

  return (
    <div className="my-6">
      <div className="text-center mb-4">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-bold text-white mb-2 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2 text-yellow-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25A8.967 8.967 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            あなたの好きな本を見つけよう！
          </h3>
          <p className="text-green-100 text-sm">
            タイトルを入力すると、Amazonから本を検索できます。最大5冊まで選択可能です。
          </p>
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-sm font-medium text-gray-200 min-w-max">
            🔍 本のタイトル
          </div>
          <div className="flex-1 relative">
            <input
              type="search"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              className="p-3 w-full rounded-lg border-2 border-gray-600 focus:border-green-500 focus:outline-none transition pr-12"
              placeholder="例: 君の名は、ハリーポッター、進撃の巨人..."
            />
            <button 
              onClick={onSubmit} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:opacity-80 text-gray-400 hover:text-green-400 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2 text-center">
          💡 ヒント: 作者名や部分的なタイトルでも検索できます
        </div>
      </div>
      {candidateBooks.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4">
          <div 
            className="flex items-center justify-center space-x-2 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer transition mb-4" 
            onClick={() => setOpenCandidates((prev) => !prev)}
          >
            <span className="text-sm font-medium text-gray-200">
              📖 見つかった本 ({candidateBooks.length}冊)
            </span>
            <span className="text-xs text-gray-400">
              {openCandidates ? '閉じる' : '展開する'}
            </span>
            {openCandidates ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          {openCandidates && (
            <div className="space-y-3">
              {candidateBooks.map(book => (
                <div
                  className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 cursor-pointer transition transform hover:scale-105 border-2 border-transparent hover:border-green-500"
                  onClick={() => setSelectedBooks(prev => [...prev, book])}
                  key={book.asin}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-20 flex-shrink-0">
                      <img 
                        src={book.image || undefined} 
                        alt={book.title}
                        className="w-full h-full object-cover rounded shadow-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white line-clamp-2 leading-tight">
                        {book.title}
                      </h4>
                      <div className="mt-2 flex items-center text-xs text-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        クリックして本棚に追加
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  )
}

export default SelectBook