import { compile } from '@mdx-js/mdx'
import path from 'path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

async function renderMDXToStaticMarkup(path: string) {
  const mdxContent = await Bun.file(path).text()

  const blob = await compile(mdxContent, {
    outputFormat: 'program'
  }).then((code) => {
    return new Blob([code.value], { type: 'application/javascript' })
  })
  const url = URL.createObjectURL(blob)
  try {
    const component = await import(url)
    return renderToStaticMarkup(React.createElement(component.default))
  } finally {
    URL.revokeObjectURL(url)
  }
}

export function mdx(filePath: string) {
  return renderMDXToStaticMarkup(path.join(process.cwd(), filePath))
}
