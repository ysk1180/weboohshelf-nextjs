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
    <div className="my-5">
      <div className="flex">
        <div className="text-xs text-gray-400 mb-2 mx-auto">
          タイトルの一部を入力し、本棚に追加する本を選びましょう！
        </div>
      </div>
      <div className="flex mx-auto">
        <div className="my-auto mr-1 w-1/4 text-sm md:text-base">
          本のタイトル
        </div>
        <input
          type="search"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          className="p-2 w-8/12 rounded"
        />
        <button onClick={onSubmit} className="w-1/12 hover:opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-1 h-6 my-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
      <div className="mx-2 my-4">
        {candidateBooks.length > 0 && (
          <div className="text-xs flex hover:opacity-80 cursor-pointer" onClick={() => setOpenCandidates((prev) => !prev)}>
            <div className="flex mx-auto">
              <span className="my-auto">
                候補を{openCandidates ? '閉じる' : '展開する'}
              </span>
              {openCandidates ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 my-auto">
                  <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 my-auto">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        )}
        {openCandidates && candidateBooks.map(book => (
          <div
            className="m-3 hover:opacity-80 cursor-pointer"
            onClick={() => setSelectedBooks(prev => [...prev, book])}
            key={book.asin}
          >
            <div className="flex">
              <div className="w-1/6 md:w-1/12">
                <img src={book.image || undefined} />
              </div>
              <div className="w-5/6 md:w-11/12 ml-2 flex text-sm">
                <div className="my-auto">
                  {book.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectBook