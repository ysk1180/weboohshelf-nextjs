import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const sitemap = (urls: string[]) => {
  let xml = '';

  urls.map((url) => {
    xml += `<url>
      <loc>https://web-bookshelf.com${url}</loc>
    </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${xml}
    </urlset>`;
};

const generateSitemap = async () => {
  const prisma = new PrismaClient()

  const bookshelves = await prisma.bookshelf.findMany()
  const bookshelfUrls = bookshelves.map(b => `/bookshelves/${b.h}`)

  const books = await prisma.bookshelf.findMany()
  const bookUrls = books.map(b => `/books/${b.id}`)

  const urls = ['/', ...bookshelfUrls, ...bookUrls]

  fs.writeFileSync('./public/sitemap.xml', sitemap(urls));
};

export default generateSitemap;
