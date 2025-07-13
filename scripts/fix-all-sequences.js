/**
 * 全テーブルのPostgreSQLシーケンスを修正するスクリプト
 * 
 * 使用方法: node scripts/fix-all-sequences.js
 */

const { PrismaClient } = require('@prisma/client')

async function fixAllSequences() {
  const prisma = new PrismaClient()

  console.log('=== 全テーブルのシーケンスを修正します ===\n')

  const tables = [
    { tableName: 'Book', sequenceName: 'Book_id_seq' },
    { tableName: 'Bookshelf', sequenceName: 'Bookshelf_id_seq' },
    { tableName: 'BookshelfBook', sequenceName: 'BookshelfBook_id_seq' }
  ]

  try {
    for (const { tableName, sequenceName } of tables) {
      console.log(`--- ${tableName}テーブルの処理中 ---`)
      
      try {
        // 現在の最大IDを取得
        const maxIdResult = await prisma.$queryRawUnsafe(
          `SELECT MAX(id) as max FROM "${tableName}"`
        )
        const maxId = maxIdResult[0].max ? Number(maxIdResult[0].max) : 0
        console.log(`現在の最大ID: ${maxId}`)

        // シーケンスの現在値を取得
        const currentSeqResult = await prisma.$queryRawUnsafe(
          `SELECT last_value FROM "${sequenceName}"`
        )
        const currentSeq = Number(currentSeqResult[0].last_value)
        console.log(`現在のシーケンス値: ${currentSeq}`)

        // シーケンスを修正
        if (maxId >= currentSeq) {
          const newSeqValue = maxId + 1
          await prisma.$executeRawUnsafe(
            `SELECT setval('"${sequenceName}"', ${newSeqValue})`
          )
          console.log(`シーケンスを ${newSeqValue} に修正しました`)
          
          // 修正後の確認
          const verifyResult = await prisma.$queryRawUnsafe(
            `SELECT last_value FROM "${sequenceName}"`
          )
          console.log(`修正後のシーケンス値: ${Number(verifyResult[0].last_value)}`)
        } else {
          console.log('シーケンスは既に正しい値です')
        }
      } catch (error) {
        console.error(`${tableName}の処理中にエラー:`, error.message)
      }
      
      console.log('')
    }
    
    console.log('=== 完了 ===')
  } catch (error) {
    console.error('エラー:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// スクリプトを実行
fixAllSequences().catch(console.error)