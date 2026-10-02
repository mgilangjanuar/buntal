import { $ } from 'bun'
import { cpSync, existsSync, readdirSync, renameSync } from 'fs'
import { join, relative } from 'path'

export type Template = { name: string; description: string }

export const TEMPLATES: Template[] = [
  { name: 'default', description: 'Minimal starter with Tailwind CSS' },
  {
    name: 'landing',
    description: 'Landing page / portfolio with projects, contact form and SEO'
  },
  {
    name: 'blog',
    description: 'Markdown blog with tags, RSS, sitemap and a SQL database'
  }
]

const templatesDir = () => {
  const bundled = join(import.meta.dir, '..', 'templates')
  if (existsSync(bundled)) return bundled
  return join(import.meta.dir, '..', '..', '..', 'templates')
}

const SKIP =
  /(^|[\\/])(node_modules|\.buntal|data)([\\/]|$)|(^|[\\/])bun\.lock$/

export const copyTemplate = (source: string, dest: string) =>
  cpSync(source, dest, {
    recursive: true,
    filter: (src) => !SKIP.test(relative(source, src))
  })

export async function createProject(name: string, template = 'default') {
  if (!/^[a-zA-Z_][a-zA-Z0-9_\-]*$/.test(name)) {
    console.error(
      'Error: Project name must start with a letter or underscore and contain only letters, numbers, underscores, and hyphens.'
    )
    process.exit(1)
  }

  if (!TEMPLATES.some((t) => t.name === template)) {
    console.error(
      `Error: Unknown template "${template}". Available: ${TEMPLATES.map((t) => t.name).join(', ')}`
    )
    process.exit(1)
  }

  if (existsSync(name)) {
    console.error(
      `Error: "${name}" already exists. Please choose a different name.`
    )
    process.exit(1)
  }

  const source = join(templatesDir(), template)
  if (!existsSync(source)) {
    console.error(`Error: Template files for "${template}" are missing.`)
    process.exit(1)
  }

  copyTemplate(source, name)
  process.chdir(name)

  if (existsSync('_gitignore')) renameSync('_gitignore', '.gitignore')
  if (existsSync('.env.example') && !existsSync('.env')) {
    cpSync('.env.example', '.env')
  }

  const pkg = await Bun.file('package.json').json()
  pkg.name = name.toLowerCase()
  await Bun.write('package.json', JSON.stringify(pkg, null, 2) + '\n')

  await $`bun install`

  if (pkg.scripts?.['db:migrate']) await $`bun run db:migrate`
  if (pkg.scripts?.['db:seed']) await $`bun run db:seed`

  console.log(`\nDone! 🔥 Created ${name} from the ${template} template.`)
  console.log(`To get started, run: \`cd ${name} && bun dev\``)
  if (readdirSync('.').includes('README.md')) {
    console.log('See README.md for what is inside.')
  }
}
