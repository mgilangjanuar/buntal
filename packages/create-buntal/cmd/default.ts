import { $ } from 'bun'
import { cpSync, existsSync } from 'fs'

export async function createProject(name: string) {
  if (!/^[a-zA-Z_][a-zA-Z0-9_\-]*$/.test(name)) {
    console.error(
      'Error: Project name must start with a letter or underscore and contain only letters, numbers, underscores, and hyphens.'
    )
    process.exit(1)
  }

  if (existsSync(name)) {
    console.error(
      `Error: "${name}" already exists. Please choose a different name.`
    )
    process.exit(1)
  }

  cpSync(`${__dirname}/templates`, name, { recursive: true })
  process.chdir(name)

  const pkg = await Bun.file('package.json').json()
  pkg.name = name.toLowerCase()
  await Bun.write('package.json', JSON.stringify(pkg, null, 2) + '\n')

  await $`bun install`

  console.log('\nDone! 🔥')
  console.log(`To get started, run: \`cd ${name} && bun dev\``)
}
