import html2canvas from 'html2canvas'
import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { Book } from './api/fetch_amazon_books'
import Modal from 'react-modal'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const [keyword, setKeyword] = useState("")
  const [candidateBooks, setCandidateBooks] = useState<Book[]>([])
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([])
  const [title, setTitle] = useState("わたしの本棚")
  const [modalHash, setModalHash] = useState<string>("")

  const bookshelfImage = useRef<HTMLDivElement>(null)

  const router = useRouter()

  useEffect(() => {
    (async() => {
      const { h } = router.query
      if (!h) return

      const res = await fetch(`/api/fetch_bookshelf?hash=${h}`)
      const data = await res.json()
      console.log(data)
    })()
  }, [router.query])

  const onSubmit = async() => {
    if(!keyword) setCandidateBooks([])

    const res = await fetch(`/api/fetch_amazon_books?keyword=${keyword}`)
    const data = await res.json()
    setCandidateBooks(data)
  }

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

    setModalHash(hash)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div className="m-2">
      <div className="flex">
        <div ref={bookshelfImage} className="relative mx-auto w-[320px]">
          <div>
            <img src="/bookshelf.png" />
          </div>
          <div className="absolute top-4 mx-4 text-2xl font-bold">{title}</div>
          <div className="absolute bottom-5 flex justify-between mx-2" >
            {selectedBooks.map(book => (
              <div className="w-1/5 mx-1">
                <img src={book.image} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-4">
        <button onClick={onCreateImage}>画像作成</button>
      </div>
      <div className="flex my-4">
        <div className="">
          本のタイトル
        </div>
        <div className="ml-2">
          <input value={keyword} onKeyUp={onSubmit} onChange={e => setKeyword(e.target.value)} />
        </div>
      </div>
      {selectedBooks.length < 5 && (
        <div className="mx-2 my-4">
          {candidateBooks.map(book => (
            <div
              className="m-3"
              onClick={() => setSelectedBooks(prev => [...prev, book])}
            >
              <div className="flex">
                <div className="w-1/6">
                  <img src={book.image} />
                </div>
                <div className="w-5/6 ml-2 flex text-sm">
                  <div className="my-auto">
                    {book.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex my-3">
        <div className="">
          本棚のタイトル
        </div>
        <div className="ml-2">
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
      </div>
      <Modal
        isOpen={!!modalHash}
        onRequestClose={() => setModalHash("")}
        style={customStyles}
      >
        <div className="text-red-500">
          Hey
        </div>
        <img src={`https://webookshelf-${process.env.NODE_ENV}.s3-ap-northeast-1.amazonaws.com/images/${modalHash}.png`} />
        <a
          className="text-blue-500"
          href={`https://twitter.com/share?text=%23Web本棚&url=https://webookshelf.herokuapp.com?h=${modalHash}`}
          target="_blank"
        >
            Twitterシェア
        </a>
      </Modal>
    </div>
  )
}

Modal.setAppElement('body');

export default Home
