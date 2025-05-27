import { Meta, type MetaProps } from 'buntal'

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
      <link rel="icon" href="/favicon.svg" />
      <link rel="stylesheet" href="/globals.css" />
    </head>
    <body>
      {children}
    </body>
  </html>
}
