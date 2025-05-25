export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html>
    <head>
      <title>Buntal React</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
      {children}
    </body>
  </html>
}
