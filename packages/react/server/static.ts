export const staticHandler = async (req: Request, dir: string = './public'): Promise<Response | void> => {
  const { pathname } = new URL(req.url)
  if (await Bun.file(`${dir}${pathname}`).exists()) {
    const file = Bun.file(`${dir}${pathname}`)
    return new Response(file, {
      headers: {
        'content-type': file.type
      }
    })
  }

  if (pathname.startsWith('/dist/') && await Bun.file(`.buntal${pathname}`).exists()) {
    const file = Bun.file(`.buntal${pathname}`)
    return new Response(file, {
      headers: {
        'content-type': file.type
      }
    })
  }
}
