import { $ } from 'bun'
import { cpSync, readdirSync, rmSync } from 'fs'
import type { AppOptions } from '../types'

export default async function () {
  try {
    await Bun.file('node_modules').stat()
  } catch (error) {
    console.error(
      'Error: The node_modules directory does not exist. Please run `bun install` first.'
    )
    process.exit(1)
  }

  // populate config
  const confFileExist = await Bun.file('buntal.config.ts').exists()
  const { default: config }: { default: AppOptions } = confFileExist
    ? await import(process.cwd() + '/buntal.config.ts')
    : { default: {} }
  const params = {
    env: process.env.NODE_ENV || config.env || 'development',
    appDir: config.appDir || './app',
    outDir: config.outDir || '.buntal',
    staticDir: config.staticDir || './public'
  }

  rmSync(params.outDir, { recursive: true, force: true })
  for (const file of readdirSync('.', { withFileTypes: true })) {
    if (file.name !== params.outDir) {
      cpSync(file.name, `${params.outDir}/${file.name}`, { recursive: true })
    }
  }

  // init the entrypoint
  await Bun.write(
    `${params.outDir}/.buntal/index.ts`,
    `import { runServer } from 'buntal/server'
${confFileExist ? `import config from '../buntal.config'\n` : ''}
runServer(${confFileExist ? 'config' : ''})
`
  )
  process.chdir(params.outDir)
  await $`bun .buntal/index.ts --build`
  if (
    (await Bun.file(params.appDir + '/globals.css').exists()) &&
    (await Bun.file('package.json').exists())
  ) {
    const packageJson = await Bun.file('package.json').json()
    if ('tailwindcss' in packageJson.dependencies) {
      await $`bunx @tailwindcss/cli -i ${params.appDir}/globals.css -o ${params.outDir}/dist/globals.css`
    }
  }
}
