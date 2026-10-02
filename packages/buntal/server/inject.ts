import type { Req } from '@buntal/http'
import { createElement, type ReactNode } from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { type RouteBuilderResult } from './router'
import { ssrHandler } from './ssr'

const buildIds = new Map<string, Promise<string>>()

export const buildId = (outDir = '.buntal') => {
  let id = buildIds.get(outDir)
  if (!id) {
    id = Bun.file(`${outDir}/dist/root.js`)
      .bytes()
      .then((bytes) => Bun.hash(bytes).toString(36))
      .catch(() => Date.now().toString(36))
    buildIds.set(outDir, id)
  }
  return id
}

export const pageHeaders = {
  'Content-Type': 'text/html; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
}

export const bootstrapModules = async (
  env: 'development' | 'production' = 'development',
  outDir = '.buntal'
) => [
  env === 'development'
    ? `/root.js?t=${Date.now()}`
    : `/root.js?v=${await buildId(outDir)}`,
  ...(env === 'development' ? ['/hot-reload.js'] : [])
]

class Halt {
  constructor(public response: Response) {}
}

const load = async (mod: any, req: Req) => {
  const data = await mod.$(req)
  if (data instanceof Response) throw new Halt(data)
  return data
}

export const injectHandler = (
  env: 'development' | 'production' = 'development',
  routes: RouteBuilderResult[],
  outDir = '.buntal'
) => {
  const byName = new Map(
    routes.map((r) => [r.route, { route: r, regex: new RegExp(r.regex) }])
  )
  return async ({
    req,
    match,
    handler
  }: {
    req: Req
    match: Bun.MatchedRoute
    handler: any
  }) => {
    const entry = byName.get(match.name)
    const route = entry?.route
    if (
      !route ||
      !entry.regex.test(new URL(req.url).pathname) ||
      !('default' in handler) ||
      (req.method !== 'GET' && req.method !== 'HEAD')
    ) {
      return
    }

    if (req.query?._$ && (route.ssr || route.layouts?.some((l) => l.ssr))) {
      if (req.query._$ === '-1') {
        return ssrHandler(req, handler)
      }
      const idx = Number(req.query._$)
      const layout = Number.isInteger(idx) ? route.layouts[idx] : undefined
      return ssrHandler(req, layout?.ssr ? await import(layout.filePath) : {})
    }

    try {
      const args = {
        query: req.query,
        params: req.params,
        data: route.ssr ? await load(handler, req) : route.data
      }

      const createComponent = async (
        layouts: RouteBuilderResult['layouts']
      ): Promise<ReactNode> => {
        if (!layouts?.[0]) {
          return createElement(handler.default, args)
        }
        const layout = await import(layouts[0].filePath)
        const dataLayout = layouts[0].ssr
          ? await load(layout, req)
          : layouts[0].data
        return createElement(layout.default, {
          ...args,
          data: {
            ...dataLayout,
            _meta: {
              ...dataLayout?._meta,
              ...args.data?._meta
            }
          },
          children: await createComponent(layouts.slice(1))
        })
      }

      return new Response(
        await renderToReadableStream(await createComponent(route.layouts), {
          bootstrapModules: await bootstrapModules(env, outDir)
        }),
        { headers: pageHeaders }
      )
    } catch (error) {
      if (error instanceof Halt) return error.response
      throw error
    }
  }
}
