export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <script src="/root.js" type="module"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
