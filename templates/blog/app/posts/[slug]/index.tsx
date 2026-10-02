import { Tags } from '@/components/post-list'
import { Canonical, JsonLd, NoIndex } from '@/components/seo'
import { formatDate } from '@/lib/format'
import { getPost } from '@/lib/posts'
import { absoluteUrl, site } from '@/lib/site'
import type { Req } from '@buntal/http'
import { Link, type MetaProps } from 'buntal'

export const $ = async (req: Req<{ slug: string }>) => {
  const post = await getPost(req.params.slug)
  if (!post) {
    return { post: null, _meta: { title: `Post not found | ${site.name}` } }
  }
  const url = absoluteUrl(`/posts/${post.slug}`)
  const image = post.cover
    ? new URL(post.cover, site.url).toString()
    : undefined
  return {
    post,
    _meta: {
      title: `${post.title} | ${site.name}`,
      description: post.description,
      og: { url, type: 'article', ...(image ? { image } : {}) },
      twitter: { card: image ? 'summary_large_image' : 'summary' }
    } satisfies MetaProps
  }
}

export default function PostPage({
  data
}: {
  data?: Awaited<ReturnType<typeof $>>
}) {
  if (!data) return null
  const { post } = data
  if (!post) {
    return (
      <>
        <NoIndex />
        <h1 className="text-3xl font-bold">Post not found</h1>
        <Link href="/" className="mt-4 inline-block underline">
          Back to all posts
        </Link>
      </>
    )
  }

  return (
    <article>
      <Canonical path={`/posts/${post.slug}`} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          mainEntityOfPage: absoluteUrl(`/posts/${post.slug}`),
          author: {
            '@type': 'Person',
            name: site.author.name,
            url: site.author.url
          },
          keywords: post.tags.join(', '),
          ...(post.cover
            ? { image: new URL(post.cover, site.url).toString() }
            : {})
        }}
      />
      <header>
        <p className="text-sm text-zinc-500">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>{' '}
          &middot; {post.readingMinutes} min read
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-balance">
          {post.title}
        </h1>
        <p className="mt-3 text-xl text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>
        <Tags tags={post.tags} />
      </header>
      {post.cover && (
        <img
          src={post.cover}
          alt=""
          width={1200}
          height={630}
          className="mt-8 aspect-[1200/630] w-full rounded-xl object-cover"
        />
      )}
      <div
        className="prose mt-10"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <nav className="mt-16 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <Link href="/" className="underline underline-offset-4">
          &larr; All posts
        </Link>
      </nav>
    </article>
  )
}
