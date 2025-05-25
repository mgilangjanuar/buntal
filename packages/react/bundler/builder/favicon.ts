import { $ } from 'bun'

export async function buildFavicon() {
  if (await Bun.file('app/favicon.ico').exists()) {
    await $`cp app/favicon.ico .buntal/dist/favicon.ico`
  }
}
