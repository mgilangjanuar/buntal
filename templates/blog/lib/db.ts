import { SQL } from 'bun'
import { mkdirSync } from 'fs'
import { dirname, isAbsolute, resolve } from 'path'

const projectRoot = process.env.BUNTAL_ROOT || process.cwd()

const resolveUrl = (url: string) => {
  if (!url.startsWith('sqlite://')) return url
  const file = url.slice('sqlite://'.length)
  if (file === ':memory:') return url
  const path = isAbsolute(file) ? file : resolve(projectRoot, file)
  mkdirSync(dirname(path), { recursive: true })
  return `sqlite://${path}`
}

export const db = new SQL(
  resolveUrl(process.env.DATABASE_URL || 'sqlite://data/app.db')
)
