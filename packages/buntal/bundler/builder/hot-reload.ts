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
  };  const performHotReload = async () => {
    try {
      // Advanced scroll position preservation setup
      const scrollState = {
        x: window.scrollX,
        y: window.scrollY,
        savedAt: Date.now()
      };

      // Store additional state
      const activeElement = document.activeElement;
      const activeElementSelector = activeElement && activeElement.id ? \`#\${activeElement.id}\` : null;

      // Prevent automatic scroll restoration
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // Get current script info
      const currentScript = document.querySelector('script[src*="/root.js"]');
      const currentUrl = currentScript?.src;

      // Fetch new content from server
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

      // Check if script changed
      if (currentUrl === newUrl && currentUrl) {
        return;
      }

      // Find the React root container (typically the main content area, not body)
      const reactRoot = document.querySelector('[data-reactroot], #root, main, [role="main"]') || document.body.children[0];

      if (!reactRoot) {
        throw new Error('Could not find React root container');
      }

      // Create temporary container to parse new content
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = newDoc.body.innerHTML;
      const newReactRoot = tempContainer.querySelector('[data-reactroot], #root, main, [role="main"]') || tempContainer.children[0];

      if (!newReactRoot) {
        throw new Error('Could not find new React root in updated content');
      }

      // Temporarily disable smooth scrolling
      document.documentElement.style.scrollBehavior = 'auto';

      // Create scroll anchor element at current position
      const scrollAnchor = document.createElement('div');
      scrollAnchor.style.cssText = \`
        position: absolute;
        top: \${scrollState.y}px;
        left: \${scrollState.x}px;
        width: 1px;
        height: 1px;
        z-index: -1;
        pointer-events: none;
      \`;
      scrollAnchor.setAttribute('data-scroll-anchor', 'true');
      document.body.appendChild(scrollAnchor);

      // Perform DOM update with continuous scroll preservation
      await updateDOMNodeSelectively(reactRoot, newReactRoot, scrollState);
    } catch (error) {
      // Silent failure - optionally could reload the page
      // setTimeout(() => location.reload(), 1000);
    }
  };

  // More selective DOM diffing function that preserves scroll position
  const updateDOMNodeSelectively = async (currentNode, newNode, scrollState) => {
    // Skip scroll-affecting elements
    if (currentNode === document.documentElement ||
        currentNode === document.body ||
        currentNode.hasAttribute && currentNode.hasAttribute('data-scroll-anchor')) {
      return;
    }

    // Preserve scroll position during updates
    const preserveScroll = () => {        setTimeout(() => {
          if (scrollState && (window.scrollY !== scrollState.y || window.scrollX !== scrollState.x)) {
            window.scrollTo(scrollState.x, scrollState.y);
          }
        }, 10);
    };

    // Handle text nodes
    if (currentNode.nodeType === Node.TEXT_NODE && newNode.nodeType === Node.TEXT_NODE) {
      if (currentNode.textContent !== newNode.textContent) {
        currentNode.textContent = newNode.textContent;
        // Preserve scroll after text change
        preserveScroll();
      }
      return;
    }

    // Handle element nodes
    if (currentNode.nodeType === Node.ELEMENT_NODE && newNode.nodeType === Node.ELEMENT_NODE) {
      // Skip if tags don't match - this prevents major structural changes
      if (currentNode.tagName !== newNode.tagName) {
        return;
      }

      // Update attributes only if they're different
      const currentAttrs = currentNode.attributes;
      const newAttrs = newNode.attributes;

      // Check if attributes actually changed before updating
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
        // Remove old attributes
        for (let i = currentAttrs.length - 1; i >= 0; i--) {
          const attr = currentAttrs[i];
          if (!newNode.hasAttribute(attr.name)) {
            currentNode.removeAttribute(attr.name);
          }
        }

        // Add/update new attributes
        for (let i = 0; i < newAttrs.length; i++) {
          const attr = newAttrs[i];
          if (currentNode.getAttribute(attr.name) !== attr.value) {
            currentNode.setAttribute(attr.name, attr.value);
          }
        }

        // Preserve scroll after attribute changes
        preserveScroll();
      }

      // Handle form elements specially to preserve user input
      if (currentNode.tagName === 'INPUT' || currentNode.tagName === 'TEXTAREA' || currentNode.tagName === 'SELECT') {
        // Only update if the user hasn't modified the value
        const currentValue = currentNode.value;
        const newValue = newNode.value;
        const isUserModified = currentNode.hasAttribute('data-user-modified');

        if (!isUserModified && currentValue !== newValue) {
          currentNode.value = newValue;
        }

        // Mark as user modified if user has interacted with it
        if (!isUserModified) {
          currentNode.addEventListener('input', () => {
            currentNode.setAttribute('data-user-modified', 'true');
          }, { once: true });
        }
      }

      // Recursively update children with better diffing
      const currentChildren = Array.from(currentNode.childNodes);
      const newChildren = Array.from(newNode.childNodes);

      // Process children in batches to prevent long blocking operations
      const batchSize = 5;
      for (let batchStart = 0; batchStart < Math.max(currentChildren.length, newChildren.length); batchStart += batchSize) {
        const batchEnd = Math.min(batchStart + batchSize, Math.max(currentChildren.length, newChildren.length));

        // Process batch
        for (let i = batchStart; i < batchEnd; i++) {
          const currentChild = currentChildren[i];
          const newChild = newChildren[i];

          if (!currentChild && newChild) {
            // Add new child
            currentNode.appendChild(newChild.cloneNode(true));
            preserveScroll();
          } else if (currentChild && !newChild) {
            // Remove old child (but not if it contains the scroll anchor)
            if (!currentChild.contains ||
                (currentChild.nodeType !== Node.ELEMENT_NODE || !(currentChild).hasAttribute('data-scroll-anchor'))) {
              currentChild.remove();
              preserveScroll();
            }
          } else if (currentChild && newChild) {
            // Check if nodes are similar enough to update instead of replace
            const shouldUpdate = (
              currentChild.nodeType === newChild.nodeType &&
              (currentChild.nodeType === Node.TEXT_NODE ||
               (currentChild.tagName === newChild.tagName &&
                (currentChild.nodeType !== Node.ELEMENT_NODE || !(currentChild).hasAttribute('data-scroll-anchor'))))
            );

            if (shouldUpdate) {
              await updateDOMNodeSelectively(currentChild, newChild, scrollState);
            } else if (!currentChild.contains ||
                      (currentChild.nodeType !== Node.ELEMENT_NODE || !(currentChild).hasAttribute('data-scroll-anchor'))) {
              // Replace with new node only if it doesn't contain our scroll anchor
              currentNode.replaceChild(newChild.cloneNode(true), currentChild);
              preserveScroll();
            }
          }
        }

        // Yield control back to browser between batches for smoother updates
        if (batchEnd < Math.max(currentChildren.length, newChildren.length)) {
          await new Promise(resolve => setTimeout(resolve, 0));
          preserveScroll();
        }
      }
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
        setTimeout(() => {
          connectWebSocket();
        }, reconnectInterval);
      }
    };

    reconnect();
  };

  connectWebSocket();
})();`
    )
  }
}
