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
      // Show subtle loading indicator
      const indicator = document.createElement('div');
      indicator.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(59, 130, 246, 0.9);
        color: white;
        padding: 6px 12px;
        border-radius: 6px;
        font-family: system-ui, sans-serif;
        font-size: 12px;
        z-index: 10000;
        backdrop-filter: blur(8px);
        transition: all 0.2s ease;
        pointer-events: none;
      \`;
      indicator.textContent = '🔄 Checking for updates...';
      document.body.appendChild(indicator);

      // Get current script info
      const currentScript = document.querySelector('script[src*="/root.js"]');
      const currentUrl = currentScript?.src;

      // Check for updates by fetching latest build info
      const response = await fetch(window.location.href, {
        cache: 'no-cache',
        headers: { 'Cache-Control': 'no-cache, must-revalidate' }
      });

      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);

      const newHtml = await response.text();
      const parser = new DOMParser();
      const newDoc = parser.parseFromString(newHtml, 'text/html');
      const newScript = newDoc.querySelector('script[src*="/root.js"]');
      const newUrl = newScript?.src;

      // Compare URLs to detect changes
      if (currentUrl === newUrl && currentUrl) {
        // No changes
        indicator.textContent = '✅ Up to date';
        indicator.style.background = 'rgba(16, 185, 129, 0.9)';
        setTimeout(() => indicator.remove(), 1500);
        return;
      }

      // Changes detected - perform smooth update
      indicator.textContent = '⚡ Updating...';
      indicator.style.background = 'rgba(245, 158, 11, 0.9)';

      // Store current scroll position and form data
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const formData = new FormData();
      document.querySelectorAll('input, textarea, select').forEach(el => {
        if (el.id || el.name) {
          const key = el.id || el.name;
          const value = el.type === 'checkbox' ? el.checked : el.value;
          formData.append(key, value);
        }
      });

      // Store current router state
      const currentPath = window.location.pathname;

      // Create module update function
      const updateModule = () => {
        return new Promise((resolve, reject) => {
          // Remove old script
          const oldScripts = document.querySelectorAll('script[src*="/root.js"]');
          oldScripts.forEach(script => script.remove());

          // Load new script
          const script = document.createElement('script');
          script.type = 'module';
          script.src = newUrl || \`/root.js?t=\${Date.now()}\`;

          script.onload = () => {
            // Restore scroll position
            setTimeout(() => {
              window.scrollTo(scrollX, scrollY);

              // Restore form values
              formData.forEach((value, key) => {
                const el = document.getElementById(key) || document.querySelector(\`[name="\${key}"]\`);
                if (el) {
                  if (el.type === 'checkbox') {
                    el.checked = value === 'true';
                  } else {
                    el.value = value;
                  }
                }
              });

              // Ensure we're on the same route
              if (window.location.pathname !== currentPath) {
                window.history.replaceState({}, '', currentPath);
              }
            }, 100);

            resolve();
          };

          script.onerror = reject;
          document.head.appendChild(script);
        });
      };

      await updateModule();

      // Success
      indicator.textContent = '✨ Updated!';
      indicator.style.background = 'rgba(16, 185, 129, 0.9)';
      setTimeout(() => indicator.remove(), 2000);

      console.log('🔥 Hot reload: Smooth update completed');
    } catch (error) {
      console.warn('❌ Hot reload failed:', error);
      // Show error briefly then fallback
      const errorIndicator = document.createElement('div');
      errorIndicator.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(239, 68, 68, 0.9);
        color: white;
        padding: 6px 12px;
        border-radius: 6px;
        font-family: system-ui, sans-serif;
        font-size: 12px;
        z-index: 10000;
        backdrop-filter: blur(8px);
      \`;
      errorIndicator.textContent = '❌ Update failed - refreshing...';
      document.body.appendChild(errorIndicator);

      setTimeout(() => location.reload(), 1000);
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
