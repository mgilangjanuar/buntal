export const PACKAGES = [
  'packages/@buntal/http',
  'packages/buntal',
  'packages/@buntal/cli',
  'packages/create-buntal'
] as const

export const INTERNAL = ['@buntal/http', 'buntal', '@buntal/cli']

export const SEMVER =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/

export type Manifest = {
  name: string
  version: string
  dependencies?: Record<string, string>
}

export const readManifest = (dir: string): Promise<Manifest> =>
  Bun.file(`${dir}/package.json`).json()
