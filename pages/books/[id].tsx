import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

type Props = {
  book: any;
};

const FacilityDetail = ({ book }: Props): JSX.Element => {
  const title = `${book.title}`

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <h1>
        {book.title}のページ
        </h1>
        <img src={book.image} />
        <a href={book.url} target="_blank">amazon link</a>
        <div>
          載せたい情報：この本が入っている本棚と本棚の数、この本と一緒に本棚に入れられた本（一緒に入れられた数が多い順）
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
