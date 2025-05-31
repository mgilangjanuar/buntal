#! /usr/bin/env bun

import { $, spawn, type SpawnOptions } from 'bun'
import { program } from 'commander'
import { cpSync, readdirSync, rmSync } from 'fs'

const _populateConfig = async () => {
  const confFileExist = await Bun.file('buntal.config.ts').exists()
  const { default: config }: { default: any } = confFileExist
    ? await import(process.cwd() + '/buntal.config.ts')
    : { default: {} }
  return {
    confFileExist,
    params: {
      env: process.env.NODE_ENV || config.env || 'development',
      appDir: config.appDir || './app',
      outDir: config.outDir || '.buntal',
      staticDir: config.staticDir || './public'
    }
  }
}

program
  .name('buntal')
  .description('Buntal CLI - A modern, type-safe web framework for Bun')
  .version('0.0.2')

program
  .command('dev')
  .description('Start the development server')
  .action(async () => {
    const { confFileExist, params } = await _populateConfig()

    // init the entrypoint
    await Bun.write(
      params.outDir + '/index.ts',
      `import { runServer } from 'buntal/server'
${confFileExist ? `import config from '../buntal.config'\n` : ''}
runServer(${confFileExist ? 'config' : ''})
`
    )

    const opts = {
      stdin: 'inherit',
      stdout: 'inherit',
      stderr: 'inherit'
    } as SpawnOptions.OptionsObject<'inherit', 'inherit', 'inherit'>

    const runner = async () => {
      // run the development server
      spawn(['bun', '--watch', params.outDir + '/index.ts'], opts)

      // watch tailwindcss if it exists
      if (
        (await Bun.file(params.appDir + '/globals.css').exists()) &&
        (await Bun.file('package.json').exists())
      ) {
        const packageJson = await Bun.file('package.json').json()
        if ('tailwindcss' in packageJson.dependencies) {
          spawn(
            [
              'bunx',
              '@tailwindcss/cli',
              '-i',
              params.appDir + '/globals.css',
              '-o',
              params.outDir + '/dist/globals.css',
              '--watch'
            ],
            opts
          )
        }
      }
    }
    await runner()
  })

program
  .command('build')
  .description('Build the application')
  .action(async () => {
    const { confFileExist, params } = await _populateConfig()

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
  })

program
  .command('start')
  .description('Start the production server')
  .action(async () => {
    const { params } = await _populateConfig()

    if (
      !(await Bun.file(params.outDir + '/index.ts').exists()) &&
      !(await Bun.file(params.outDir + '/.buntal/index.ts').exists())
    ) {
      console.error(
        'Error: The output directory does not contain the entrypoint file. Please run `buntal build` first.'
      )
      process.exit(1)
    }

    if (await Bun.file(params.outDir + '/.buntal/index.ts').exists()) {
      process.chdir(params.outDir)
    }
    await $`NODE_ENV=production bun .buntal/index.ts --serve`
  })

program.parse()
