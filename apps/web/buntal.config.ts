import type { BuntalConfig } from 'buntal/server'

const config = {
  env:
    (process.env.NODE_ENV as 'production' | 'development' | undefined) ||
    'development',
  outDir: '.buntal'
} satisfies BuntalConfig

export default config
