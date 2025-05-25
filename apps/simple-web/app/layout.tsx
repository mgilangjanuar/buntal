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
       <link href="/dist/globals.css" rel="stylesheet"></link>
    </head>
    <body>
      {children}
    </body>
  </html>
}
