import MarkdownContent, { type TableOfContentsItem } from './markdown-content'

type Parameter = {
  name: string
  type: string
  required: boolean
  default?: string
  description: string
}

type Method = {
  name: string
  parameters?: Parameter[]
  returns?: string
  description: string
}

type ReferencePageProps = {
  title: string
  description: string
  sourceUrl: string
  typeDefinition: string
  parameters?: Parameter[]
  methods?: Method[]
  properties?: Parameter[]
}

export default function ReferencePage({
  title,
  description,
  sourceUrl,
  typeDefinition,
  parameters,
  methods,
  properties
}: ReferencePageProps) {
  const content = `# ${title}

${description}

## Source

[View source on GitHub](${sourceUrl})

## Type Definition

\`\`\`typescript
${typeDefinition}
\`\`\`

${
  parameters && parameters.length > 0
    ? `
## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
${parameters.map((p) => `| \`${p.name}\` | \`${p.type}\` | ${p.required ? '✅' : '❌'} | ${p.default ? `\`${p.default}\`` : '-'} | ${p.description} |`).join('\n')}
`
    : ''
}

${
  properties && properties.length > 0
    ? `
## Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
${properties.map((p) => `| \`${p.name}\` | \`${p.type}\` | ${p.required ? '✅' : '❌'} | ${p.default ? `\`${p.default}\`` : '-'} | ${p.description} |`).join('\n')}
`
    : ''
}

${
  methods && methods.length > 0
    ? `
## Methods

${methods
  .map(
    (method) => `
### ${method.name}

${method.description}

${
  method.parameters && method.parameters.length > 0
    ? `
#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
${method.parameters.map((p) => `| \`${p.name}\` | \`${p.type}\` | ${p.required ? '✅' : '❌'} | ${p.default ? `\`${p.default}\`` : '-'} | ${p.description} |`).join('\n')}
`
    : ''
}

${
  method.returns
    ? `#### Returns

\`${method.returns}\`
`
    : ''
}
`
  )
  .join('')}
`
    : ''
}
`

  // Generate table of contents with only level 1 and level 2 headings
  const tableOfContents: TableOfContentsItem[] = []

  // Always include main sections
  tableOfContents.push({
    id: title.toLowerCase().replace(/\s+/g, '-'),
    title: title,
    level: 1,
    offset: 72
  })

  tableOfContents.push({
    id: 'source',
    title: 'Source',
    level: 2,
    offset: 72
  })

  tableOfContents.push({
    id: 'type-definition',
    title: 'Type Definition',
    level: 2,
    offset: 72
  })

  if (parameters && parameters.length > 0) {
    tableOfContents.push({
      id: 'parameters',
      title: 'Parameters',
      level: 2,
      offset: 72
    })
  }

  if (properties && properties.length > 0) {
    tableOfContents.push({
      id: 'properties',
      title: 'Properties',
      level: 2,
      offset: 72
    })
  }

  if (methods && methods.length > 0) {
    tableOfContents.push({
      id: 'methods',
      title: 'Methods',
      level: 2,
      offset: 72
    })
  }

  return (
    <MarkdownContent
      title={title}
      content={content}
      tableOfContents={tableOfContents}
    />
  )
}
