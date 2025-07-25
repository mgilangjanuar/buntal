import { ThemeProvider } from '@/hooks/use-theme'
import { SearchProvider } from '@/hooks/use-search'
import { SearchDialogWrapper } from '@/components/search/search-dialog'
import { Meta, type MetaProps } from 'buntal'

export default function RootLayout({
  children,
  data
}: Readonly<{
  children: React.ReactNode
  data?: {
    _meta: MetaProps
  }
}>) {
  return (
    <html lang="en">
      <head>
        <Meta
          {...{
            title: 'Buntal JS',
            description:
              'Ultra-lightweight type-safe modern full-stack web framework with TypeScript, React and Bun. Create HTTP servers and/or web apps without unnecessary bloatware.',
            ...(data?._meta || {})
          }}
        />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/globals.css?v=1.17" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen w-full" style={{ visibility: 'hidden' }}>
        <ThemeProvider>
          <SearchProvider>
            {children}
            <SearchDialogWrapper />
          </SearchProvider>
        </ThemeProvider>
        <script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="1502"
          defer
        ></script>
      </body>
    </html>
  )
}
