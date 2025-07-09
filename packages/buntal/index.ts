export * from './components'
export * from './hooks'

export type BuntalConfig = {
  env?: 'development' | 'production'
  appDir?: string
  outDir?: string
  staticDir?: string
  config?: Partial<Bun.BuildConfig>
  serverOptions?: Partial<Bun.ServeFunctionOptions<any, any>>
}
