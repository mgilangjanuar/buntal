import MarkdownContent from './markdown-content'

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

type Example = {
  title: string
  code: string
}

type ReferencePageProps = {
  title: string
  description: string
  sourceUrl: string
  typeDefinition: string
  parameters?: Parameter[]
  methods?: Method[]
  properties?: Parameter[]
  examples?: (string | Example)[]
}

export default function ReferencePage({
  title,
  description,
  sourceUrl,
  typeDefinition,
  parameters,
  methods,
  properties,
  examples
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

${
  examples && examples.length > 0
    ? `
## Examples

${examples
  .map((example, index) => {
    if (typeof example === 'string') {
      return `
### Example ${index + 1}

\`\`\`typescript
${example}
\`\`\`
`
    } else {
      return `
### ${example.title}

\`\`\`typescript
${example.code}
\`\`\`
`
    }
  })
  .join('')}
`
    : ''
}
`

  return <MarkdownContent title={title} content={content} />
}
