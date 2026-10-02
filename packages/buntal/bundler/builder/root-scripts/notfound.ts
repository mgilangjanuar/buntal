import { join, relative } from 'path'

export const buildNotfound = async (
  appDir: string = './app',
  rootLayout: string | null,
  outDir: string = '.buntal'
) => {
  const source = join(relative(outDir, '.') || '.', appDir, '404.tsx')
  const notFoundPage = await Bun.file(appDir + '/404.tsx').exists()

  return {
    imports: notFoundPage
      ? `\nconst NotFound = lazy(() => import(${JSON.stringify(source)}))`
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
