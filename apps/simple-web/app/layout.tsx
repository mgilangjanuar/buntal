import { Meta } from 'buntal-react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html>
    <head>
      <Meta
        title="Buntal App"
        viewport="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no"
        description="This is a simple Buntal application."
      />
    </head>
    <body>
      {children}
    </body>
  </html>
}
