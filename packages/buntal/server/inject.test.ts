import { Http } from '@buntal/http'
import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'
import { buildId, injectHandler } from './inject'
import { builder } from './router'

let dir: string
let server: ReturnType<Http['start']>
let base: string
const cwd = process.cwd()

const page = (path: string, source: string) => {
  mkdirSync(join(dir, 'app', path), { recursive: true })
  writeFileSync(join(dir, 'app', path, 'index.tsx'), source)
}

beforeAll(async () => {
  dir = mkdtempSync(join(cwd, '.tmp-inject-'))
  page('about', `export default () => <p>about</p>`)
  page(
    'secret',
    `export const $ = (req) => req.cookies.token
  ? { ok: true }
  : Response.redirect(new URL('/about', req.url).toString(), 302)
export default () => <p>secret</p>`
  )
  page(
    'posts/[id]',
    `export const $ = (req) => ({ id: req.params.id })
export default ({ data }) => <p>post {data.id}</p>`
  )
  process.chdir(dir)
  const routes = await builder('./app', '..')
  const app = new Http({
    port: 0,
    appDir: './app',
    injectHandler: injectHandler('production', routes)
  })
  server = app.start()
  base = `http://localhost:${server.port}`
})

afterAll(() => {
  server.stop(true)
  process.chdir(cwd)
  rmSync(dir, { recursive: true, force: true })
})

describe('injectHandler', () => {
  test('static pages render with a query string', async () => {
    const resp = await fetch(`${base}/about?utm_source=x`)
    expect(resp.status).toBe(200)
    expect(await resp.text()).toContain('about')
  })

  test('loader data is served as JSON for client navigation', async () => {
    const resp = await fetch(`${base}/secret?_$=-1`, {
      headers: { cookie: 'token=1' }
    })
    expect(resp.status).toBe(200)
    expect(await resp.json()).toEqual({ ok: true })
  })

  test('dynamic params do not include the query string', async () => {
    const resp = await fetch(`${base}/posts/42?_$=-1&x=y`)
    expect(await resp.json()).toEqual({ id: '42' })
  })

  test('a Response from $ is returned on full loads and data fetches', async () => {
    for (const path of ['/secret', '/secret?_$=-1']) {
      const resp = await fetch(base + path, { redirect: 'manual' })
      expect(resp.status).toBe(302)
      expect(resp.headers.get('location')).toBe(`${base}/about`)
    }
  })

  test('root.js is versioned by the build content, not package.json', async () => {
    const html = await (await fetch(`${base}/about`)).text()
    const v = /\/root\.js\?v=([a-z0-9]+)/.exec(html)?.[1]
    expect(v).toBe(await buildId('.buntal'))
  })

  test('a rebuilt bundle gets a new root.js version', async () => {
    for (const [name, code] of [
      ['a', 'console.log(1)'],
      ['b', 'console.log(2)']
    ]) {
      mkdirSync(join(dir, name, 'dist'), { recursive: true })
      writeFileSync(join(dir, name, 'dist', 'root.js'), code!)
    }
    const a = await buildId(join(dir, 'a'))
    expect(a).toBe(await buildId(join(dir, 'a')))
    expect(a).not.toBe(await buildId(join(dir, 'b')))
  })

  test('invalid _$ values return 404 without crashing', async () => {
    for (const value of ['99', 'abc', '1.5']) {
      const resp = await fetch(`${base}/secret?_$=${value}`, {
        headers: { cookie: 'token=1' }
      })
      expect(resp.status).toBe(404)
    }
  })
})
