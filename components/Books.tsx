import Link from "next/link"
import { expansionBook } from "types/expansion_book"

type Props = {
  books: expansionBook[]
  isSameBookshelf?: boolean
}

const Books = ({books, isSameBookshelf = false}: Props): JSX.Element => {
  return (
    <div className="space-y-4 mt-2">
      {books.map(book => (
        <div key={book.id}>
          <Link href={`/books/${book.id}`}>
            <a className="flex">
              <div className="w-1/4 mr-2">
                <img src={book.image} />
              </div>
              <div className="w-3/4">
                <h3 className="text-sm mb-2">{book.title}</h3>
                <div className="text-xs my-2 text-gray-200">
                  {book.count}回{isSameBookshelf && '同じ'}本棚に入りました
                </div>
                {book.released_at && (
                  <div className="my-1 text-xs text-gray-200">
                    発売日：{book.released_at}
                  </div>
                )}
                {book.page && book.page !== 0 && (
                  <div className="my-1 text-xs text-gray-200">
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