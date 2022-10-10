import { useEffect, useState } from "react"
import PastBookshelf from "./PastBookshelf"

const PastBookshelves = (): JSX.Element => {
  const [bookshelves, setBookshelves] = useState([])

  useEffect(() => {
    (async() => {

      const res = await fetch("/api/fetch_recent_bookshelves")
      const data = await res.json()
      setBookshelves(data.bookshelves)
    })()
  }, [])

  return (
    <div>
      {bookshelves.map(bookshelf => (
        <div key={bookshelf.id}>
          <PastBookshelf bookshelf={bookshelf} />
        </div>
      ))}
    </div>
  )
}

export default PastBookshelves