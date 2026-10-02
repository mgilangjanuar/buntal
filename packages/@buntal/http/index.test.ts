import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { Cookie, Http, Res } from '.'
import { cors } from './middlewares'

let server: ReturnType<Http['start']>
let base: string
let appDir: string

beforeAll(() => {
  appDir = mkdtempSync(join(tmpdir(), 'buntal-http-'))
  mkdirSync(join(appDir, 'items', '[id]'), { recursive: true })
  writeFileSync(
    join(appDir, 'items', '[id]', 'index.ts'),
    `export const GET = (req, res) => res.json({ id: req.params.id, q: req.query.q, c: req.cookies.a })`
  )

  const app = new Http({ port: 0, appDir })
  app.use(cors({ origin: ['http://allowed.test'] }))
  app.get('/same', (_, res) => res.text('get'))
  app.post('/same', (_, res) => res.text('post'))
  app.get('/users/:id', (req, res) =>
    res.json({ id: req.params.id, q: req.query?.q, c: req.cookies.a })
  )
  app.get('/cookies', (_, res) =>
    res.cookie('a', '1').cookie('b', '2').text('ok')
  )
  app.get('/boom', () => {
    throw new Error('boom')
  })
  server = app.start()
  base = `http://localhost:${server.port}`
})

afterAll(() => {
  server.stop(true)
  rmSync(appDir, { recursive: true, force: true })
})

describe('Http', () => {
  test('registering GET and POST on one path keeps both', async () => {
    expect(await (await fetch(`${base}/same`)).text()).toBe('get')
    expect(await (await fetch(`${base}/same`, { method: 'POST' })).text()).toBe(
      'post'
    )
  })

  test('programmatic routes expose params, query and cookies', async () => {
    const resp = await fetch(`${base}/users/7?q=x`, {
      headers: { cookie: 'a=b=c' }
    })
    expect(await resp.json()).toEqual({ id: '7', q: 'x', c: 'b=c' })
  })

  test('file-system routes expose params, query and cookies', async () => {
    const resp = await fetch(`${base}/items/9?q=y`, {
      headers: { cookie: 'a=z' }
    })
    expect(await resp.json()).toEqual({ id: '9', q: 'y', c: 'z' })
  })

  test('multiple cookies are all sent', async () => {
    const resp = await fetch(`${base}/cookies`)
    expect(resp.headers.getSetCookie()).toEqual(['a=1', 'b=2'])
  })

  test('preflight runs middlewares and gets CORS headers', async () => {
    const resp = await fetch(`${base}/anything`, {
      method: 'OPTIONS',
      headers: { origin: 'http://allowed.test' }
    })
    expect(resp.status).toBe(204)
    expect(resp.headers.get('access-control-allow-origin')).toBe(
      'http://allowed.test'
    )
  })

  test('disallowed origins get no CORS headers', async () => {
    const resp = await fetch(`${base}/same`, {
      headers: { origin: 'http://evil.test' }
    })
    expect(resp.headers.get('access-control-allow-origin')).toBeNull()
  })

  test('unknown routes return 404', async () => {
    expect((await fetch(`${base}/nope`)).status).toBe(404)
  })

  test('errors return 500', async () => {
    expect((await fetch(`${base}/boom`)).status).toBe(500)
  })
})

describe('Cookie', () => {
  test('parses values containing = and skips malformed pairs', () => {
    const req = new Request('http://x', {
      headers: { cookie: 'a=1; token=x=y==; junk; b=%20' }
    })
    expect(Cookie.getAll(req)).toEqual({ a: '1', token: 'x=y==', b: ' ' })
    expect(Cookie.get(req, 'missing')).toBeNull()
  })

  test('tolerates malformed percent-encoding', () => {
    const req = new Request('http://x', { headers: { cookie: 'a=%E0%A4%A' } })
    expect(Cookie.get(req, 'a')).toBe('%E0%A4%A')
  })
})

describe('Res', () => {
  test('json keeps status and headers', async () => {
    const resp = new Res().status(201).headers({ 'x-a': '1' }).json({ ok: 1 })
    expect(resp.status).toBe(201)
    expect(resp.headers.get('x-a')).toBe('1')
    expect(resp.headers.get('content-type')).toContain('application/json')
    expect(await resp.json()).toEqual({ ok: 1 })
  })
})
