import { Req } from '@buntal/http'
import path from 'path'
import { loadMDX } from '@/lib/render'

export const $ = async (req: Req) => {
  const slug = req.params.slug
  if (!slug) return

  const mdPath = path.join(__dirname, slug + '.mdx')

  // Check if MDX file exists
  if (!(await Bun.file(mdPath).exists())) {
    return null
  }

  try {
    // Load and render MDX content
    const result = await loadMDX(mdPath)
    return {
      html: result.html,
      component: result.component,
      frontmatter: result.frontmatter
    }
  } catch (error) {
    console.error('Error loading MDX:', error)
    return null
  }
}

export default function Post({
  data
}: Readonly<{
  data?: Awaited<ReturnType<typeof $>>
}>) {
  if (!data) {
    return (
      <div className="container mx-auto prose">
        <h1>Post not found</h1>
        <p>The requested blog post could not be found.</p>
      </div>
    )
  }

  const { frontmatter } = data
  const title = frontmatter?.title as string | undefined
  const description = frontmatter?.description as string | undefined
  const date = frontmatter?.date as string | undefined

  return (
    <div className="container mx-auto prose prose-lg max-w-4xl py-8">
      {/* Display frontmatter if available */}
      {title && (
        <header className="mb-8 border-b pb-4">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {description && (
            <p className="text-xl text-gray-600 mb-2">{description}</p>
          )}
          {date && (
            <time className="text-sm text-gray-500">
              {new Date(date).toLocaleDateString()}
            </time>
          )}
        </header>
      )}

      {/* Render the MDX content as HTML */}
      {/* eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml */}
      <div dangerouslySetInnerHTML={{ __html: data.html }} />
    </div>
  )
}
