import { Book } from "@prisma/client"

export type expansionBook = Book & {
  count: number
}

export type noIdBook = Omit<Book, 'id'>
