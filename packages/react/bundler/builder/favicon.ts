import { $ } from 'bun'

export async function buildFavicon(appDir: string = './app', outDir: string = '.buntal') {
  if (await Bun.file(appDir + '/favicon.ico').exists()) {
    await $`cp ${appDir}/favicon.ico ${outDir}/dist/favicon.ico`
  }
}
