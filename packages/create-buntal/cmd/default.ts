import { $ } from 'bun'

export async function createProject(name: string) {
  if (!/^[a-zA-Z_\-][a-zA-Z0-9\-]*$/.test(name)) {
    console.log(
      'error: Project name must be a valid identifier (letters, numbers, underscores, and hyphens only).'
    )
    process.exit(1)
  }

  if (await Bun.file(name).exists()) {
    console.log(
      `error: Project directory "${name}" already exists. Please choose a different name.`
    )
    process.exit(1)
  }

  await $`cp -r ${__dirname}/templates ${name}`
  process.chdir(name)

  const pkg = await Bun.file('package.json').text()
  await Bun.write(
    'package.json',
    pkg.replace(/"name": ".*"/, `"name": "${name}"`)
  )

  await $`bun install`

  console.log('\nDone! 🔥')
  console.log(`To get started, run: \`cd ${name} && bun dev\``)
}
