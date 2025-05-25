import { Head } from 'buntal-react/components'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html>
    <Head />
    <body>
      {children}
    </body>
  </html>
}
