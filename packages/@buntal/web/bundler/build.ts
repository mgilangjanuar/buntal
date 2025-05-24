export async function bundler() {
  const hydrationScript = `/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { hydrateRoot } from 'react-dom/client'
import manifest from './routes.manifest.json'

hydrateRoot(document, <>{JSON.stringify(manifest)}</>)`

  await Bun.write('.buntal/_entrypoint.tsx', hydrationScript)
  await Bun.build({
    entrypoints: ['.buntal/_entrypoint.tsx'],
    outdir: '.buntal/dist',
    target: 'browser',
    splitting: true,
    minify: {
      identifiers: true,
      syntax: true,
      whitespace: true,
    }
  })
}
