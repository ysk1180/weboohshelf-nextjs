/**
 * PostgreSQLのシーケンスを修正するスクリプト
 * 
 * 問題: データベースのマイグレーションやインポート時に、
 * シーケンス（自動採番）が正しく更新されないことがある。
 * その結果、新しいレコードのIDが古い値で作成されてしまう。
 * 
 * 使用方法: node scripts/fix-sequence.js
 */

const { PrismaClient } = require('@prisma/client')

async function fixSequence() {
  const prisma = new PrismaClient()

  console.log('=== Bookshelfテーブルのシーケンスを修正します ===\n')

  try {
    // 現在の最大IDを取得
    const maxIdResult = await prisma.$queryRaw`
      SELECT MAX(id) as max FROM "Bookshelf"
    `
    const maxId = Number(maxIdResult[0].max)
    console.log('現在の最大ID:', maxId)

    // シーケンスの現在値を取得
    const currentSeqResult = await prisma.$queryRaw`
      SELECT last_value FROM "Bookshelf_id_seq"
    `
    const currentSeq = Number(currentSeqResult[0].last_value)
    console.log('現在のシーケンス値:', currentSeq)

    // シーケンスを修正
    if (maxId >= currentSeq) {
      const newSeqValue = maxId + 1
      await prisma.$executeRaw`
        SELECT setval('"Bookshelf_id_seq"', ${newSeqValue})
      `
      console.log(`シーケンスを ${newSeqValue} に修正しました`)
      
      // 修正後の確認
      const verifyResult = await prisma.$queryRaw`
        SELECT last_value FROM "Bookshelf_id_seq"
      `
      console.log('修正後のシーケンス値:', Number(verifyResult[0].last_value))
    } else {
      console.log('シーケンスは既に正しい値です')
    }
    
    console.log('\n=== 完了 ===')
  } catch (error) {
    console.error('エラー:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// スクリプトを実行
fixSequence().catch(console.error)