import { ThemeProvider } from '@/hooks/use-theme'
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
    <html>
      <head>
        <Meta
          {...(data?._meta || {
            title: 'Buntal JS',
            description:
              'Ultra-lightweight type-safe modern full-stack web framework with TypeScript, React and Bun. Create HTTP servers and/or web apps without unnecessary bloatware.'
          })}
        />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/globals.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider
          defaultTheme="light"
          themesMap={{ light: 'bumblebee', dark: 'halloween' }}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
