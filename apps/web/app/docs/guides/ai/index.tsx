import MarkdownContent from '@/components/docs/markdown-content'
import { buildPrompt, USE_CASES } from '@/lib/ai-prompts'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Build with AI - Buntal JS',
    description:
      'Copy-ready prompts and llms.txt so AI coding agents build correct Buntal apps.'
  } satisfies MetaProps
}

const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const prompts = USE_CASES.map(
  (u) => `### ${u.title}

${u.summary}

\`\`\`text
${buildPrompt(u)}
\`\`\``
).join('\n\n')

export default function AiGuidePage() {
  return (
    <MarkdownContent
      title="Build with AI"
      content={`## Give your agent the docs

AI coding agents know Next.js far better than Buntal, so left alone they tend to write \`next/link\` imports or \`getServerSideProps\`. Point them at the Buntal docs written for machines:

- [/llms.txt](/llms.txt): a short index of every docs and reference page, following the [llms.txt](https://llmstxt.org) convention.
- [/llms-full.txt](/llms-full.txt): the whole API, rules, recipes and common mistakes in one file. This is the one to paste or attach when the agent cannot browse.

Most agents accept a URL directly:

\`\`\`text
Read https://buntaljs.org/llms-full.txt and follow it for everything in this project.
\`\`\`

For agents with a project rules file (\`CLAUDE.md\`, \`AGENTS.md\`, \`.cursor/rules\`, \`.github/copilot-instructions.md\`), add a line so every session starts with the right context:

\`\`\`md
This project uses Buntal JS (not Next.js). Follow https://buntaljs.org/llms-full.txt.
Run \`bunx tsc --noEmit\` and \`bun test\` before finishing a task.
\`\`\`

## Prompts

Each prompt below is a complete brief: scaffolding, Buntal rules, the features to build and a quality bar (types, accessibility, server-side validation). Copy one, change the details, and paste it into your agent. The same prompts are on the [home page](/#build-with-ai) with a one-click copy button.

${prompts}

## Tips

- **Work in steps.** Ask the agent to scaffold, run \`bun dev\`, and check each page before adding the next feature.
- **Keep secrets on the server.** Data access belongs in \`$\` loaders and API routes. Only \`BUNTAL_PUBLIC_*\` variables reach the browser.
- **Review security-sensitive code.** Login, payments and file access deserve a human read. The [Security guide](/docs/guides/security) lists what to look for.
- **Share the rules.** [Best Practices](/docs/best-practice) covers SEO, performance and accessibility; agents already get it through \`/llms-full.txt\`.
- **Ask for tests.** \`bun test\` can start a Buntal server on port 0, so API tests are fast and need no setup.`}
      tableOfContents={[
        {
          id: 'give-your-agent-the-docs',
          title: 'Give your agent the docs',
          level: 1,
          offset: 72
        },
        {
          id: 'prompts',
          title: 'Prompts',
          level: 1,
          offset: 72,
          children: USE_CASES.map((u) => ({
            id: slug(u.title),
            title: u.title,
            level: 2,
            offset: 72
          }))
        },
        {
          id: 'tips',
          title: 'Tips',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2026-10-02"
    />
  )
}
