export const staticHandler = async (req: Request): Promise<Response | void> => {
  const { pathname } = new URL(req.url)
  if (await Bun.file(`./public${pathname}`).exists()) {
    const file = Bun.file(`./public${pathname}`)
    return new Response(file, {
      headers: {
        'content-type': file.type
      }
    })
  }
}
