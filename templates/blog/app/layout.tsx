import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { absoluteUrl, site } from '@/lib/site'
import { Meta, type MetaProps } from 'buntal'

export default function RootLayout({
  children,
  data
}: Readonly<{
  children: React.ReactNode
  data?: { _meta?: MetaProps }
}>) {
  return (
    <html lang="en">
      <head>
        <Meta
          title={site.name}
          description={site.description}
          author={site.author.name}
          og={{ site_name: site.name, type: 'website' }}
          twitter={{ card: 'summary' }}
          {...data?._meta}
        />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/globals.css" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={site.name}
          href={absoluteUrl('/rss.xml')}
        />
      </head>
      <body className="min-h-svh bg-white text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-zinc-950"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="container max-w-3xl pt-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
