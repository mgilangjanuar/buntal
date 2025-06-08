import Code from '@/components/code'
import Header from '@/components/docs/header'
import { cn } from '@/lib/utils'
import { Link } from 'buntal'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
  offset?: number
  children?: TableOfContentsItem[]
}

export interface MarkdownContentProps {
  title: string
  content: string
  prependComponent?: React.ReactNode
  tableOfContents?: TableOfContentsItem[]
  className?: string
  lastModified?: string
}

// Helper function to generate slug from text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Helper function to build nested TOC structure
function buildNestedToc(items: TableOfContentsItem[]): TableOfContentsItem[] {
  const result: TableOfContentsItem[] = []
  const stack: TableOfContentsItem[] = []

  for (const item of items) {
    // Remove any items from stack that are same level or higher
    while (stack.length > 0 && stack[stack.length - 1]!.level >= item.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      // Top level item
      result.push(item)
    } else {
      // Child item
      const parent = stack[stack.length - 1]!
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    }

    stack.push(item)
  }

  return result
}

export default function MarkdownContent({
  title,
  content,
  prependComponent,
  tableOfContents,
  className,
  lastModified
}: MarkdownContentProps) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [borderHeight, setBorderHeight] = useState<number>(0)
  const [borderTop, setBorderTop] = useState<number>(0)
  const asideRef = useRef<HTMLElement>(null)

  // Parse HTML content and extract table of contents if not provided
  const [autoToc, setAutoToc] = useState<TableOfContentsItem[]>([])

  useEffect(() => {
    const parseContent = () => {
      if (!tableOfContents) {
        // Extract headings from the markdown content
        const tocItems: TableOfContentsItem[] = []
        const headingRegex = /^(#{1,6})\s+(.+)$/gm
        let match

        while ((match = headingRegex.exec(content)) !== null) {
          const level = match[1]?.length || 1
          const title = match[2]?.trim() || ''
          const id = generateSlug(title)

          tocItems.push({
            id,
            title,
            level,
            offset: 72
          })
        }

        // Build nested structure
        const nestedToc = buildNestedToc(tocItems)
        setAutoToc(nestedToc)
      }
    }

    parseContent()
  }, [content, tableOfContents])

  const finalToc = tableOfContents || autoToc

  useEffect(() => {
    const handleScroll = () => {
      // Get all sections with IDs
      const sections = document.querySelectorAll('*[id]')

      let currentSection = ''
      let currentOffset = 0

      // Find the current section in viewport
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionId = section.getAttribute('id')

        if (sectionId && rect.top <= 150) {
          // 150px threshold for active section
          currentSection = sectionId
          // Try to find a link in aside that matches this section
          const matchingLink = asideRef.current?.querySelector(
            `a[href*="${sectionId}"]`
          )
          if (matchingLink) {
            const href = matchingLink.getAttribute('href')
            // Extract offset from href (number after ':')
            const offsetMatch = href ? href.match(/:(\d+)$/) : null
            currentOffset =
              offsetMatch && offsetMatch[1] ? parseInt(offsetMatch[1]) : 0
          }
        }
      })

      setActiveSection(currentSection)
      updateBorderPosition(currentSection, currentOffset)
    }

    const updateBorderPosition = (sectionId: string, offset: number) => {
      // Calculate border position and height
      if (sectionId && asideRef.current) {
        const activeLink = asideRef.current.querySelector(
          `a[href*="${sectionId}"]`
        ) as HTMLElement
        if (activeLink) {
          const linkRect = activeLink.getBoundingClientRect()
          const asideRect = asideRef.current.getBoundingClientRect()

          // Calculate position relative to aside
          const linkTop = linkRect.top - asideRect.top - 72
          const linkHeight = linkRect.height

          setBorderTop(8)
          setBorderHeight(linkTop + linkHeight + offset)
        }
      }
    }

    const handleResize = () => {
      // Recalculate border position on resize
      if (activeSection) {
        const matchingLink = asideRef.current?.querySelector(
          `a[href*="${activeSection}"]`
        )
        if (matchingLink) {
          const href = matchingLink.getAttribute('href')
          const offsetMatch = href ? href.match(/:(\d+)$/) : null
          const currentOffset =
            offsetMatch && offsetMatch[1] ? parseInt(offsetMatch[1]) : 0
          updateBorderPosition(activeSection, currentOffset)
        }
      }
    }

    // Initial call
    handleScroll()

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [activeSection])

  const renderTocItem = (item: TableOfContentsItem) => (
    <li key={item.id}>
      <Link
        className={cn(
          'hover:opacity-100 opacity-60 hover:underline underline-offset-4',
          activeSection === item.id && 'text-primary opacity-100'
        )}
        href={`#${item.id}:${item.offset || 72}`}
      >
        {item.title}
      </Link>
      {item.children && item.children.length > 0 && (
        <ul className="pl-4 pt-2 space-y-2">
          {item.children.map(renderTocItem)}
        </ul>
      )}
    </li>
  )

  return (
    <div className={className}>
      <Header title={title} />
      <main className="grid gap-8 xl:grid-cols-[1fr_322px] py-4">
        <div className="container ml-0 prose pb-6 grid grid-cols-1">
          {prependComponent}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '')
                const language = match ? match[1] : undefined
                const code = String(children).replace(/\n$/, '')

                // Check if this is an inline code or code block
                const isInline = !className?.includes('language-')

                return !isInline ? (
                  <Code language={language}>{code}</Code>
                ) : (
                  <code className="prose-code" {...props}>
                    {children}
                  </code>
                )
              },
              h1: ({ children, ...props }) => {
                const text = String(children)
                const id = generateSlug(text)
                return (
                  <h1 id={id} {...props}>
                    {children}
                  </h1>
                )
              },
              h2: ({ children, ...props }) => {
                const text = String(children)
                const id = generateSlug(text)
                return (
                  <h2 id={id} {...props}>
                    {children}
                  </h2>
                )
              },
              h3: ({ children, ...props }) => {
                const text = String(children)
                const id = generateSlug(text)
                return (
                  <h3 id={id} {...props}>
                    {children}
                  </h3>
                )
              },
              h4: ({ children, ...props }) => {
                const text = String(children)
                const id = generateSlug(text)
                return (
                  <h4 id={id} {...props}>
                    {children}
                  </h4>
                )
              },
              h5: ({ children, ...props }) => {
                const text = String(children)
                const id = generateSlug(text)
                return (
                  <h5 id={id} {...props}>
                    {children}
                  </h5>
                )
              },
              h6: ({ children, ...props }) => {
                const text = String(children)
                const id = generateSlug(text)
                return (
                  <h6 id={id} {...props}>
                    {children}
                  </h6>
                )
              }
            }}
          >
            {content}
          </ReactMarkdown>
          <p className="text-sm text-base-content/60 border-t border-base-content/10 pt-6 mt-12">
            Last modified:{' '}
            {lastModified || new Date().toISOString().split('T')[0]}
          </p>
        </div>
        {finalToc.length > 0 && (
          <div className="xl:block hidden">
            <div className="sticky top-18">
              <aside
                ref={asideRef}
                className="container ml-0 text-sm space-y-2 relative border-l border-base-content/10"
              >
                {/* Animated border indicator */}
                <div
                  className="absolute -left-[1.5px] w-[2px] bg-primary transition-all duration-300 ease-in-out"
                  style={{
                    top: `${borderTop}px`,
                    height: `${borderHeight}px`,
                    opacity: activeSection ? 0.5 : 0
                  }}
                />
                <ul className="pl-4 py-4 space-y-2">
                  {finalToc.map(renderTocItem)}
                </ul>
              </aside>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
