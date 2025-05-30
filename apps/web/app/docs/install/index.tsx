import Header from '@/components/header'
import { useTheme } from '@/hooks/use-theme'
import { Link, type MetaProps } from 'buntal'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {
  atomOneDark,
  atomOneLight
} from 'react-syntax-highlighter/dist/esm/styles/hljs'

export const $ = {
  _meta: {
    title: 'Installation - Buntal JS'
  } satisfies MetaProps
}

export default function InstallPage() {
  const { theme } = useTheme()

  return (
    <div>
      <Header title="Installation" />
      <main className="grid gap-8 xl:grid-cols-[1fr_322px] py-4">
        <div className="container ml-0 prose pb-6 grid grid-cols-1">
          <section id="prerequisite">
            <h2 className="mt-0">Prerequisite</h2>
            <p>
              Before you start using Buntal JS, ensure you have the following
              prerequisites installed on your system:
            </p>
            <ul>
              <li>
                <strong>Bun</strong> ^1.2.14 - Buntal JS is built on top of the
                Bun runtime and API, so you need to have it installed. You can
                download it from the{' '}
                <a href="https://bun.sh" className="underline-offset-4">
                  Bun website
                </a>
                .
              </li>
            </ul>
          </section>
          <section id="installation">
            <h2>Installation</h2>
            <ul>
              <li>
                <p>
                  If you want to build an HTTP server, you only need to install
                  the <code>@buntal/core</code> package:
                </p>
                <SyntaxHighlighter
                  language="sh"
                  style={theme === 'dark' ? atomOneDark : atomOneLight}
                  customStyle={{ padding: '12px 16px' }}
                >
                  {'bun add @buntal/core'}
                </SyntaxHighlighter>
                <p>
                  Then, you can continue{' '}
                  <Link
                    href="/docs/packages/http-server"
                    className="underline-offset-4"
                  >
                    here
                  </Link>
                  .
                </p>
              </li>
              <li>
                <p>
                  If you want to build a full-stack web application, you can
                  create it from a template:
                </p>
                <SyntaxHighlighter
                  language="sh"
                  style={theme === 'dark' ? atomOneDark : atomOneLight}
                  customStyle={{ padding: '12px 16px' }}
                >
                  {'bun create buntal@latest my-app'}
                </SyntaxHighlighter>
                <p>
                  Change <code>my-app</code> to your desired project name. It
                  will initialize your project and install all the necessary
                  dependencies. The output will look something like this:
                </p>
                <SyntaxHighlighter
                  language="sh"
                  style={theme === 'dark' ? atomOneDark : atomOneLight}
                  customStyle={{ padding: '12px 16px' }}
                >
                  {`bun install v1.2.14 (6a363a38)
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
To get started, run: \`cd my-app && bun dev\``}
                </SyntaxHighlighter>
                <p>
                  Then, you can read more about it{' '}
                  <Link
                    href="/docs/packages/full-stack-web"
                    className="underline-offset-4"
                  >
                    here
                  </Link>
                  .
                </p>
              </li>
            </ul>
          </section>
          <p className="text-sm text-base-content/60 border-t border-base-content/10 pt-6 mt-12">
            Last modified: 2025-05-29
          </p>
        </div>
        <div className="xl:block hidden">
          <aside className="sticky top-18 container ml-0 text-base-content/60 text-sm space-y-3">
            <p className="font-semibold">On this page</p>
            <ul className="pl-4 space-y-2">
              <li>
                <Link
                  className="hover:text-base-content hover:underline underline-offset-4"
                  href="#prerequisite:72"
                >
                  Prerequisite
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-base-content hover:underline underline-offset-4"
                  href="#installation:24"
                >
                  Installation
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </div>
  )
}
