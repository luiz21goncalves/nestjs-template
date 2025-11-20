import { execSync } from 'child_process'
import { beforeAll } from 'vitest'

beforeAll(() => {
  execSync('pnpm exec drizzle-kit migrate')
})
