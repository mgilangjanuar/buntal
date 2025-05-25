export async function buildHotReloadScript(env: 'development' | 'production' = 'development', outDir: string = '.buntal') {
  if (env === 'production') {
    await Bun.write(`${outDir}/dist/%F0%9F%94%A5.js`, '')
    return
  }
  await Bun.write(`${outDir}/dist/%F0%9F%94%A5.js`, `(() => {
  const socketUrl = "ws://localhost:${process.env.PORT || 3000}";
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
})();`)
}
