import { Pagination, PostList } from '@/components/post-list'
import { Canonical, NoIndex } from '@/components/seo'
import { listPosts, parsePage } from '@/lib/posts'
import { absoluteUrl, site } from '@/lib/site'
import type { Req } from '@buntal/http'
import type { MetaProps } from 'buntal'

export const $ = async (req: Req<{ tag: string }>) => {
  const tag = req.params.tag.toLowerCase()
  const page = parsePage(req.query?.page)
  const posts = await listPosts({ page, perPage: site.postsPerPage, tag })
  const basePath = `/tags/${encodeURIComponent(tag)}`
  const path = page === 1 ? basePath : `${basePath}?page=${page}`
  return {
    tag,
    posts,
    basePath,
    path,
    empty: posts.total === 0 || page > posts.totalPages,
    _meta: {
      title: `#${tag} | ${site.name}`,
      description: `Posts tagged ${tag} on ${site.name}.`,
      og: { url: absoluteUrl(path) }
    } satisfies MetaProps
  }
}

export default function TagPage({
  data
}: {
  data?: Awaited<ReturnType<typeof $>>
}) {
  if (!data) return null
  return (
    <>
      {data.empty ? <NoIndex /> : <Canonical path={data.path} />}
      <h1 className="text-4xl font-bold tracking-tight">#{data.tag}</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        {data.posts.total} {data.posts.total === 1 ? 'post' : 'posts'}
      </p>
      <PostList posts={data.posts.items} />
      <Pagination
        page={data.posts.page}
        totalPages={data.posts.totalPages}
        basePath={data.basePath}
      />
    </>
  )
}
