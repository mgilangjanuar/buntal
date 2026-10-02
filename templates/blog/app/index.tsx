import { Pagination, PostList } from '@/components/post-list'
import { Canonical, JsonLd, NoIndex } from '@/components/seo'
import { listPosts, parsePage } from '@/lib/posts'
import { absoluteUrl, site } from '@/lib/site'
import type { Req } from '@buntal/http'
import type { MetaProps } from 'buntal'

export const $ = async (req: Req) => {
  const page = parsePage(req.query?.page)
  const posts = await listPosts({ page, perPage: site.postsPerPage })
  const path = page === 1 ? '/' : `/?page=${page}`
  return {
    posts,
    path,
    outOfRange: page > posts.totalPages,
    _meta: {
      title: page === 1 ? site.name : `${site.name} (page ${page})`,
      description: site.description,
      og: { url: absoluteUrl(path) }
    } satisfies MetaProps
  }
}

export default function HomePage({
  data
}: {
  data?: Awaited<ReturnType<typeof $>>
}) {
  if (!data) return null
  return (
    <>
      {data.outOfRange ? <NoIndex /> : <Canonical path={data.path} />}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: site.name,
          url: site.url,
          description: site.description
        }}
      />
      <h1 className="text-4xl font-bold tracking-tight">{site.name}</h1>
      <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
        {site.description}
      </p>
      <PostList posts={data.posts.items} />
      <Pagination
        page={data.posts.page}
        totalPages={data.posts.totalPages}
        basePath="/"
      />
    </>
  )
}
