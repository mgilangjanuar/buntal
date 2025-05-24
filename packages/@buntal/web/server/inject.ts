import type { Req } from '@buntal/server'
import type { ReactNode } from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { builder } from '../router'

export async function injectHandler(routes: Awaited<ReturnType<typeof builder>>, { req, match, handler }: {
  req: Req,
  match: Bun.MatchedRoute,
  handler: any
}) {
  const route = routes.find(r => r.route === match.name)
  if (route && 'default' in handler) {
    const args = {
      query: req.query,
      params: req.params,
      data: route.ssr ? await handler.$(req) : {}
    }

    // Recursively create the component with layouts
    const createComponent = async (layouts: string[]): Promise<ReactNode> => {
      if (!layouts?.[0]) {
        return handler.default(args) as ReactNode
      }
      const layout = await import(layouts[0])
      return layout.default({
        ...args,
        children: await createComponent(layouts.slice(1))
      }) as ReactNode
    }

    // Render the component to a readable stream
    return new Response(
      await renderToReadableStream(
        await createComponent(route.layouts)
      ), {
        headers: {
          'Content-Type': 'text/html',
        }
      }
    )
  }
}
