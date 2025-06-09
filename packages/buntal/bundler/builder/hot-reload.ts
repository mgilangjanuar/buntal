export async function buildHotReloadScript(
  env: 'development' | 'production' = 'development',
  outDir: string = '.buntal'
) {
  if (env === 'development') {
    await Bun.write(
      `${outDir}/dist/hot-reload.js`,
      `(() => {
  const n = "ws://localhost:${process.env.PORT || 3000}";
  let r = null;
  let isInitialLoad = true;

  const connectWebSocket = () => {
    r = new WebSocket(n);

    r.addEventListener("open", () => {
      if (!isInitialLoad) {
        performHotReload();
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

  const performHotReload = async () => {
    try {
      // Add visual feedback for hot reload
      const reloadIndicator = document.createElement('div');
      reloadIndicator.style.cssText = \`
        position: fixed;
        top: 16px;
        right: 16px;
        background: #10b981;
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-family: system-ui, sans-serif;
        font-size: 14px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
      \`;
      reloadIndicator.textContent = '🔄 Reloading...';
      document.body.appendChild(reloadIndicator);

      // Get current script version
      const currentScript = document.querySelector('script[src*="/root.js"]');
      const currentUrl = currentScript ? currentScript.src : null;

      // Fetch the latest page to get new script URL
      const response = await fetch(window.location.href, {
        cache: 'no-cache',
        headers: { 'Cache-Control': 'no-cache' }
      });

      if (!response.ok) {
        throw new Error(\`Failed to fetch: \${response.status}\`);
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newScript = doc.querySelector('script[src*="/root.js"]');
      const newUrl = newScript ? newScript.src : null;

      reloadIndicator.textContent = '✨ Updating modules...';
      reloadIndicator.style.background = '#3b82f6';

      // Clean up existing modules and create new script
      const existingScripts = document.querySelectorAll('script[src*="/root.js"]');
      existingScripts.forEach(script => script.remove());

      // Small delay for cleanup
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create new script element
      const newScriptElement = document.createElement('script');
      newScriptElement.type = 'module';
      newScriptElement.src = newUrl || \`/root.js?t=\${Date.now()}\`;

      // Handle successful reload
      newScriptElement.onload = () => {
        reloadIndicator.textContent = '✅ Updated!';
        reloadIndicator.style.background = '#10b981';
        setTimeout(() => {
          if (reloadIndicator.parentNode) {
            reloadIndicator.remove();
          }
        }, 2000);
        console.log('🔥 Hot reload: Application updated successfully');
      };

      // Handle reload failure
      newScriptElement.onerror = () => {
        reloadIndicator.textContent = '❌ Failed - refreshing page';
        reloadIndicator.style.background = '#ef4444';
        setTimeout(() => {
          location.reload();
        }, 1000);
      };

      // Append the new script
      document.head.appendChild(newScriptElement);
    } catch (error) {
      console.warn('❌ Hot reload failed, falling back to page reload:', error);
      location.reload();
    }
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
