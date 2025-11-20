import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { defineConfig } from 'drizzle-kit'

dotenvExpand.expand(dotenv.config({ path: `.env.${process.env.NODE_ENV}` }))

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/db/schema/index.ts',
})
