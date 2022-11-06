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
      <h2 className="mt-8 mb-2.5 flex">
        <div className="mx-auto flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-auto mr-1 text-yellow-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          最近作られた本棚
        </div>
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 my-auto text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </a>
        </Link>
      </div>
      <h2 className="text-center mt-8 mb-2.5 flex">
        <div className="mx-auto flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-auto mr-1 text-yellow-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          </svg>
          本棚に多く入れられた本
        </div>
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 my-auto text-yellow-500">
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