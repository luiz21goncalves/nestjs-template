import type { Configuration } from 'lint-staged'

const config: Configuration = {
  '*.{js,mjs,cjs,ts,mts,cts}': 'pnpm exec eslint --fix',
}

export default config
