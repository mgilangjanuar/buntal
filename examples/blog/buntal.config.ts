import mdx from '@mdx-js/esbuild'
import type { BunPlugin } from 'bun'
import type { BuntalConfig } from 'buntal'

const config = {
  config: {
    target: 'bun',
    plugins: [mdx() as unknown as BunPlugin]
  }
} satisfies BuntalConfig

export default config
