import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { ssrHandler } from './ssr'
import { staticHandler } from './static'

let root: string
const get = (path: string, method = 'GET') =>
  staticHandler(
    new Request(`http://x${path}`, { method }),
    join(root, 'out'),
    join(root, 'public')
  )

beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), 'buntal-static-'))
  mkdirSync(join(root, 'public', '.well-known'), { recursive: true })
  mkdirSync(join(root, 'out', 'dist'), { recursive: true })
  writeFileSync(join(root, 'secret.txt'), 'secret')
  writeFileSync(join(root, 'public', 'a.txt'), 'a')
  writeFileSync(join(root, 'public', '.env'), 'KEY=1')
  writeFileSync(join(root, 'public', '.well-known', 'security.txt'), 'sec')
  writeFileSync(join(root, 'out', 'dist', 'root.js'), 'js')
})

afterAll(() => rmSync(root, { recursive: true, force: true }))

describe('staticHandler', () => {
  test('serves public and dist files with nosniff', async () => {
    const resp = (await get('/a.txt'))!
    expect(await resp.text()).toBe('a')
    expect(resp.headers.get('x-content-type-options')).toBe('nosniff')
    expect(await (await get('/root.js'))!.text()).toBe('js')
  })

  test('blocks path traversal', async () => {
    for (const p of [
      '/..%2fsecret.txt',
      '/%2e%2e/secret.txt',
      '/..%5csecret.txt',
      '/a.txt%00.js'
    ]) {
      expect(await get(p)).toBeUndefined()
    }
  })

  test('hides dotfiles but serves .well-known', async () => {
    expect(await get('/.env')).toBeUndefined()
    expect(await (await get('/.well-known/security.txt'))!.text()).toBe('sec')
  })

  test('ignores non-GET methods and malformed encoding', async () => {
    expect(await get('/a.txt', 'POST')).toBeUndefined()
    expect(await get('/%E0%A4%A')).toBeUndefined()
  })
})

describe('ssrHandler', () => {
  const req = new Request('http://x') as any

  test('loader data is never publicly cacheable', async () => {
    const resp = (await ssrHandler(req, { $: () => ({ user: 'me' }) }))!
    expect(resp.headers.get('cache-control')).toBe('private, no-store')
    expect(await resp.json()).toEqual({ user: 'me' })
  })

  test('missing loader is a 404, not a crash', async () => {
    expect((await ssrHandler(req, {} as any))!.status).toBe(404)
  })

  test('production errors do not leak details', async () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
    const err = console.error
    console.error = () => {}
    try {
      const resp = (await ssrHandler(req, {
        $: () => {
          throw new Error('db password wrong')
        }
      }))!
      expect(resp.status).toBe(500)
      expect(await resp.text()).not.toContain('db password')
    } finally {
      process.env.NODE_ENV = env
      console.error = err
    }
  })
})
