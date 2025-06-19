import { loadMetadata } from '@/lib/render'
import { Link } from 'buntal'
import { readdirSync } from 'fs'

export const $ = async () => {
  const files = readdirSync('./app/blog/[[...slug]]', {
    recursive: true
  }).filter(
    (file) => typeof file === 'string' && file.endsWith('.mdx')
  ) as string[]
  return {
    posts: files.map(
      (file) =>
        ({
          ...loadMetadata(`./app/blog/[[...slug]]/${file}`),
          slug: file.replace(/\.mdx$/, '')
        }) as {
          slug: string
          [key: string]: unknown
        }
    )
  }
}

export default function Blog({
  data
}: Readonly<{
  data?: Awaited<ReturnType<typeof $>>
}>) {
  return (
    <div className="container mx-auto prose prose-lg max-w-4xl py-8">
      <h1>Buntal Blog Example</h1>
      <p>
        This blog demonstrates how to load and render MDX content in Buntal
        using Bun's recommended approaches for both runtime and compile-time
        loading.
      </p>

      <h2>Available Posts</h2>
      <div className="not-prose">
        <div className="grid gap-4 my-6">
          {data?.posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-lg">
                {(post.title as string) || 'Untitled Post'}
              </h3>
              <p className="text-gray-600">
                {(post.description as string) || 'No description available.'}
              </p>
              <time className="text-sm text-gray-500">
                {new Date(post.date as string).toLocaleDateString('en-US')}
              </time>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
