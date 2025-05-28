import Header from '@/components/header'
import type { MetaProps } from 'buntal'

export const $ = () => ({
  _meta: {
    title: 'Docs - Buntal JS',
  } satisfies MetaProps
})

export default function DocsPage() {
  return (
    <div>
      <Header title="Get Started" />
      <main>
      </main>
    </div>
  )
}
