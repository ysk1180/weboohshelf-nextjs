import { Book, Bookshelf } from "@prisma/client"
import { useEffect, useState } from "react"
import { expansionBook } from "types/expansion_book"
import PastBookshelf from "./PastBookshelf"
import Books from "./Books"

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
      <h2 className="mt-8 flex">
        <div className="mx-auto flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 mr-1 my-auto text-yellow-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
          </svg>
          この本が入っている本棚
        </div>
      </h2>
      {bookshelves.map(bookshelf => (
        <div key={bookshelf.id}>
          <PastBookshelf bookshelf={bookshelf} />
        </div>
      ))}
      <h2 className="mt-10 mb-1 flex">
        <div className="mx-auto flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 mr-1 my-auto text-yellow-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>

          この本と一緒によく読まれている本
        </div>
      </h2>
      <div className="text-xs mb-4 mt-3 text-gray-200 text-center">
        （「{book.title}」と同じ本棚に入っている本）
      </div>
      <Books books={books} displayCount='sameBookshelf' />
    </div>
  )
}

export default SameBookBookshelves