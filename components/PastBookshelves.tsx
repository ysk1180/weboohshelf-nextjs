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
      <h2 className="text-center mt-8">最近作られた本棚</h2>
      {bookshelves.map(bookshelf => (
        <div key={bookshelf.id}>
          <PastBookshelf bookshelf={bookshelf} />
        </div>
      ))}
      <h2 className="text-center mt-8">本棚に多く入れられた本</h2>
      <Books books={books} />
    </div>
  )
}

export default PastBookshelves