import Link from "next/link"
import { expansionBook } from "types/expansion_book"
import Books from "./Books"
import PastBookshelf from "./PastBookshelf"

type Props = {
  bookshelves: any[]
  books: expansionBook[]
  bookshelfCount: number
  bookCount: number
}

const PastBookshelves = ({bookshelves, books, bookshelfCount, bookCount}: Props): JSX.Element => {
  return (
    <div>
      <h2 className="mt-8 mb-2.5 text-center font-medium">
        最近作られた本棚
      </h2>
      <div className="text-gray-300 text-center text-xs">
        今までに{bookshelfCount}個の本棚が作られました
      </div>
      {bookshelves.map(bookshelf => (
        <div key={bookshelf.id}>
          <PastBookshelf bookshelf={bookshelf} />
        </div>
      ))}
      <div className="my-3">
        <Link href="/bookshelves">
          <a className="flex underline hover:opacity-80">
            <div className="flex mx-auto">
              <span className="my-auto">
                本棚をもっと見る
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 my-auto ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </a>
        </Link>
      </div>
      <h2 className="text-center mt-8 mb-2.5 font-medium">
        本棚に多く入れられた本
      </h2>
      <div className="text-gray-300 text-center text-xs mb-4">
        今までに{bookCount}冊の本が登録されました
      </div>
      <Books books={books} displayCount='all' />
      <div className="my-3">
        <Link href="/books">
          <a className="flex underline hover:opacity-80">
            <div className="flex mx-auto">
              <span className="my-auto">
                本棚に入れられた本をもっと見る
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 my-auto ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default PastBookshelves