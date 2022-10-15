import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PastBookshelf from "./PastBookshelf"

const HashBookshelf = (): JSX.Element => {
  const [bookshelf, setBookshelf] = useState(null)

  const router = useRouter()

  useEffect(() => {
    (async() => {
      const { h } = router.query
      if (!h) return

      const res = await fetch(`/api/fetch_bookshelf?hash=${h}`)
      const data = await res.json()
      setBookshelf(data.bookshelf)
    })()
  }, [router.query])

  return (
    <>
      {bookshelf && (
        <div className="mb-7">
          <PastBookshelf bookshelf={bookshelf} />
        </div>
      )}
    </>
  )
}

export default HashBookshelf