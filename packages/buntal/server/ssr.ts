import type { Req } from '@buntal/http'

const headers = (contentType: string) => ({
  'Cache-Control': 'private, no-store',
  'Content-Type': contentType,
  'X-Content-Type-Options': 'nosniff'
})

export const ssrHandler = async (
  req: Req,
  handler: {
    $?: (req: Req) => unknown
  }
): Promise<Response | void> => {
  if (typeof handler?.$ !== 'function') {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  try {
    const result = await handler.$(req)

    if (result instanceof Response) {
      return result
    }
    if (typeof result === 'object') {
      return new Response(JSON.stringify(result), {
        headers: headers('application/json')
      })
    }
    return new Response(String(result), {
      headers: headers('text/plain; charset=utf-8')
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.error(error)
      return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
    return Response.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
