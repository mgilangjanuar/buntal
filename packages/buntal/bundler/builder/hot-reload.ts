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

  const performHotReload = async () => {
    try {
      // Save current scroll position
      const scrollState = {
        x: window.scrollX,
        y: window.scrollY
      };

      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // Find the current root.js script
      const currentScript = document.querySelector('script[src*="/root.js"]');
      if (!currentScript) return;

      const currentUrl = currentScript.src;

      // Fetch the latest HTML to get the new script URL
      const response = await fetch(window.location.href, {
        cache: 'no-cache',
        headers: { 'Cache-Control': 'no-cache, must-revalidate' }
      });

      if (!response.ok) return;

      const newHtml = await response.text();
      const parser = new DOMParser();
      const newDoc = parser.parseFromString(newHtml, 'text/html');
      const newScript = newDoc.querySelector('script[src*="/root.js"]');

      if (!newScript) return;

      const newUrl = newScript.src;

      // Only reload if the script URL has changed (indicating new build)
      if (currentUrl === newUrl) {
        return;
      }

      // Store form values before reload
      const formData = new Map();
      document.querySelectorAll('input, textarea, select').forEach(element => {
        if (element.name || element.id) {
          const key = element.name || element.id;
          if (element.type === 'checkbox' || element.type === 'radio') {
            formData.set(key, element.checked);
          } else {
            formData.set(key, element.value);
          }
        }
      });

      // Create new script element
      const newScriptElement = document.createElement('script');
      newScriptElement.src = newUrl;
      newScriptElement.type = 'module';

      // Remove old script and add new one
      currentScript.remove();

      // Wait a bit to ensure old script is cleaned up
      await new Promise(resolve => setTimeout(resolve, 50));

      document.head.appendChild(newScriptElement);

      // Restore scroll position and form values after script loads
      newScriptElement.onload = () => {
        setTimeout(() => {
          // Restore scroll position
          window.scrollTo(scrollState.x, scrollState.y);

          // Restore form values
          formData.forEach((value, key) => {
            const element = document.querySelector('[name="' + key + '"], #' + key);
            if (element) {
              if (element.type === 'checkbox' || element.type === 'radio') {
                element.checked = value;
              } else {
                element.value = value;
              }
            }
          });
        }, 200);
      };

    } catch (error) {
      // Silent failure - fallback to full page reload
      console.warn('Hot reload failed, falling back to page reload');
      window.location.reload();
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

  connectWebSocket();
})();`
    )
  }
}
