import Link from "next/link"
import { expansionBook } from "types/expansion_book"

type Props = {
  books: expansionBook[]
  isSameBookshelf?: boolean
}

const Books = ({books, isSameBookshelf = false}: Props): JSX.Element => {
  return (
    <div className="space-y-5 mt-2">
      {books.map(book => (
        <div key={book.id}>
          <Link href={`/books/${book.id}`} prefetch={false}>
            <a className="flex hover:opacity-80">
              <div className="w-1/4 md:w-1/6 mr-2">
                <img src={book.image || undefined} />
              </div>
              <div className="w-3/4 md:w-5/6">
                <h3 className="text-sm md:text-base mb-2">{book.title}</h3>
                <div className="text-xs md:text-sm my-2 text-gray-300">
                  {book.count}回{isSameBookshelf && '同じ'}本棚に入りました
                </div>
                {book.released_at && (
                  <div className="my-1 text-xs md:text-sm text-gray-300">
                    発売日：{book.released_at}
                  </div>
                )}
                {!!book.page && book.page !== 0 && (
                  <div className="my-1 text-xs md:text-sm text-gray-300">
                    {book.page}ページ
                  </div>
                )}
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Books