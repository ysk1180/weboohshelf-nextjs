import type { NextPage } from 'next'
import { useState } from 'react'
import { Book } from './api/fetch_amazon_books'

const Home: NextPage = () => {
  const [keyword, setKeyword] = useState("")
  const [candidateBooks, setCandidateBooks] = useState<Book[]>([])
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([])
  const [title, setTitle] = useState("わたしの本棚")

  const onSubmit = async() => {
    if(!keyword) setCandidateBooks([])

    const res = await fetch(`/api/fetch_amazon_books?keyword=${keyword}`)
    const data = await res.json()
    setCandidateBooks(data)
  }

  return (
    <div className="m-2">
      <div className="relative">
        <div>
          <img src="/bookshelf.png" />
        </div>
        <div className="absolute top-4 mx-4 text-2xl font-bold">{title}</div>
        <div className="absolute bottom-5 flex justify-between mx-2" >
          {selectedBooks.map(book => (
            <div className="w-1/5 mx-1">
              <img src={book.image} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex my-4">
        <div className="">
          本のタイトル
        </div>
        <div className="ml-2">
          <input value={keyword} onKeyUp={onSubmit} onChange={e => setKeyword(e.target.value)} />
        </div>
      </div>
      {selectedBooks.length < 5 && (
        <div className="mx-2 my-4">
          {candidateBooks.map(book => (
            <div
              className="m-3"
              onClick={() => setSelectedBooks(prev => [...prev, book])}
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
      )}
      <div className="flex my-3">
        <div className="">
          本棚のタイトル
        </div>
        <div className="ml-2">
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
      </div>
    </div>
  )
}

export default Home
