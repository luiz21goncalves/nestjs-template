import { randomUUID } from 'node:crypto'

import dotenv from 'dotenv'
import dotEnvExpand from 'dotenv-expand'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Environment } from 'vitest/environments'

dotEnvExpand.expand(
  dotenv.config({
    path: ['.env.development'],
    quiet: true,
  })
)

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'drizzle',
  async setup() {
    const schema = randomUUID()
    const databaseUrl = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl
    const db = drizzle(databaseUrl)

    return {
      async teardown() {
        await db.execute(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)

        await db.$client.end()
      },
    }
  },
  transformMode: 'ssr',
}
