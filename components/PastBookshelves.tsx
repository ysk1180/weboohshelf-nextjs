import { Bookshelf } from "@prisma/client"
import { useEffect, useState } from "react"
import { expansionBook } from "types/expansion_book"
import Books from "./Books"
import PastBookshelf from "./PastBookshelf"

const PastBookshelves = (): JSX.Element => {
  const [bookshelves, setBookshelves] = useState<Bookshelf[]>([])
  const [books, setBooks] = useState<expansionBook[]>([])

  useEffect(() => {
    (async() => {

      const res = await fetch("/api/fetch_recent_bookshelves")
      const data = await res.json()
      setBookshelves(data.bookshelves)
      setBooks(data.books)
    })()
  }, [])

  return (
    <div>
      <h2 className="mt-8 mb-3 flex">
        <div className="mx-auto flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 my-auto mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          最近作られた本棚
        </div>
      </h2>
      {bookshelves.map(bookshelf => (
        <div key={bookshelf.id}>
          <PastBookshelf bookshelf={bookshelf} />
        </div>
      ))}
      <h2 className="text-center mt-8 mb-4 flex">
        <div className="mx-auto flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 my-auto mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          </svg>
          本棚に多く入れられた本
        </div>
        </h2>
      <Books books={books} />
    </div>
  )
}

export default PastBookshelves