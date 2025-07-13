import html2canvas from 'html2canvas'
import { useRef, useState } from 'react'
import RecommendShareModal from './RecommendShareModal'
import SelectBook from './SelectBook'
import PastBookshelves from './PastBookshelves'
import { expansionBook, noIdBook } from 'types/expansion_book'
import Loading from 'components/Loading'
import { useToast } from 'hooks/useToast'

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
  const [xId, setXId] = useState("")
  const [modalHash, setModalHash] = useState<string>("")
  const [screenShotMode, setScreenShotMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showToast, ToastContainer } = useToast()

  const bookshelfImage = useRef<HTMLDivElement>(null)

  const onCreateImage = async () => {
    try {
      setLoading(true)
      setModalHash("") // モーダルを確実に閉じる
      setScreenShotMode(true)
      await new Promise(resolve => setTimeout(resolve, 2000)) // 画像が完全に読み込まれるまで待機

      const bookshelfDom = bookshelfImage.current
      if (!bookshelfDom) {
        setScreenShotMode(false)
        setLoading(false)
        return
      }

      const canvas = await html2canvas(bookshelfDom, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // クローンされたドキュメントのbodyからaria-hiddenを削除
          const body = clonedDoc.body
          if (body) {
            body.removeAttribute('aria-hidden')
          }
        }
      })
      const imageData = canvas.toDataURL()

      const response = await fetch("/api/upload_image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData, 
          selectedBooks: selectedBooks.map(({ asin, title, image, url, page, released_at }) => ({ 
            asin, 
            title, 
            image, 
            url, 
            page, 
            released_at 
          })), // 必要なプロパティを送信
          title, 
          user_name: userName, 
          twitter_id: xId
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Upload error response:', errorData)
        throw new Error('アップロードに失敗しました')
      }
      
      const data = await response.json()
      const hash = data.hash as string

      setScreenShotMode(false)
      await new Promise(resolve => setTimeout(resolve, 500)) // sleepさせないとモーダルに画像が表示されない

      setLoading(false)
      setModalHash(hash)
      showToast('本棚を作成しました！', 'success')
    } catch (error) {
      console.error('Error creating bookshelf:', error)
      setScreenShotMode(false)
      setLoading(false)
      showToast('本棚の作成に失敗しました。もう一度お試しください。', 'error')
    }
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Web本棚</h1>
        <p className="text-gray-300 mb-2 text-base md:text-lg">
          お気に入りの本で、あなたの本棚を作ってシェアしよう
        </p>
        <p className="text-sm text-gray-500">
          無料・ログイン不要
        </p>
      </div>


      <div className="text-center mb-4 px-4">
        <div className="text-sm text-gray-400">
          {selectedBooks.length === 0 && "本を選んで本棚を作りましょう（最大5冊）"}
          {selectedBooks.length > 0 && selectedBooks.length < 5 && `${selectedBooks.length}冊選択中 • あと${5 - selectedBooks.length}冊追加できます`}
          {selectedBooks.length === 5 && "5冊選択済み"}
        </div>
      </div>
      <div className="flex">
        <div ref={bookshelfImage} className="relative mx-auto w-[320px]">
          <div>
            <img src="/bookshelf.png" alt="本棚" />
          </div>
          <h2 className={`absolute text-xl text-gray-900 font-bold w-full text-center ${screenShotMode ? "top-2" : "top-4"}`}>
            {title}
          </h2>
          <div className="absolute bottom-5 flex justify-center mx-1" >
            {selectedBooks.map((book, i) => (
              <div className={`w-1/5 flex relative ${selectedBooks.length < 4 ? 'mx-2' : 'mx-1'} ${screenShotMode ? '' : 'animate-fadeIn'}`} key={`${book.asin}-${i}`}>
                <div className={`mt-auto ${screenShotMode ? '' : 'transition-transform duration-300 hover:scale-105'}`}>
                  <img src={book.image || undefined} alt={book.title} />
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
            className="mx-auto bg-gray-700 hover:bg-gray-600 py-3 px-6 rounded-lg text-white font-medium transition"
          >
            本棚を作成してシェア
          </button>
        </div>
      )}
      {selectedBooks.length < 5 && (
        <SelectBook setSelectedBooks={setSelectedBooks} />
      )}
      
      <div className="space-y-4 mt-8 mx-4 md:mx-0 p-4 md:p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">本棚のタイトル</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="p-3 w-full rounded-lg border border-gray-600 bg-gray-900/50 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="わたしの本棚"
            maxLength={20}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">お名前（任意）</label>
          <input
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="p-3 w-full rounded-lg border border-gray-600 bg-gray-900/50 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="ニックネームなど"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">X ID（任意）</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">@</span>
            <input
              value={xId}
              onChange={e => setXId(e.target.value.replace('@', ''))}
              className="p-3 pl-8 w-full rounded-lg border border-gray-600 bg-gray-900/50 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              placeholder="username"
            />
          </div>
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
        selectedBooks={selectedBooks}
      />
      {loading && <Loading />}
      <ToastContainer />
    </>
  )
}

export default Home
