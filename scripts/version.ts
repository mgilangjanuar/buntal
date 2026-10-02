import { INTERNAL, PACKAGES, SEMVER } from './packages'

const version = process.argv[2]?.replace(/^v/, '')
if (!version || !SEMVER.test(version)) {
  console.error('Usage: bun run release:version <x.y.z>')
  process.exit(1)
}

for (const dir of PACKAGES) {
  const file = Bun.file(`${dir}/package.json`)
  let text = await file.text()
  text = text.replace(/"version": "[^"]+"/, `"version": "${version}"`)
  for (const name of INTERNAL) {
    text = text.replace(
      new RegExp(`("${name.replace('/', '\\/')}": )"\\^?[0-9][^"]*"`),
      `$1"^${version}"`
    )
  }
  await Bun.write(file, text)
  console.log(`${dir} -> ${version}`)
}

await Bun.write(
  'apps/web/lib/version.ts',
  `export const VERSION = 'v${version}'\n`
)
console.log(`apps/web/lib/version.ts -> v${version}`)

console.log(
  `\nNext: open a PR, merge it, then tag main:\n  git tag v${version} && git push origin v${version}`
)
