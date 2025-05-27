export const staticHandler = async (req: Request, outDir: string = '.buntal', dir: string = './public'): Promise<Response | void> => {
  const { pathname } = new URL(req.url)
  if (await Bun.file(`${dir}${pathname}`).exists()) {
    const file = Bun.file(`${dir}${pathname}`)
    return new Response(file, {
      headers: {
        'content-type': file.type
      }
    })
  }

  if (await Bun.file(`${outDir}/dist${pathname}`).exists()) {
    const file = Bun.file(`${outDir}/dist${pathname}`)
    return new Response(file, {
      headers: {
        'content-type': file.type
      }
    })
  }
}
