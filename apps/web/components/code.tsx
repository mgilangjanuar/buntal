import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'
import type { ClassValue } from 'clsx'
import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {
  atomOneDark,
  atomOneLight
} from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function Code({
  language,
  className,
  children
}: {
  language?: string
  className?: ClassValue
  children: string
}) {
  const { theme } = useTheme()
  const [copiedText, setCopiedText] = useState<string | null>(null)

  return (
    <div className={cn('relative my-4', className)}>
      <label className="swap border-none ring-0 btn btn-sm btn-square btn-ghost absolute top-2 right-2 opacity-70 hover:opacity-100 hover:bg-transparent">
        <input
          type="checkbox"
          checked={copiedText === children.trim()}
          onChange={({ target }) => {
            if (target.checked && children.trim() !== copiedText) {
              navigator.clipboard.writeText(children.trim())
              setCopiedText(children.trim())
              setTimeout(() => setCopiedText(null), 2000)
            }
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="!size-4 swap-on"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l5 5l10 -10" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="!size-4 swap-off"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
          <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
        </svg>
      </label>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? atomOneDark : atomOneLight}
        customStyle={{
          padding: '12px 48px 12px 16px',
          borderRadius: '6px',
          margin: 0
        }}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
