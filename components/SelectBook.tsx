import { Book } from "@prisma/client"
import { useState } from "react"

type Props = {
  setSelectedBooks: any
}

const SelectBook = ({setSelectedBooks}: Props): JSX.Element => {
  const [keyword, setKeyword] = useState("")
  const [candidateBooks, setCandidateBooks] = useState<Book[]>([])

  const onSubmit = async() => {
    if(!keyword) setCandidateBooks([])

    const res = await fetch(`/api/fetch_amazon_books?keyword=${keyword}`)
    const data = await res.json()
    setCandidateBooks(data)
  }

  return (
    <div>
      <div className="flex my-4">
        <div className="">
          本のタイトル
        </div>
        <div className="ml-2">
          <input value={keyword} onChange={e => setKeyword(e.target.value)} />
          {/* onKyeUpでAmazonの検索を走らせるとAmazonAPIにアクセスしすぎてしまうので一旦ボタンで送信するようにしている */}
          {/* <input value={keyword} onKeyUp={onSubmit} onChange={e => setKeyword(e.target.value)} /> */}
          <button onClick={onSubmit}>検索</button>
        </div>
      </div>
      <div className="mx-2 my-4">
        {candidateBooks.map(book => (
          <div
            className="m-3"
            onClick={() => setSelectedBooks(prev => [...prev, book])}
            key={book.asin}
          >
            <div className="flex">
              <div className="w-1/6">
                <img src={book.image} />
              </div>
              <div className="w-5/6 ml-2 flex text-sm">
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