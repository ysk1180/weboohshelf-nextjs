import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";

type Props = {
  book: any;
};

const FacilityDetail = ({ book }: Props): JSX.Element => {
  const title = `${book.title} - Web本棚`

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <div className="flex mb-6">
          <div className="w-1/3 mr-2.5 mt-1.5">
            <img src={book.image} />
          </div>
          <div className="w-2/3">
            <h1 className="">
              {book.title}
            </h1>
            <div className="my-6">
              <a
                href={book.url}
                target="_blank"
                className="border px-5 py-3 rounded"
              >
                Amazonの詳細ページ
              </a>
            </div>
          </div>
        </div>
        <div>
          載せたい情報：この本が入っている本棚と本棚の数、この本と一緒に本棚に入れられた本（一緒に入れられた数が多い順）
          <h2>この本が入っている本棚</h2>
        </div>
        <div>
          <h2>この本と一緒によく読まれている本</h2>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = Number(params.id)

  const prisma = new PrismaClient()

  const book = await prisma.book.findUnique({
    where: {
      id: id
    },
  })

  if (!book) return { notFound: true };

  return {
    props: {
      book,
    },
    revalidate: 3600,
  };
};

export default FacilityDetail;
