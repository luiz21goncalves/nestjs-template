import { randomUUID } from 'node:crypto'

import swc from 'unplugin-swc'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsConfigPaths(), swc.vite({ module: { type: 'es6' } })],
  test: {
    coverage: {
      exclude: [
        ...defaultExclude,
        '**/*.config.{ts,mts,js,mjs}',
        'test/**/*.ts',
        'src/instrumentation.ts',
        'src/main.ts',
        'src/errors/schemas.ts',
      ],
      reporter: ['text-summary', 'lcov'],
    },
    env: {
      DATABASE_URL: `postgres://docker:docker@localhost:5432/nestjs-template?schema=${randomUUID()}`,
    },
    globals: false,
    root: './',
    setupFiles: ['./vitest.setup.ts'],
  },
})
