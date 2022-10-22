import { Book, Bookshelf } from "@prisma/client"
import { useEffect, useState } from "react"
import { expansionBook } from "types/expansion_book"
import PastBookshelf from "./PastBookshelf"
import SameBookshelfBooks from "./Books"

type Props = {
  book: Book
}

const SameBookBookshelves = ({book}: Props): JSX.Element => {
  const [bookshelves, setBookshelves] = useState<Bookshelf[]>([])
  const [books, setBooks] = useState<expansionBook[]>([])

  useEffect(() => {
    (async() => {

      const res = await fetch(`/api/fetch_bookshelves_by_book?book_id=${book.id}`)
      const data = await res.json()
      setBookshelves(data.bookshelves)
      setBooks(data.books)
    })()
  }, [])

  return (
    <div>
      <h2 className="text-center mt-8">「{book.title}」が入っている本棚</h2>
      {bookshelves.map(bookshelf => (
        <div key={bookshelf.id}>
          <PastBookshelf bookshelf={bookshelf} />
        </div>
      ))}
      <h2 className="text-center mt-10 mb-1">この本と一緒によく読まれている本</h2>
      <div className="text-xs mb-3 text-gray-200">
        （「{book.title}」と同じ本棚に入っている本）
      </div>
      <SameBookshelfBooks books={books} isSameBookshelf />
    </div>
  )
}

export default SameBookBookshelves