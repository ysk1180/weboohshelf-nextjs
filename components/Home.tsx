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
      {/* Hero Section with compelling value proposition */}
      <div className="text-center mb-8 px-4">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-6 rounded-xl shadow-lg mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mr-2 text-yellow-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
            あなただけの特別な本棚を作ろう
          </h1>
          <p className="text-lg text-blue-100 mb-4">
            読んだ本や好きな本を美しい本棚にして、世界中の人とシェアしませんか？
          </p>
          <div className="flex justify-center space-x-6 text-sm text-blue-100">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1 text-green-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              ログイン不要
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1 text-green-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              3分で完成
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1 text-green-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              簡単シェア
            </div>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-400">{bookshelfCount}</div>
              <div className="text-xs text-gray-300">作成された本棚</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{bookCount}</div>
              <div className="text-xs text-gray-300">登録された本</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-xs text-gray-300">無料で利用</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-center items-center space-x-2 mb-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${selectedBooks.length > 0 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
            1
          </div>
          <div className={`h-1 w-8 ${selectedBooks.length > 0 ? 'bg-green-500' : 'bg-gray-600'} rounded`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${title !== "わたしの本棚" || userName || twitterId ? 'bg-green-500 text-white' : selectedBooks.length > 0 ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-400'}`}>
            2
          </div>
          <div className={`h-1 w-8 ${title !== "わたしの本棚" || userName || twitterId ? 'bg-green-500' : 'bg-gray-600'} rounded`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${modalHash ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-400'}`}>
            3
          </div>
        </div>
        <div className="flex justify-center text-xs text-gray-400 space-x-6">
          <span className={selectedBooks.length > 0 ? 'text-green-400' : 'text-blue-400'}>本を選ぶ</span>
          <span className={title !== "わたしの本棚" || userName || twitterId ? 'text-green-400' : selectedBooks.length > 0 ? 'text-blue-400' : ''}>情報入力</span>
          <span className={modalHash ? 'text-green-400' : ''}>完成・シェア</span>
        </div>
      </div>

      <h2 className="text-center mb-3 flex">
        <div className="mx-auto flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 my-auto mr-1 text-yellow-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
          </svg>
          ステップ1: 本棚をプレビュー
        </div>
      </h2>
      <div className="text-center text-sm mb-3 text-gray-200">
        {selectedBooks.length === 0 && "まずは好きな本を選んで、あなただけの本棚を作ってみましょう！"}
        {selectedBooks.length > 0 && selectedBooks.length < 5 && `素敵ですね！あと${5 - selectedBooks.length}冊追加できます`}
        {selectedBooks.length === 5 && "完璧です！5冊の本で素敵な本棚が完成しました"}
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
          <div className="mb-3 text-sm text-gray-200">
            🎉 素晴らしい！あなたの本棚ができました
          </div>
          <button
            onClick={onCreateImage}
            className="mx-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3 px-6 rounded-lg text-white font-bold text-lg shadow-lg transform transition hover:scale-105 flex items-center"
          >
            ✨ 本棚を完成させて世界にシェア！
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2 text-yellow-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          </button>
          <div className="mt-2 text-xs text-gray-400">
            画像が自動生成されてSNSで簡単にシェアできます
          </div>
        </div>
      )}
      {selectedBooks.length < 5 && (
        <SelectBook setSelectedBooks={setSelectedBooks} />
      )}
      {/* Step 2: Bookshelf Customization */}
      {selectedBooks.length > 0 && (
        <div className="mt-8 mb-6">
          <h2 className="text-center mb-4 flex">
            <div className="mx-auto flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 my-auto mr-1 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              ステップ2: 本棚をカスタマイズ
            </div>
          </h2>
          <div className="text-center text-sm mb-4 text-gray-200">
            あなたらしさを表現して、より魅力的な本棚にしましょう！
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-200 w-1/3">
              📚 本棚のタイトル
            </label>
            <div className="w-2/3">
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="p-3 w-full rounded-lg border-2 border-gray-600 focus:border-blue-500 focus:outline-none transition"
                placeholder="例: 今年読んだ感動の本たち"
              />
              <div className="text-xs text-gray-400 mt-1">
                タイトルで本棚の印象が決まります
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-200 w-1/3">
              👤 お名前
            </label>
            <div className="w-2/3">
              <input
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className="p-3 w-full rounded-lg border-2 border-gray-600 focus:border-blue-500 focus:outline-none transition"
                placeholder="あなたのニックネーム（任意）"
              />
              <div className="text-xs text-gray-400 mt-1">
                匿名でもOK！お名前があるとより親しみやすくなります
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-200 w-1/3">
              🐦 Twitter ID
            </label>
            <div className="w-2/3">
              <input
                value={twitterId}
                onChange={e => setTwitterId(e.target.value)}
                className="p-3 w-full rounded-lg border-2 border-gray-600 focus:border-blue-500 focus:outline-none transition"
                placeholder="username（任意・@は不要）"
              />
              <div className="text-xs text-gray-400 mt-1">
                Twitterアカウントがあるとフォロワーとつながりやすくなります
              </div>
            </div>
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
      />
      {loading && <Loading />}
    </>
  )
}

export default Home
