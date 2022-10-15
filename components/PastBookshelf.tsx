import Link from "next/link"

type Props = {
  bookshelf: any // TODO: あとで型をつける（prisma/clinetの型だとbooksがなかった
}

const PastBookshelf = ({bookshelf}: Props): JSX.Element => {

  return (
    <div className="mt-4 mb-6">
      <div className="text-center my-1.5 text-sm">{bookshelf.user_name || '名無し'}さんの本棚</div>
      <div className="flex">
        <div className="relative mx-auto w-[320px]">
          <div>
            <img src="/bookshelf.png" />
          </div>
          <h2 className="absolute top-4 text-xl text-gray-900 font-bold w-full text-center">
            {bookshelf.title}
          </h2>
          <div className="absolute bottom-5 flex justify-between mx-2" >
            {bookshelf.books.map((b, i) => {
              const { id, image } = b.book
              return (
                <div className="w-1/5 mx-1" key={i}>
                  <Link href={`/books/${id}`}>
                    <a className="hover:opacity-80">
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