import html2canvas from 'html2canvas'
import type { NextPage } from 'next'
import { useRef, useState } from 'react'
import RecommendShareModal from './RecommendShareModal'
import SelectBook from './SelectBook'
import PastBookshelves from './PastBookshelves'
import { noIdBook } from 'types/expansion_book'
import Loading from 'components/Loading'

const Home: NextPage = () => {
  const [selectedBooks, setSelectedBooks] = useState<noIdBook[]>([])
  const [title, setTitle] = useState("わたしの本棚")
  const [userName, setUserName] = useState("")
  const [twitterId, setTwitterId] = useState("")
  const [modalHash, setModalHash] = useState<string>("")
  const [screenShotMode, setScreenShotMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const bookshelfImage = useRef<HTMLDivElement>(null)

  const onCreateImage = async () => {
    setLoading(true)
    setScreenShotMode(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // sleepさせないと×ボタンが画像に入ってしまう

    const bookshelfDom = bookshelfImage.current
    if (!bookshelfDom) {
      setScreenShotMode(false)
      setLoading(false)
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

    setLoading(false)
    setModalHash(hash)
  }

  return (
    <>
      <h2 className="text-center mb-3 flex">
        <div className="mx-auto flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 my-auto mr-1 text-yellow-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
          </svg>
          あなたの本棚を作る
        </div>
      </h2>
      <div className="text-center text-xs mb-3 text-gray-200">
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
                  <img src={book.image || undefined} />
                </div>
                <span
                  onClick={() => setSelectedBooks(prev => {
                    const arr = [...prev]
                    arr.splice(i, 1)
                    return arr
                  })}
                  className={`absolute -top-2.5 -right-2 text-gray-800 cursor-pointer ${screenShotMode ? "hidden" : ""}`}
                >
                  {/* TODO: svg周りでコンソールにワーニングが出ているので対応する */}
                  {/* TODO: 背景が透明だと見にく時があるので、背景色を白に指定したいな */}
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
            className="mx-auto border-2 py-2 px-3 rounded hover:opacity-80 flex"
          >
            本棚の画像作成
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 ml-1 my-auto text-yellow-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
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
      {loading && <Loading />}
    </>
  )
}

export default Home
