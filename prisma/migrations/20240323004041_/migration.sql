-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "asin" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "url" TEXT NOT NULL,
    "page" INTEGER,
    "released_at" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookshelf" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "user_name" TEXT,
    "h" TEXT NOT NULL,
    "twitter_id" TEXT,

    CONSTRAINT "Bookshelf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookshelfBook" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "bookshelf_id" INTEGER NOT NULL,

    CONSTRAINT "BookshelfBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_asin_key" ON "Book"("asin");

-- AddForeignKey
ALTER TABLE "BookshelfBook" ADD CONSTRAINT "BookshelfBook_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookshelfBook" ADD CONSTRAINT "BookshelfBook_bookshelf_id_fkey" FOREIGN KEY ("bookshelf_id") REFERENCES "Bookshelf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
