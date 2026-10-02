import { Canonical } from '@/components/seo'
import { listTags } from '@/lib/posts'
import { absoluteUrl, site } from '@/lib/site'
import { Link, type MetaProps } from 'buntal'

export const $ = async () => ({
  tags: await listTags(),
  _meta: {
    title: `Tags | ${site.name}`,
    description: `Browse posts on ${site.name} by topic.`,
    og: { url: absoluteUrl('/tags') }
  } satisfies MetaProps
})

export default function TagsPage({
  data
}: {
  data?: Awaited<ReturnType<typeof $>>
}) {
  return (
    <>
      <Canonical path="/tags" />
      <h1 className="text-4xl font-bold tracking-tight">Tags</h1>
      <ul className="mt-8 flex flex-wrap gap-3">
        {data?.tags.map(({ tag, count }) => (
          <li key={tag}>
            <Link
              href={`/tags/${tag}`}
              className="inline-block rounded-full border border-zinc-200 px-4 py-1.5 hover:border-indigo-400 dark:border-zinc-800"
            >
              #{tag} <span className="text-zinc-500">({count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
