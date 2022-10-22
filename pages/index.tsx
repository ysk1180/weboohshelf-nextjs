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
  const [userName, setUserName] = useState("")
  const [twitterId, setTwitterId] = useState("")
  const [modalHash, setModalHash] = useState<string>("")
  const [screenShotMode, setScreenShotMode] = useState(false)

  const bookshelfImage = useRef<HTMLDivElement>(null)

  const onCreateImage = async () => {
    // TODO: ローディングアニメーション
    setScreenShotMode(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // sleepさせないと×ボタンが画像に入ってしまう

    const bookshelfDom = bookshelfImage.current
    if (!bookshelfDom) {
      setScreenShotMode(false)
      return
    }

    const canvas = await html2canvas(bookshelfDom, {useCORS: true})
    const imageData = canvas.toDataURL()

    const response = await fetch("/api/upload_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({imageData, selectedBooks, title, user_name: userName, twitter_id: twitterId})
    })
    const data = await response.json()
    const hash = data.hash as string

    setScreenShotMode(false)
    await new Promise(resolve => setTimeout(resolve, 500)) // sleepさせないとモーダルに画像が表示されない

    setModalHash(hash)
  }

  return (
    <div className="my-2 mx-3">
      <HashBookshelf />
      <h2 className="text-center mb-2">
        あなたの本棚を作る
      </h2>
      <div className="text-center text-xs mb-3">
        自分だけの本棚を作って簡単にシェアできます！
      </div>
      <div className="flex">
        <div ref={bookshelfImage} className="relative mx-auto w-[320px]">
          <div>
            <img src="/bookshelf.png" />
          </div>
          <h2 className={`absolute text-xl text-gray-900 font-bold w-full text-center ${screenShotMode ? "top-2" : "top-4"}`}>
            {title}
          </h2>
          <div className="absolute bottom-5 flex justify-center mx-1" >
            {selectedBooks.map((book, i) => (
              <div className={`w-1/5 flex relative ${selectedBooks.length < 4 ? 'mx-2' : 'mx-1'}`} key={i}>
                <div className="mt-auto" key={book.asin}>
                  <img src={book.image} />
                </div>
                <span
                  onClick={() => setSelectedBooks(prev => {
                    const arr = [...prev]
                    arr.splice(i, 1)
                    return arr
                  })}
                  className={`absolute -top-2.5 -right-2 text-gray-800 ${screenShotMode ? "hidden" : ""}`}
                >
                  {/* TODO: svg周りでコンソールにワーニングが出ているので対応する */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 text-gray-700">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedBooks.length > 0 && (
        <div className="my-4 flex">
          <button
            onClick={onCreateImage}
            className="mx-auto border py-2 px-3 rounded hover:opacity-80"
          >
            本棚の画像作成
          </button>
        </div>
      )}
      {selectedBooks.length < 5 && (
        <SelectBook setSelectedBooks={setSelectedBooks} />
      )}
      <div className="flex my-4">
        <div className="my-auto mr-1 w-1/4 text-sm md:text-base">
          本棚のタイトル
        </div>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-2 w-3/4 rounded"
        />
      </div>
      <div className="flex my-4">
        <div className="my-auto mr-1 w-1/4 text-sm md:text-base">
          お名前
        </div>
        <input
          value={userName}
          onChange={e => setUserName(e.target.value)}
          className="p-2 w-3/4 rounded"
          placeholder='任意'
        />
      </div>
      <div className="flex my-4">
        <div className="my-auto mr-1 w-1/4 text-sm md:text-base">
          Twitter ID
        </div>
        <input
          value={twitterId}
          onChange={e => setTwitterId(e.target.value)}
          className="p-2 w-3/4 rounded"
          placeholder='任意 / @は不要です'
        />
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
