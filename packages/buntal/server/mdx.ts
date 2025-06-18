import type { Req } from '@buntal/http'
import path from 'path'

export async function mdxHandler(
  req: Req,
  env: 'development' | 'production' = 'development',
  appDir: string = './app'
): Promise<Response | void> {
  let mdPath = path.join(
    process.cwd(),
    appDir,
    new URL(req.url).pathname + '.mdx'
  )
  if (!(await Bun.file(mdPath).exists())) {
    mdPath = path.join(
      process.cwd(),
      appDir,
      new URL(req.url).pathname,
      'index.mdx'
    )
  }

  console.log('MDX path:', mdPath)

  if (await Bun.file(mdPath).exists()) {
    const { default: MDX } = await import(mdPath)

    return new Response(
      await MDX.renderToReadableStream({
        bootstrapModules: [
          '/root.js',
          ...(env === 'development' ? ['/hot-reload.js'] : [])
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
