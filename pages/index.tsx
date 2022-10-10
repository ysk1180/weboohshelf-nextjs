import html2canvas from 'html2canvas'
import type { NextPage } from 'next'
import { useRef, useState } from 'react'
import RecommendShareModal from '../components/RecommendShareModal'
import { Book } from '@prisma/client'
import SelectBook from '../components/SelectBook'
import PastBookshelves from '../components/PastBookshelves'
import HashBookshelf from '../components/HashBookshelf'

const Home: NextPage = () => {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([])
  const [title, setTitle] = useState("わたしの本棚")
  const [modalHash, setModalHash] = useState<string>("")

  const bookshelfImage = useRef<HTMLDivElement>(null)

  const onCreateImage = async () => {
    const bookshelfDom = bookshelfImage.current
    if (!bookshelfDom) return

    const canvas = await html2canvas(bookshelfDom, {useCORS: true})
    const imageData = canvas.toDataURL()

    const response = await fetch("/api/upload_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({imageData, selectedBooks, title})
    })
    const data = await response.json()
    const hash = data.hash as string

    // TODO: （あとで対応）モーダルに画像を表示するのが早すぎるのか、画像が表示されないことがある
    setModalHash(hash)
  }

  return (
    <div className="m-2">
      <HashBookshelf />
      <div className="flex">
        <div ref={bookshelfImage} className="relative mx-auto w-[320px]">
          <div>
            <img src="/bookshelf.png" />
          </div>
          <div className="absolute top-4 mx-4 text-2xl font-bold">{title}</div>
          <div className="absolute bottom-5 flex justify-between mx-2" >
            {selectedBooks.map(book => (
              <div className="w-1/5 mx-1" key={book.asin}>
                <img src={book.image} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-4">
        <button onClick={onCreateImage}>画像作成</button>
      </div>
      {selectedBooks.length < 5 && (
        <SelectBook setSelectedBooks={setSelectedBooks} />
      )}
      <div className="flex my-3">
        <div className="">
          本棚のタイトル
        </div>
        <div className="ml-2">
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
      </div>
      <PastBookshelves />
      <RecommendShareModal
        isOpen={!!modalHash}
        modalHash={modalHash}
        setModalHash={setModalHash}
      />
    </div>
  )
}

export default Home
