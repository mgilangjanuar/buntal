import { $ } from 'bun'

export async function createProject(name: string) {
  if (!/^[a-zA-Z_\-][a-zA-Z0-9\-]*$/.test(name)) {
    console.log('error: Project name must be a valid identifier (letters, numbers, underscores, and hyphens only).')
    process.exit(1)
  }

  if (await Bun.file(name).exists()) {
    console.log(`error: Project directory "${name}" already exists. Please choose a different name.`)
    process.exit(1)
  }

  await $`cp -r ${__dirname}/templates ${name}`
  const pkg = await Bun.file(`${name}/package.json`).text()
  await Bun.write(`${name}/package.json`, pkg.replace(/"name": ".*"/, `"name": "${name}"`))
  await $`cd ${name} && bun install && bun dev`
}
