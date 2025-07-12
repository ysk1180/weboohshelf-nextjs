import Link from "next/link"

type Props = {
  bookshelf: any // TODO: あとで型をつける（prisma/clinetの型だとbooksがなかった
}

const PastBookshelf = ({bookshelf}: Props): JSX.Element => {

  return (
    <div className="mt-3 mb-6">
      <div className="my-1.5 text-sm text-gray-200 flex">
        <div className="mx-auto flex">
          <Link href={`/bookshelves/${bookshelf.h}`}>
            <a className="my-auto hover:underline hover:opacity-80">
              {bookshelf.user_name || '名無し'}さんの本棚
            </a>
          </Link>
          {bookshelf.twitter_id && (
            <a href={`https://twitter.com/${bookshelf.twitter_id}`} className="my-auto ml-0.5 hover:opacity-80" target="_blank" rel="noreferrer" >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
      <div className="flex">
        <div className="relative mx-auto w-[320px]">
              <div>
                <img src="/bookshelf.png" />
              </div>
              <h2 className="absolute top-4 text-xl text-gray-900 font-bold w-full text-center">
                {bookshelf.title}
              </h2>
              <div className="absolute bottom-5 flex justify-center mx-1" >
                {bookshelf.books.map((b, i: number) => {
                  const { id, image } = b.book
                  return (
                    <div className={`w-1/5 flex relative ${bookshelf.books.length < 4 ? 'mx-2' : 'mx-1'}`} key={i}>
                      <Link href={`/books/${id}`} prefetch={false}>
                        <a className="mt-auto hover:opacity-80">
                          <img src={image} />
                        </a>
                      </Link>
                    </div>
                  )
                })}
              </div>
        </div>
      </div>
    </div>
  )
}

export default PastBookshelf