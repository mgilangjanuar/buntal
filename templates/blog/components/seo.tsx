import { absoluteUrl } from '@/lib/site'

export function Canonical({ path }: { path: string }) {
  return <link rel="canonical" href={absoluteUrl(path)} />
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c')
      }}
    />
  )
}

export function NoIndex() {
  return <meta name="robots" content="noindex" />
}
