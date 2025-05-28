export async function buildHotReloadScript(
  env: 'development' | 'production' = 'development',
  outDir: string = '.buntal'
) {
  if (env === 'development') {
    await Bun.write(
      `${outDir}/dist/%F0%9F%94%A5.js`,
      `(() => {
        const n = "ws://localhost:${process.env.PORT || 3000}";
        let r = null;
        let isInitialLoad = true;

        const connectWebSocket = () => {
          r = new WebSocket(n);

          r.addEventListener("open", () => {
            if (!isInitialLoad) {
              location.reload();
            }
            isInitialLoad = false;
          });

          r.addEventListener("close", () => {
            scheduleReconnect();
          });

          r.addEventListener("error", (error) => {
            r.close();
          });
        };

        const scheduleReconnect = () => {
          const reconnectInterval = 1000;
          let attempts = 0;
          const maxAttempts = Infinity;

          const reconnect = () => {
            if (attempts < maxAttempts) {
              attempts++;
              setTimeout(() => {
                connectWebSocket();
              }, reconnectInterval);
            } else {
              console.error("Max reconnect attempts reached. Stopping reconnection.");
            }
          };

          reconnect();
        };
        connectWebSocket();
      })();`
    )
  }
}
