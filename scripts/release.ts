import { $ } from 'bun'
import { INTERNAL, PACKAGES, readManifest, SEMVER } from './packages'

const tag = process.env.RELEASE_TAG || process.argv[2] || ''
const dryRun = process.env.DRY_RUN === '1' || process.argv.includes('--dry-run')
const checkOnly = process.argv.includes('--check')
const version = tag.replace(/^v/, '')
const fail = (message: string) => {
  console.error(`release: ${message}`)
  process.exit(1)
}

if (!SEMVER.test(version)) fail(`"${tag}" is not a vX.Y.Z tag`)
const distTag = version.includes('-') ? 'next' : 'latest'

const manifests = await Promise.all(PACKAGES.map(readManifest))
for (const [i, pkg] of manifests.entries()) {
  if (pkg.version !== version) {
    fail(
      `${PACKAGES[i]} is ${pkg.version}, tag is ${tag}. Run \`bun run release:version ${version}\` and merge it first.`
    )
  }
  for (const [dep, range] of Object.entries(pkg.dependencies ?? {})) {
    if (INTERNAL.includes(dep) && range !== `^${version}`) {
      fail(`${pkg.name} depends on ${dep}@${range}, expected ^${version}`)
    }
  }
}

if (checkOnly) {
  console.log(`release: ${PACKAGES.length} packages at ${version} (${distTag})`)
  process.exit(0)
}

const published = async (name: string) => {
  const resp = await fetch(
    `https://registry.npmjs.org/${name.replace('/', '%2f')}/${version}`
  )
  return resp.ok
}

for (const [i, dir] of PACKAGES.entries()) {
  const { name } = manifests[i]!
  if (!dryRun && (await published(name))) {
    console.log(`skip ${name}@${version} (already published)`)
    continue
  }
  console.log(
    `publish ${name}@${version} --tag ${distTag}${dryRun ? ' (dry run)' : ''}`
  )
  const args = ['--access', 'public', '--tag', distTag]
  if (dryRun) args.push('--dry-run')
  await $`npm publish ${args}`.cwd(dir)
}
