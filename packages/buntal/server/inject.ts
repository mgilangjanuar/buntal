import type { Req } from '@buntal/core'
import { createElement, type ReactNode } from 'react'
import { renderToReadableStream } from 'react-dom/server'
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
      if (req.query?._$ && route.ssr) {
        let _handler: any = handler
        if (req.query._$ !== '-1') {
          _handler = route.layouts[Number(req.query._$)]
            ? await import(route.layouts[Number(req.query._$)]!.filePath)
            : {}
        }
        const resp = await ssrHandler(req, _handler)
        if (resp) {
          return resp
        }
      }

      const args = {
        query: req.query,
        params: req.params
      }

      // Recursively create the component with layouts
      const createComponent = async (
        layouts: RouteBuilderResult['layouts']
      ): Promise<ReactNode> => {
        if (!layouts?.[0]) {
          return createElement(handler.default, {
            ...args,
            data: route.ssr ? await handler.$(req) : route.data
          })
        }
        const layout = await import(layouts[0].filePath)
        return createElement(layout.default, {
          ...args,
          data: layouts[0].ssr ? await layout.$(req) : layouts[0].data,
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
