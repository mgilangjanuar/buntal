import { compile } from '@mdx-js/mdx'
import { readFileSync } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

interface MDXResult {
  component: React.ComponentType
  html: string
  frontmatter: Record<string, unknown>
}

async function renderMDXToStaticMarkup(filePath: string): Promise<MDXResult> {
  const fileContent = readFileSync(filePath, 'utf8')
  const { content: mdxContent, data: frontmatter } = matter(fileContent)

  const blob = await compile(mdxContent, {
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
      html: renderToStaticMarkup(React.createElement(ComponentType)),
      frontmatter
    }
  } finally {
    URL.revokeObjectURL(url)
  }
}

// Macro function for compile-time MDX loading
export function mdx(filePath: string) {
  return renderMDXToStaticMarkup(path.join(process.cwd(), filePath))
}

// Runtime function for dynamic MDX loading
export async function loadMDX(filePath: string): Promise<MDXResult> {
  return renderMDXToStaticMarkup(filePath)
}
