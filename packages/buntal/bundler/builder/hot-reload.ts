export async function buildHotReloadScript(
  env: 'development' | 'production' = 'development',
  outDir: string = '.buntal'
) {
  if (env === 'development') {
    await Bun.write(
      `${outDir}/dist/%F0%9F%94%A5.js`,
      `(()=>{const n="ws://localhost:${process.env.PORT || 3000}";let r=new WebSocket(n);r.addEventListener("close",()=>{const e=Math.round(30);let o=0;const t=()=>{++o>e?console.error("Could not reconnect to dev server."):((r=new WebSocket(n)).addEventListener("error",()=>{setTimeout(t,100)}),r.addEventListener("open",()=>{window.location.reload()}))};t()})})();`
    )
  }
}
