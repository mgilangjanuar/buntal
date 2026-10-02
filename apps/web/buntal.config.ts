import type { BuntalConfig } from 'buntal'
import { markdownRoute } from './lib/markdown-route'

const config = {
  config: {
    splitting: false
  },
  middlewares: [markdownRoute()]
} satisfies BuntalConfig

export default config
