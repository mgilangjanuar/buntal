import type { Req } from '@buntal/core'
import { createElement, type VNode } from 'preact'
import { renderToReadableStream } from 'preact-render-to-string/stream'
// import { renderToReadableStream } from 'react-dom/server'
import { type RouteBuilderResult } from './router'
import { ssrHandler } from './ssr'

export const injectHandler =
  (
    env: 'development' | 'production' = 'development',
    routes: RouteBuilderResult[]
  ) =>
  async ({
    req,
    match,
    handler
  }: {
    req: Req
    match: Bun.MatchedRoute
    handler: any
  }) => {
    const route = routes.find((r) => r.route === match.name)
    if (
      route &&
      new RegExp(route.regex).test(new URL(req.url).pathname) &&
      'default' in handler &&
      req.method === 'GET'
    ) {
      // Handle SSR requests
      if (req.query?._$ === '1' && route.ssr) {
        const resp = await ssrHandler(req, handler)
        if (resp) {
          return resp
        }
      }

      const args = {
        query: req.query,
        params: req.params,
        data: route.ssr ? await handler.$(req) : route.data
      }

      // Recursively create the component with layouts
      const createComponent = async (
        layouts: string[]
      ): Promise<VNode<any>> => {
        if (!layouts?.[0]) {
          return createElement(handler.default, args)
        }
        const layout = await import(layouts[0])
        return createElement(layout.default, {
          ...args,
          children: await createComponent(layouts.slice(1))
        })
      }

      // Render the component to a readable stream
      let version = '0.0.1'
      try {
        const pkg = await import(`${process.cwd()}/package.json`)
        version = pkg.default.version || version
      } catch {}
      return new Response(
        await renderToReadableStream(await createComponent(route.layouts), {
          bootstrapModules: [
            `/root.js?v=${version}`,
            ...(env === 'development' ? ['/🔥.js'] : [])
          ]
        }),
        {
          headers: {
            'Content-Type': 'text/html'
          }
        }
      )
    }
  }
