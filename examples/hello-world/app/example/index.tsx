import { mdx } from 'buntal'

export const $ = () => mdx('./app/example/index.mdx')

export default function Example({
  data
}: {
  data?: Awaited<ReturnType<typeof $>>
}) {
  // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
  return <div dangerouslySetInnerHTML={{ __html: data || '' }}></div>
}
