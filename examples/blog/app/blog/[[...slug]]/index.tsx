import { Req } from '@buntal/http'
import { compile } from '@mdx-js/mdx'
import path from 'path'
import { renderToStaticMarkup } from 'react-dom/server'

export const $ = async (req: Req) => {
  const slug = req.params.slug
  if (!slug) return

  const mdPath = path.join(__dirname, slug + '.mdx')

  if (!(await Bun.file(mdPath).exists())) return

  const mdContent = await Bun.file(mdPath).text()
  const blob = await compile(mdContent).then((code) => {
    console.log('Blob created:', code)
    const res = new Blob([code.value], { type: 'application/javascript' })
    return res
  })

  const url = URL.createObjectURL(blob)

  const component = await import(url)
  return {
    component: renderToStaticMarkup(<component.default />)
  }
}

export default function Post({
  data
}: Readonly<{
  data?: Awaited<ReturnType<typeof $>>
}>) {
  return (
    <div className="container mx-auto prose">
      {/* eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml */}
      {/* <data dangerouslySetInnerHTML={{
        __html: data?.component || ''
      }}></data> */}
      {data?.component || ''}
    </div>
  )
}
