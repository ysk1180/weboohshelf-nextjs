import { useRouter } from "next/router"

type Props = {
  page: number
  hasNextPage: boolean
}

const Paging = ({page, hasNextPage}: Props): JSX.Element => {
  const router = useRouter()

  const onSubmit = (page: number) => {
    const query = router.query
    router.push({query: {...query, page}})
  }

  return (
    <div className="flex mt-5">
      <div className="flex gap-8 mx-auto">
        {page !== 1 && (
          <div onClick={() => onSubmit(page - 1)} className="flex cursor-pointer hover:opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 mr-1 my-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span my-auto>
              前のページへ
            </span>
          </div>
        )}
        {hasNextPage && (
          <div onClick={() => onSubmit(page + 1)} className="flex cursor-pointer hover:opacity-80">
            <span my-auto>
              次のページへ
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 ml-1 my-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default Paging