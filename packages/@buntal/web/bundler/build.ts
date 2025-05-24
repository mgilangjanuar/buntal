export async function bundler() {
  await Bun.write('.buntal/app.tsx', await Bun.file(__dirname + '/templates/app.tsx.tmpl').text())

  const manifest = await Bun.file('.buntal/routes.manifest.json').json()
  const layouts: string[] = manifest.reduce((acc: string[], cur: { layoutsSafeImport: string[] }) => {
    for (const layout of cur.layoutsSafeImport) {
      if (!acc.includes(layout)) acc.push(layout)
    }
    return acc
  }, [])
  const entrypointScript = (
    await Bun.file(__dirname + '/templates/_entrypoint.tsx.tmpl').text()
  )
    .replace('<!--imports-->', manifest.map((r: { safeImport: string }, i: number) => `import Page${i} from '${r.safeImport}'`).join('\n') + '\n' + layouts.map((layout, i) => `import Layout${i} from '${layout}'`).join('\n'))
    .replace('<!--routes-->', '[' + manifest.map((r: { route: string, regex: string, layoutsSafeImport: string[] }, i: number) => `{ route: '${r.route}', regex: ${JSON.stringify(r.regex)}, layouts: [${r.layoutsSafeImport.map(layout => `Layout${layouts.findIndex(l => l === layout)}`).join(',')}], element: Page${i} }`).join(',') + ']')
  await Bun.write('.buntal/_entrypoint.tsx', entrypointScript)
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
