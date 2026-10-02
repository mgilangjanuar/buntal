import { formatDate } from '@/lib/format'
import type { PostSummary } from '@/lib/posts'
import { Link } from 'buntal'

export function PostList({ posts }: { posts: PostSummary[] }) {
  if (!posts.length) {
    return <p className="text-zinc-600 dark:text-zinc-400">No posts yet.</p>
  }
  return (
    <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
      {posts.map((post) => (
        <li key={post.slug} className="py-8">
          <article>
            <p className="text-sm text-zinc-500">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>{' '}
              &middot; {post.readingMinutes} min read
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              <Link
                href={`/posts/${post.slug}`}
                className="hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {post.description}
            </p>
            {post.tags.length > 0 && <Tags tags={post.tags} />}
          </article>
        </li>
      ))}
    </ul>
  )
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${tag}`}
            className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function Pagination({
  page,
  totalPages,
  basePath
}: {
  page: number
  totalPages: number
  basePath: string
}) {
  if (totalPages <= 1) return null
  const href = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`)
  return (
    <nav aria-label="Pagination" className="mt-10 flex justify-between text-sm">
      {page > 1 ? (
        <Link
          href={href(page - 1)}
          rel="prev"
          className="underline underline-offset-4"
        >
          &larr; Newer posts
        </Link>
      ) : (
        <span />
      )}
      <span className="text-zinc-500">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={href(page + 1)}
          rel="next"
          className="underline underline-offset-4"
        >
          Older posts &rarr;
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
