import { Link, Meta, type MetaProps } from 'buntal-react'

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
    </head>
    <body>
      <p>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/nested">Nested</Link>
        <Link href="/rsc">rsc</Link>
        <Link href="/hello/gilang?test=122">Gilang</Link>
      </p>
      {children}
    </body>
  </html>
}
