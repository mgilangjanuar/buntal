import { $ } from 'bun'

export async function buildFavicon(
  appDir: string = './app',
  outDir: string = '.buntal'
) {
  if (await Bun.file(appDir + '/favicon.ico').exists()) {
    await $`cp ${appDir}/favicon.ico ${outDir}/dist/favicon.ico`
  }

  if (await Bun.file(appDir + '/favicon.svg').exists()) {
    await $`cp ${appDir}/favicon.svg ${outDir}/dist/favicon.svg`
  }
}
