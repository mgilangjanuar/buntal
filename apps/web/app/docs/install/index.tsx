import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Installation - Buntal JS'
  } satisfies MetaProps
}

export default function InstallPage() {
  return (
    <MarkdownContent
      title="Installation"
      content={`## Prerequisite

Before you start using Buntal JS, ensure you have the following prerequisites installed on your system:

- **Bun** ^1.2.14 - Buntal JS is built on top of the Bun runtime and API, so you need to have it installed. You can download it from the [Bun website](https://bun.sh).

## Installation

- If you want to build an HTTP server, you only need to install the \`@buntal/core\` package:

  \`\`\`sh
  bun add @buntal/core
  \`\`\`

  Then, you can continue [here](/docs/packages/http-server).

- If you want to build a full-stack web application, you can create it from a template:

  \`\`\`sh
  bun create buntal@latest my-app
  \`\`\`

  Change \`my-app\` to your desired project name. It will initialize your project and install all the necessary dependencies. The output will look something like this:

  \`\`\`sh
  bun install v1.2.14 (6a363a38)
  Resolving dependencies
  Resolved, downloaded and extracted [103]
  Saved lockfile

  + typescript@5.8.3
  + @buntal/cli@0.0.2
  + @types/bun@1.2.14
  + @types/react@19.1.6
  + @types/react-dom@19.1.5
  + @tailwindcss/cli@4.1.8
  + buntal@0.0.4
  + clsx@2.1.1
  + react@19.1.0
  + react-dom@19.1.0
  + tailwind-merge@3.3.0
  + tailwindcss@4.1.8

  63 packages installed [2.88s]

  Blocked 2 postinstalls. Run \`bun pm untrusted\` for details.

  Done! 🔥
  To get started, run: \`cd my-app && bun dev\`
  \`\`\`

  Then, you can read more about it [here](/docs/packages/full-stack-web).
`}
      tableOfContents={[
        {
          id: 'prerequisite',
          title: 'Prerequisite',
          level: 1,
          offset: 72
        },
        {
          id: 'installation',
          title: 'Installation',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-05-29"
    />
  )
}
