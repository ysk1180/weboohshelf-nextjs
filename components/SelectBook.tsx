import { Book } from "@prisma/client"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type Props = {
  setSelectedBooks: Dispatch<SetStateAction<Book[]>>
}

const SelectBook = ({setSelectedBooks}: Props): JSX.Element => {
  const [keyword, setKeyword] = useState("")
  const [candidateBooks, setCandidateBooks] = useState<Book[]>([])

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
    console.log(keyword)

    const res = await fetch(`/api/fetch_amazon_books?keyword=${keyword}`)
    const data = await res.json()
    setCandidateBooks(data)
  }

  return (
    <div className="my-5">
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
        <button onClick={onSubmit} className="w-1/12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-1 h-6 my-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
      <div className="mx-2 my-4">
        {candidateBooks.map(book => (
          <div
            className="m-3 hover:opacity-80 cursor-pointer"
            onClick={() => setSelectedBooks(prev => [...prev, book])}
            key={book.asin}
          >
            <div className="flex">
              <div className="w-1/6 md:w-1/12">
                <img src={book.image} />
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