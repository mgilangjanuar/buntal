import { loadMDX } from '@/lib/render'
import { Req } from '@buntal/http'
import { Link, type MetaProps } from 'buntal'
import path from 'path'
import { useMemo } from 'react'

export const $ = async (req: Req) => {
  const slug = req.params.slug
  if (!slug) return

  const mdPath = path.join(__dirname, slug + '.mdx')

  // Check if MDX file exists
  if (!(await Bun.file(mdPath).exists())) {
    return {
      notFound: true
    }
  }

  try {
    // Load and render MDX content
    const result = await loadMDX(mdPath)
    const { title, description } = result.metadata || {}
    return {
      ...result,
      _meta: {
        title,
        description
      } as MetaProps
    }
  } catch (error) {
    console.error('Error loading MDX:', error)
    return {
      notFound: true
    }
  }
}

export default function Post({
  data
}: Readonly<{
  data?: Awaited<ReturnType<typeof $>>
}>) {
  if (data?.notFound) {
    return (
      <div className="container mx-auto prose py-8">
        <h1>Post not found</h1>
        <p>The requested blog post could not be found.</p>
      </div>
    )
  }

  const metadata = useMemo(
    () => (data && 'metadata' in data ? data.metadata : null),
    [data]
  )
  const title = useMemo(() => metadata?.title as string | undefined, [metadata])
  const description = useMemo(
    () => metadata?.description as string | undefined,
    [metadata]
  )
  const date = useMemo(
    () => metadata?.date as string | Date | undefined,
    [metadata]
  )
  const html = useMemo(() => (data && 'html' in data ? data.html : ''), [data])

  return metadata ? (
    <div className="container mx-auto prose max-w-4xl py-8">
      <header className="mb-8 border-b pb-4">
        <p>
          <Link
            href="/blog"
            className="text-blue-600 hover:underline underline-offset-4"
          >
            ← Back to Blog
          </Link>
        </p>
        <h1 className="font-bold my-2">{title}</h1>
        {description && (
          <p className="text-xl text-gray-600 mb-2">{description}</p>
        )}
        {date && (
          <time className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString()}
          </time>
        )}
      </header>

      {/* eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  ) : (
    <div className="container mx-auto prose py-8">
      <p>Please wait...</p>
    </div>
  )
}
