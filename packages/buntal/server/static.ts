export const staticHandler = async (
  req: Request,
  dir: string = './public'
): Promise<Response | void> => {
  const { pathname } = new URL(req.url)
  if (await Bun.file(`${dir}${decodeURIComponent(pathname)}`).exists()) {
    const file = Bun.file(`${dir}${decodeURIComponent(pathname)}`)
    return new Response(file, {
      headers: {
        'content-type': file.type
      }
    })
  }
}
