import type { Req } from 'buntal-server'
import { createElement, type ReactNode } from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { type RouteBuilderResult } from './router'
import { ssrHandler } from './ssr'

export const injectHandler = (routes: RouteBuilderResult[]) => async ({ req, match, handler }: {
  req: Req,
  match: Bun.MatchedRoute,
  handler: any
}) => {
  const route = routes.find(r => r.route === match.name)
  if (route && new RegExp(route.regex).test(new URL(req.url).pathname) && 'default' in handler) {
    // Handle SSR requests
    if (req.query?._$ === '1' && route.ssr && req.method === 'GET') {
      const resp = await ssrHandler(req, handler)
      if (resp) {
        return resp
      }
    }

    const args = {
      query: req.query,
      params: req.params,
      data: route.ssr ? await handler.$(req) : {}
    }

    // Recursively create the component with layouts
    const createComponent = async (layouts: string[]): Promise<ReactNode> => {
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
    return new Response(
      await renderToReadableStream(
        await createComponent(route.layouts),
        {
          bootstrapModules: ['/root.js']
        }
      ), {
        headers: {
          'Content-Type': 'text/html',
        }
      }
    )
  }
}
