import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { Cookie, Http, Res } from '.'
import { auth, cors, jwt, secureHeaders } from './middlewares'

const SECRET = 'test-secret'
let server: ReturnType<Http['start']>
let base: string
let appDir: string

beforeAll(() => {
  appDir = mkdtempSync(join(tmpdir(), 'buntal-sec-'))
  mkdirSync(join(appDir, 'page'), { recursive: true })
  writeFileSync(
    join(appDir, 'page', 'index.ts'),
    `export const GET = (_, res) => res.text('page')
export default () => new Response('default export')
export const $ = () => new Response('loader')
export const PROPFIND = () => new Response('helper')`
  )

  const app = new Http({ port: 0, appDir })
  app.use(secureHeaders())
  app.get('/raw', (_, res) => {
    res.cookie('one', '1')
    return new Response('raw')
  })
  app.get('/own', (_, res) => res.cookie('one', '1').text('own'))
  app.get('/me', auth<{ sub: string }>({ secret: SECRET }), (req, res) =>
    res.json(req.context)
  )
  server = app.start()
  base = `http://localhost:${server.port}`
})

afterAll(() => {
  server.stop(true)
  rmSync(appDir, { recursive: true, force: true })
})

describe('file-system dispatch', () => {
  test('only HTTP method exports are reachable', async () => {
    for (const method of ['PROPFIND', 'TRACE']) {
      const resp = await fetch(`${base}/page`, { method })
      expect(resp.status).toBe(404)
    }
  })

  test('HEAD falls back to GET', async () => {
    const resp = await fetch(`${base}/page`, { method: 'HEAD' })
    expect(resp.status).toBe(200)
  })
})

describe('auth', () => {
  test('rejects an empty secret instead of verifying with it', () => {
    expect(() => auth({ secret: '' })).toThrow()
    expect(() => jwt('')).toThrow()
  })

  test('accepts a valid token and exposes it on req.context', async () => {
    const token = await jwt(SECRET).sign({ sub: 'u1' })
    const resp = await fetch(`${base}/me`, {
      headers: { authorization: `bearer ${token}` }
    })
    expect(resp.status).toBe(200)
    expect(((await resp.json()) as { sub: string }).sub).toBe('u1')
  })

  test('rejects alg=none and tokens signed with another secret', async () => {
    const enc = (o: object) =>
      Buffer.from(JSON.stringify(o)).toString('base64url')
    const none = `${enc({ alg: 'none' })}.${enc({ sub: 'admin' })}.`
    const other = await jwt('other').sign({ sub: 'admin' })
    for (const token of [none, other, 'garbage']) {
      const resp = await fetch(`${base}/me`, {
        headers: { authorization: `Bearer ${token}` }
      })
      expect(resp.status).toBe(401)
    }
  })

  test('lets CORS preflight through', async () => {
    const resp = await fetch(`${base}/me`, { method: 'OPTIONS' })
    expect(resp.status).not.toBe(401)
  })
})

describe('cookies', () => {
  test('rejects names and attributes that would inject attributes', () => {
    const res = new Res()
    expect(() => Cookie.set(res, 'a;b', '1')).toThrow()
    expect(() =>
      Cookie.set(res, 'a', '1', { path: '/; Domain=evil' })
    ).toThrow()
    expect(Cookie.set(res, 'a', 'x; Domain=evil')).toBe(
      'a=x%3B%20Domain%3Devil'
    )
  })

  test('maxAge 0 is honoured and SameSite=None forces Secure', () => {
    const res = new Res()
    expect(Cookie.set(res, 'a', '1', { maxAge: 0 })).toContain('Max-Age=0')
    expect(Cookie.set(res, 'a', '1', { sameSite: 'None' })).toContain('Secure')
  })

  test('delete keeps the path and domain of the cookie it clears', () => {
    const header = new Res()
      .cookie('sid', null, { path: '/app', domain: 'example.com' })
      .send()
      .headers.get('set-cookie')
    expect(header).toContain('Path=/app')
    expect(header).toContain('Domain=example.com')
    expect(header).toContain('Max-Age=0')
  })
})

describe('cors', () => {
  const run = (opts: Parameters<typeof cors>[0], origin: string) => {
    const res = new Res()
    cors(opts)(new Request('http://x', { headers: { origin } }) as any, res)
    return res.send().headers
  }

  test('never pairs a wildcard origin with credentials', () => {
    const headers = run({ origin: '*', credentials: true }, 'http://a.test')
    expect(headers.get('access-control-allow-origin')).toBe('*')
    expect(headers.get('access-control-allow-credentials')).toBeNull()
  })

  test('allow-listed origins get credentials and Vary', () => {
    const headers = run({ origin: ['http://a.test'] }, 'http://a.test')
    expect(headers.get('access-control-allow-credentials')).toBe('true')
    expect(headers.get('vary')).toBe('Origin')
  })
})

describe('middleware headers', () => {
  test('reach handlers that build their own Response', async () => {
    const resp = await fetch(`${base}/raw`)
    expect(resp.headers.get('x-frame-options')).toBe('SAMEORIGIN')
    expect(resp.headers.getSetCookie()).toEqual(['one=1'])
  })

  test('are not duplicated on responses built by Res', async () => {
    const resp = await fetch(`${base}/own`)
    expect(resp.headers.getSetCookie()).toEqual(['one=1'])
  })

  test('reach the not-found response', async () => {
    const resp = await fetch(`${base}/missing`)
    expect(resp.status).toBe(404)
    expect(resp.headers.get('x-frame-options')).toBe('SAMEORIGIN')
  })
})

describe('secureHeaders', () => {
  test('sets baseline headers, HSTS only over https', async () => {
    const resp = await fetch(`${base}/page`)
    expect(resp.headers.get('x-content-type-options')).toBe('nosniff')
    expect(resp.headers.get('x-frame-options')).toBe('SAMEORIGIN')
    expect(resp.headers.get('strict-transport-security')).toBeNull()

    const proxied = await fetch(`${base}/page`, {
      headers: { 'x-forwarded-proto': 'https' }
    })
    expect(proxied.headers.get('strict-transport-security')).toContain(
      'max-age'
    )
  })
})
