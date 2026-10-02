import MarkdownContent from '@/components/docs/markdown-content'
import ReferencePage, {
  referenceMarkdown,
  type ReferencePageProps
} from '@/components/docs/reference-page'
import type { AtomicHandler } from '@buntal/http'
import { join, resolve } from 'path'
import type { ReactElement } from 'react'

const APP_DIR = resolve(import.meta.dir, '../app')
const MD_PATH = /^\/((?:docs|references)(?:\/[a-z0-9-]+)*)\.md$/

export function pageMarkdown(element: ReactElement): string | null {
  if (element.type === ReferencePage)
    return referenceMarkdown(element.props as ReferencePageProps)
  if (element.type === MarkdownContent) {
    const { title, content } = element.props as {
      title: string
      content: string
    }
    return `# ${title}\n\n${content}`
  }
  return null
}

export async function renderMarkdown(route: string): Promise<string | null> {
  const file = join(APP_DIR, route, 'index.tsx')
  if (!(await Bun.file(file).exists())) return null
  const { default: Page } = await import(file)
  const markdown = pageMarkdown(Page())
  return markdown && `${markdown.replace(/\n{3,}/g, '\n\n').trim()}\n`
}

export const markdownRoute = (): AtomicHandler => async (req) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return
  const route = MD_PATH.exec(new URL(req.url).pathname)?.[1]
  if (!route) return
  const markdown = await renderMarkdown(route)
  if (!markdown) return
  return new Response(req.method === 'HEAD' ? null : markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
  })
}
