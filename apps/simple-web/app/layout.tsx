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
      <script async defer>
        {`(() => {
          const socketUrl = "ws://localhost:3000";
          let socket = new WebSocket(socketUrl);
          socket.addEventListener("close", () => {
            const interAttemptTimeoutMilliseconds = 100;
            const maxDisconnectedTimeMilliseconds = 3000;
            const maxAttempts = Math.round(
              maxDisconnectedTimeMilliseconds / interAttemptTimeoutMilliseconds,
            );
            let attempts = 0;
            const reloadIfCanConnect = () => {
              attempts++;
              if (attempts > maxAttempts) {
                console.error("Could not reconnect to dev server.");
                return;
              }
              socket = new WebSocket(socketUrl);
              socket.addEventListener("error", () => {
                setTimeout(reloadIfCanConnect, interAttemptTimeoutMilliseconds);
              });
              socket.addEventListener("open", () => {
                window.location.reload();
              });
            };
            reloadIfCanConnect();
          });
        })();`}
      </script>
    </body>
  </html>
}
