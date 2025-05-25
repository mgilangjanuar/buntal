import { Meta, type MetaProps } from 'buntal-react'

export default function RootLayout({ children, data }: Readonly<{
  children: React.ReactNode,
  data?: {
    _meta: MetaProps
  }
}>) {
  return <html>
    <head>
      <Meta
        {...data?._meta || {
          title: 'Buntal App',
          description: 'This is a simple Buntal application.',
        }}
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/globals.css" />
    </head>
    <body>
      {children}
      <script async defer src="/hmr.js"></script>
    </body>
  </html>
}
