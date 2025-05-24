import { Head } from '@buntal/web/app'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html>
    <Head />
    <body>
      {children}
    </body>
  </html>
}
