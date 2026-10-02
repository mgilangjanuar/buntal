import type { BuntalConfig } from 'buntal'
import { setCssHref } from './lib/css-href'
import { markdownRoute } from './lib/markdown-route'

const css = Bun.file('.buntal/dist/globals.css')
setCssHref(
  `/globals.css?v=${(await css.exists()) ? Bun.hash(await css.bytes()).toString(36) : Date.now().toString(36)}`
)

const config = {
  config: {
    splitting: false
  },
  middlewares: [markdownRoute()]
} satisfies BuntalConfig

export default config
