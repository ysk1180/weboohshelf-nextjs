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
      
      <div className="mb-4">
        <label className="text-sm text-gray-400">本を検索</label>
        <div className="relative">
          <input
            type="search"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="p-2 w-full rounded border border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:outline-none transition pr-10"
            placeholder="タイトルや著者名で検索"
          />
          <button 
            onClick={onSubmit} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
      </div>
      {candidateBooks.length > 0 && (
        <div>
          <div 
            className="flex items-center justify-between p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700 transition mb-2" 
            onClick={() => setOpenCandidates((prev) => !prev)}
          >
            <span className="text-sm text-gray-300">
              検索結果 ({candidateBooks.length}冊)
            </span>
            {openCandidates ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
                <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          {openCandidates && (
            <div className="space-y-2">
              {candidateBooks.map(book => (
                <div
                  className="bg-gray-800 p-2 rounded hover:bg-gray-700 cursor-pointer transition border border-transparent hover:border-gray-600"
                  onClick={() => setSelectedBooks(prev => [...prev, book])}
                  key={book.asin}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-16 flex-shrink-0">
                      <img 
                        src={book.image || undefined} 
                        alt={book.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-white line-clamp-2">
                        {book.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SelectBook