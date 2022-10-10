type Props = {
  bookshelf: any // TODO: あとで型をつける（prisma/clinetの型だとbooksがなかった
}

const PastBookshelf = ({bookshelf}: Props): JSX.Element => {
  console.log(bookshelf.books)

  return (
    <div className="flex">
      <div className="relative mx-auto w-[320px]">
        <div>
          <img src="/bookshelf.png" />
        </div>
        <div className="absolute top-4 mx-4 text-2xl font-bold">{bookshelf.title}</div>
        <div className="absolute bottom-5 flex justify-between mx-2" >
          {bookshelf.books.map(b => {
            const { id, image } = b.book
            return (
              <div className="w-1/5 mx-1" key={id}>
                <img src={image} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PastBookshelf