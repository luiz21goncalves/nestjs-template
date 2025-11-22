import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { Client } from 'pg'

dotenvExpand.expand(dotenv.config({ path: `.env.development`, quiet: true }))

async function cleanup() {
  const client = new Client(process.env.DATABASE_URL!)
  await client.connect()

  const result = await client.query({
    text: `
      SELECT datname
      FROM pg_database
      WHERE datistemplate = false AND datname NOT IN ('postgres', '${process.env.POSTGRES_DB}')
      ORDER BY datname;
    `,
  })

  const databases = result.rows.map((row) => row.datname)

  if (databases.length) {
    const promisses = databases.map((database) =>
      client.query(`DROP DATABASE "${database}"`)
    )

    await Promise.all(promisses)
  }

  await client.end()
}

cleanup()
  .then(() => {
    process.exit()
  })
  .catch((e) => {
    console.error(e)
    // eslint-disable-next-line no-magic-numbers
    process.exit(1)
  })
