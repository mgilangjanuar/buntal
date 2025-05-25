import { Head, Script } from 'buntal-react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html>
    <Head />
    <body>
      {children}
    </body>
  </html>
}
