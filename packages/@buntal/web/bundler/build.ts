export async function bundler() {
  await Bun.write('.buntal/app.tsx', await Bun.file(__dirname + '/templates/app.tsx.tmpl').text())
  await Bun.write('.buntal/_entrypoint.tsx', await Bun.file(__dirname + '/templates/_entrypoint.tsx.tmpl').text())
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
