import { compile } from '@mdx-js/mdx'
import { readFileSync } from 'fs'
import matter from 'gray-matter'
import type { ComponentType } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

interface MDXResult {
  component: ComponentType
  html: string
  metadata: Record<string, unknown>
}

async function renderMDXToStaticMarkup(filePath: string): Promise<MDXResult> {
  const fileContent = readFileSync(filePath, 'utf8')
  const { content, data } = matter(fileContent)

  const blob = await compile(content, {
    outputFormat: 'program',
    // Add JSX runtime for React 19
    jsxImportSource: 'react'
  }).then((code) => {
    return new Blob([code.value], { type: 'application/javascript' })
  })

  const url = URL.createObjectURL(blob)

  try {
    const component = await import(url)
    const ComponentType = component.default
    return {
      component: ComponentType,
      html: renderToStaticMarkup(<ComponentType />),
      metadata: data
    }
  } finally {
    URL.revokeObjectURL(url)
  }
}

// Runtime function for dynamic MDX loading
export async function loadMDX(filePath: string): Promise<MDXResult> {
  return renderMDXToStaticMarkup(filePath)
}

export function loadMetadata(filePath: string): Record<string, unknown> {
  const fileContent = readFileSync(filePath, 'utf8')
  return matter(fileContent).data
}
