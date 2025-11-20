import { randomUUID } from 'node:crypto'

import dotenv from 'dotenv'
import dotEnvExpand from 'dotenv-expand'
import { Client } from 'pg'
import { Environment } from 'vitest/environments'

dotEnvExpand.expand(
  dotenv.config({
    path: ['.env.development'],
    quiet: true,
  })
)

export default <Environment>{
  name: 'drizzle',
  async setup() {
    if (!process.env.DATABASE_URL) {
      throw new Error('Please provide a DATABASE_URL environment variable.')
    }

    const client = new Client(process.env.DATABASE_URL)
    await client.connect()

    const url = new URL(process.env.DATABASE_URL)
    const databaseName = randomUUID()
    url.pathname = databaseName
    process.env.DATABASE_URL = url.toString()

    await client.query(`CREATE DATABASE "${databaseName}"`)

    return {
      async teardown() {
        await client.end()
      },
    }
  },
  transformMode: 'ssr',
}
