import { $ } from 'bun'
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  renameSync,
  rmSync
} from 'fs'
import { tmpdir } from 'os'
import { join, resolve } from 'path'
import { chromium } from 'playwright'
import { SHOTS } from '../apps/web/lib/templates'

const root = resolve(import.meta.dir, '..')
const out = join(root, 'apps/web/public/templates')
const only = process.argv.slice(2)
const work = mkdtempSync(join(tmpdir(), 'buntal-shots-'))

const pack = async (dir: string) => {
  const before = new Set(
    await Array.fromAsync(new Bun.Glob('*.tgz').scan(work))
  )
  await $`bun pm pack --destination ${work}`.cwd(join(root, dir)).quiet()
  const file = (await Array.fromAsync(new Bun.Glob('*.tgz').scan(work))).find(
    (f) => !before.has(f)
  )
  if (!file) throw new Error(`could not pack ${dir}`)
  return `file:${join(work, file)}`
}

const local = {
  '@buntal/http': await pack('packages/@buntal/http'),
  buntal: await pack('packages/buntal'),
  '@buntal/cli': await pack('packages/@buntal/cli')
}

const waitFor = async (url: string) => {
  for (let i = 0; i < 60; i++) {
    if (
      await fetch(url).then(
        (r) => r.ok,
        () => false
      )
    )
      return
    await Bun.sleep(500)
  }
  throw new Error(`${url} did not start`)
}

mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
let port = 4400

try {
  for (const [template, pages] of Object.entries(SHOTS)) {
    if (only.length && !only.includes(template)) continue
    const dir = join(work, template)
    cpSync(join(root, 'templates', template), dir, {
      recursive: true,
      filter: (src) =>
        !/[\\/](node_modules|\.buntal|data)([\\/]|$)/.test(
          src.slice(root.length)
        )
    })
    if (existsSync(join(dir, '_gitignore')))
      renameSync(join(dir, '_gitignore'), join(dir, '.gitignore'))

    const pkg = await Bun.file(join(dir, 'package.json')).json()
    for (const field of ['dependencies', 'devDependencies'] as const) {
      for (const name of Object.keys(local) as (keyof typeof local)[]) {
        if (pkg[field]?.[name]) pkg[field][name] = local[name]
      }
    }
    pkg.overrides = { '@buntal/http': local['@buntal/http'] }
    await Bun.write(join(dir, 'package.json'), JSON.stringify(pkg, null, 2))

    console.log(`[${template}] install and build`)
    await $`bun install`.cwd(dir).quiet()
    if (pkg.scripts['db:migrate']) await $`bun run db:migrate`.cwd(dir).quiet()
    if (pkg.scripts['db:seed']) await $`bun run db:seed`.cwd(dir).quiet()
    await $`bun run build`.cwd(dir).quiet()

    const url = `http://localhost:${++port}`
    const server = Bun.spawn(['bun', 'run', 'start'], {
      cwd: dir,
      env: { ...process.env, PORT: String(port), BUNTAL_PUBLIC_SITE_URL: url },
      stdout: 'ignore',
      stderr: 'ignore'
    })
    try {
      await waitFor(url)
      for (const scheme of ['light', 'dark'] as const) {
        const page = await browser.newPage({
          viewport: { width: 1280, height: 800 },
          deviceScaleFactor: 2,
          colorScheme: scheme,
          reducedMotion: 'reduce'
        })
        for (const { path, name } of pages) {
          await page.goto(url + path, { waitUntil: 'networkidle' })
          const file = join(out, `${template}-${name}-${scheme}.jpg`)
          await page.screenshot({ path: file, type: 'jpeg', quality: 80 })
          console.log(`  ${file.slice(root.length + 1)}`)
        }
        await page.close()
      }
    } finally {
      server.kill()
      await server.exited
    }
  }
} finally {
  await browser.close()
  rmSync(work, { recursive: true, force: true })
}
