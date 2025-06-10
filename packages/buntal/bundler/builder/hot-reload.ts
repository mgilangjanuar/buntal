export async function buildHotReloadScript(
  env: 'development' | 'production' = 'development',
  outDir: string = '.buntal'
) {
  if (env === 'development') {
    await Bun.write(
      `${outDir}/dist/hot-reload.js`,
      `(() => {
  const wsUrl = "ws://localhost:${process.env.PORT || 3000}";
  let ws = null;
  let isInitialLoad = true;

  const restoreScrollPosition = () => {
    try {
      const savedPosition = sessionStorage.getItem('buntal_scroll_position');
      if (savedPosition) {
        const { x, y } = JSON.parse(savedPosition);
        setTimeout(() => {
          window.scrollTo(x, y);
        }, 200)
        sessionStorage.removeItem('buntal_scroll_position');
      }
    } catch (error) {
      // Ignore errors in scroll restoration
    }
  };

  const connectWebSocket = () => {
    ws = new WebSocket(wsUrl);

    ws.addEventListener("open", () => {
      if (!isInitialLoad) {
        performHotReload();
      }
      isInitialLoad = false;
    });

    ws.addEventListener("close", () => {
      scheduleReconnect();
    });

    ws.addEventListener("error", () => {
      ws.close();
    });
  };

  const performHotReload = () => {
    try {
      // Save current scroll position to sessionStorage
      sessionStorage.setItem('buntal_scroll_position', JSON.stringify({
        x: window.scrollX,
        y: window.scrollY
      }));

      // Disable automatic scroll restoration
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // Reload the page
      location.reload();
    } catch (error) {
      console.warn('Hot reload failed, falling back to page reload');
      location.reload();
    }
  };

  const scheduleReconnect = () => {
    const reconnectInterval = 1000;
    const reconnect = () => {
      setTimeout(() => {
        connectWebSocket();
      }, reconnectInterval);
    };
    reconnect();
  };

  // Restore scroll position if this is a reload from hot reload
  restoreScrollPosition();

  connectWebSocket();
})();`
    )
  }
}
