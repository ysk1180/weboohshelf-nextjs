import { Bookshelf } from "@prisma/client"
import { useEffect, useState } from "react"
import PastBookshelf from "./PastBookshelf"

const PastBookshelves = (): JSX.Element => {
  const [bookshelves, setBookshelves] = useState<Bookshelf[]>([])

  useEffect(() => {
    (async() => {

      const res = await fetch("/api/fetch_recent_bookshelves")
      const data = await res.json()
      setBookshelves(data.bookshelves)
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
    </div>
  )
}

export default PastBookshelves