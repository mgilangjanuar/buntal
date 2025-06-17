export const buildNotfound = async (
  appDir: string = './app',
  rootLayout: string | null
) => {
  const notFoundPage = await Bun.file(appDir + '/404.tsx').exists()

  return {
    imports: notFoundPage
      ? `\nconst NotFound = lazy(() => import('../${appDir.replace(/^\.\//, '')}/404.tsx'))`
      : '',
    render: notFoundPage
      ? ` notFound={${
          !rootLayout
            ? '<NotFound />'
            : `<${rootLayout} children={<NotFound />} data={{ _meta: { title: 'Not found' } }} />`
        }}`
      : ''
  }
}
