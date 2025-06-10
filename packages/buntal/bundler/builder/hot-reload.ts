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
      const scrollState = {
        x: window.scrollX,
        y: window.scrollY
      };

      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      const currentScript = document.querySelector('script[src*="/root.js"]');
      const currentUrl = currentScript?.src;

      const response = await fetch(window.location.href, {
        cache: 'no-cache',
        headers: { 'Cache-Control': 'no-cache, must-revalidate' }
      });

      if (!response.ok) return;

      const newHtml = await response.text();
      const parser = new DOMParser();
      const newDoc = parser.parseFromString(newHtml, 'text/html');
      const newScript = newDoc.querySelector('script[src*="/root.js"]');
      const newUrl = newScript?.src;

      if (currentUrl === newUrl && currentUrl) {
        return;
      }

      const reactRoot = document.querySelector('[data-reactroot], #root, main, [role="main"]') || document.body.children[0];
      if (!reactRoot) return;

      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = newDoc.body.innerHTML;
      const newReactRoot = tempContainer.querySelector('[data-reactroot], #root, main, [role="main"]') || tempContainer.children[0];
      if (!newReactRoot) return;

      document.documentElement.style.scrollBehavior = 'auto';

      await updateDOMNode(reactRoot, newReactRoot, scrollState);
    } catch (error) {
      // Silent failure
    }
  };

  const updateDOMNode = async (currentNode, newNode, scrollState) => {
    if (currentNode === document.documentElement || currentNode === document.body) {
      return;
    }

    const restoreScroll = () => {
      setTimeout(() => {
        if (scrollState && (window.scrollY !== scrollState.y || window.scrollX !== scrollState.x)) {
          window.scrollTo(scrollState.x, scrollState.y);
        }
      }, 10);
    };

    if (currentNode.nodeType === Node.TEXT_NODE && newNode.nodeType === Node.TEXT_NODE) {
      if (currentNode.textContent !== newNode.textContent) {
        currentNode.textContent = newNode.textContent;
        restoreScroll();
      }
      return;
    }

    if (currentNode.nodeType === Node.ELEMENT_NODE && newNode.nodeType === Node.ELEMENT_NODE) {
      if (currentNode.tagName !== newNode.tagName) {
        return;
      }

      const currentAttrs = currentNode.attributes;
      const newAttrs = newNode.attributes;

      let attributesChanged = false;
      if (currentAttrs.length !== newAttrs.length) {
        attributesChanged = true;
      } else {
        for (let i = 0; i < newAttrs.length; i++) {
          const attr = newAttrs[i];
          if (currentNode.getAttribute(attr.name) !== attr.value) {
            attributesChanged = true;
            break;
          }
        }
      }

      if (attributesChanged) {
        for (let i = currentAttrs.length - 1; i >= 0; i--) {
          const attr = currentAttrs[i];
          if (!newNode.hasAttribute(attr.name)) {
            currentNode.removeAttribute(attr.name);
          }
        }

        for (let i = 0; i < newAttrs.length; i++) {
          const attr = newAttrs[i];
          if (currentNode.getAttribute(attr.name) !== attr.value) {
            currentNode.setAttribute(attr.name, attr.value);
          }
        }
        restoreScroll();
      }

      if (currentNode.tagName === 'INPUT' || currentNode.tagName === 'TEXTAREA' || currentNode.tagName === 'SELECT') {
        const currentValue = currentNode.value;
        const newValue = newNode.value;
        const isUserModified = currentNode.hasAttribute('data-user-modified');

        if (!isUserModified && currentValue !== newValue) {
          currentNode.value = newValue;
        }

        if (!isUserModified) {
          currentNode.addEventListener('input', () => {
            currentNode.setAttribute('data-user-modified', 'true');
          }, { once: true });
        }
      }

      const currentChildren = Array.from(currentNode.childNodes);
      const newChildren = Array.from(newNode.childNodes);

      for (let i = 0; i < Math.max(currentChildren.length, newChildren.length); i++) {
        const currentChild = currentChildren[i];
        const newChild = newChildren[i];

        if (!currentChild && newChild) {
          currentNode.appendChild(newChild.cloneNode(true));
          restoreScroll();
        } else if (currentChild && !newChild) {
          currentChild.remove();
          restoreScroll();
        } else if (currentChild && newChild) {
          const shouldUpdate = (
            currentChild.nodeType === newChild.nodeType &&
            (currentChild.nodeType === Node.TEXT_NODE || currentChild.tagName === newChild.tagName)
          );

          if (shouldUpdate) {
            await updateDOMNode(currentChild, newChild, scrollState);
          } else {
            currentNode.replaceChild(newChild.cloneNode(true), currentChild);
            restoreScroll();
          }
        }
      }
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
