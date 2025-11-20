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
        'drizzle/vitest-environment-drizzle',
      ],
      reporter: ['text-summary', 'lcov'],
    },
    environment: 'drizzle',
    globals: false,
    root: './',
  },
})
