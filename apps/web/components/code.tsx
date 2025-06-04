import { useTheme } from '@/hooks/use-theme'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {
  atomOneDark,
  atomOneLight
} from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function Code({
  language,
  children
}: {
  language?: string
  children: string
}) {
  const { theme } = useTheme()

  return (
    <SyntaxHighlighter
      language={language}
      style={theme === 'dark' ? atomOneDark : atomOneLight}
      customStyle={{ padding: '12px 16px' }}
    >
      {children.trim()}
    </SyntaxHighlighter>
  )
}
