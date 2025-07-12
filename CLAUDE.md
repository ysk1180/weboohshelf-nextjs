# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 言語設定
このプロジェクトでは、Claude Codeとのやりとりは全て日本語で行います。

## プロジェクト概要

「Web本棚」は、選択した本で仮想的な本棚を作成し、画像として共有できるWebサービスです。Next.js 12.3.1で構築され、PostgreSQLデータベースとAWS S3を使用しています。

## 開発コマンド

### 基本コマンド
```bash
# 開発サーバーの起動
yarn dev

# ビルド（Prismaスキーマ生成を含む）
yarn build

# プロダクションサーバーの起動
yarn start

# Lintチェック
yarn lint
```

### Prisma関連コマンド
```bash
# Prismaクライアントの生成
yarn prisma generate

# マイグレーションの作成
yarn prisma migrate dev --name <migration_name>

# データベースの確認
yarn prisma studio
```

## アーキテクチャ構造

### ページ構成
- **`/`** - トップページ（本の検索・選択）
- **`/books`** - 本一覧ページ
- **`/books/[id]`** - 本の詳細ページ（その本を含む本棚一覧）
- **`/bookshelves`** - 本棚一覧ページ  
- **`/bookshelves/[hash]`** - 本棚詳細ページ（8文字のハッシュでアクセス）

### APIエンドポイント
- **`/api/fetch_amazon_books`** - Amazon APIを使用した本の検索
- **`/api/fetch_bookshelves_by_book`** - 特定の本を含む本棚の取得
- **`/api/upload_image`** - 本棚画像の生成とS3へのアップロード、DB保存

### データベース構造（Prisma）
- **Book** - 本の情報（ASIN、タイトル、著者、画像URL等）
- **Bookshelf** - 本棚（ハッシュ、タイトル、ユーザー名、画像URL等）
- **BookshelfBook** - 本と本棚の多対多リレーション

### 主要な技術的ポイント

1. **ISR（Incremental Static Regeneration）**
   - 本詳細ページと本棚詳細ページで使用
   - `getStaticProps`で`revalidate: 10`を設定

2. **画像生成と保存**
   - `html2canvas`で本棚のDOM要素を画像化
   - AWS S3バケット（`webookshelf-${NODE_ENV}`）に保存

3. **本棚の共有機能**
   - 8文字のランダムハッシュで一意性を保証
   - 共有用URLとSNS共有機能を実装

4. **Amazon API統合**
   - `amazon-paapi`パッケージを使用
   - 本の検索と詳細情報の取得

## 環境変数

開発時に必要な環境変数：
- `DATABASE_URL` - PostgreSQL接続URL
- `DIRECT_URL` - Prisma用直接接続URL（Supabase使用時）
- `AWS_ACCESS_KEY_ID_S3` - S3アクセスキー
- `AWS_SECRET_ACCESS_KEY_S3` - S3シークレットキー
- `AMAZON_API_ACCESS_KEY` - Amazon APIアクセスキー
- `AMAZON_API_SECRET_KEY` - Amazon APIシークレットキー
- `AMAZON_ASSOCIATE_TAG` - Amazonアソシエイトタグ

## コーディング規約

- TypeScriptを使用（strict: true、noImplicitAny: false）
- Tailwind CSSでスタイリング
- コンポーネントは`components/`ディレクトリに配置
- API通信はfetch APIを使用
- エラーハンドリングはtry-catchで適切に処理