import html2canvas from 'html2canvas'
import { useRef, useState } from 'react'
import RecommendShareModal from './RecommendShareModal'
import SelectBook from './SelectBook'
import PastBookshelves from './PastBookshelves'
import { expansionBook, noIdBook } from 'types/expansion_book'
import Loading from 'components/Loading'

type Props = {
  bookshelves: any[]
  books: expansionBook[]
  bookshelfCount: number
  bookCount: number
}

const Home = ({bookshelves, books, bookshelfCount, bookCount}: Props): JSX.Element => {
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
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Web本棚</h1>
        <p className="text-gray-300 mb-4">
          お気に入りの本で、あなたの本棚を作ってシェアしよう
        </p>
        <div className="text-sm text-gray-400">
          {bookshelfCount}個の本棚・{bookCount}冊の本が登録されています
        </div>
      </div>


      <div className="text-center text-sm mb-3 text-gray-400">
        {selectedBooks.length === 0 && "本を選んで本棚を作りましょう（最大5冊）"}
        {selectedBooks.length > 0 && selectedBooks.length < 5 && `${selectedBooks.length}冊選択中（あと${5 - selectedBooks.length}冊追加できます）`}
        {selectedBooks.length === 5 && "5冊選択済み"}
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
                  {/* TODO: 背景が透明だと見にく時があるので、背景色を白に指定したいな */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 text-gray-700">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedBooks.length > 0 && (
        <div className="my-6 text-center">
          <button
            onClick={onCreateImage}
            className="mx-auto bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg text-white font-medium transition"
          >
            本棚を作成する
          </button>
        </div>
      )}
      {selectedBooks.length < 5 && (
        <SelectBook setSelectedBooks={setSelectedBooks} />
      )}
      
      <div className="space-y-3 mt-6">
        <div>
          <label className="text-sm text-gray-400">本棚のタイトル</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="p-2 w-full rounded border border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:outline-none transition"
            placeholder="わたしの本棚"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">お名前（任意）</label>
          <input
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="p-2 w-full rounded border border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:outline-none transition"
            placeholder=""
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Twitter ID（任意）</label>
          <input
            value={twitterId}
            onChange={e => setTwitterId(e.target.value)}
            className="p-2 w-full rounded border border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:outline-none transition"
            placeholder="@は不要です"
          />
        </div>
      </div>
      <PastBookshelves
        bookshelves={bookshelves}
        books={books}
        bookshelfCount={bookshelfCount}
        bookCount={bookCount}
      />
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
