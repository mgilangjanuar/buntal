import type { RouteBuilderResult } from '../server/router'
import { buildFavicon } from './builder/favicon'
import { buildHotReloadScript } from './builder/hot-reload'
import { buildRoot } from './builder/root'

export async function bundler(routes: RouteBuilderResult[]) {
  await buildRoot(routes)
  await buildFavicon()
  await buildHotReloadScript()
}
