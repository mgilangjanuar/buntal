#! /usr/bin/env bun

import { spawn, type SpawnOptions } from 'bun'
import { program } from 'commander'
import { cpSync, readdirSync, rmSync } from 'fs'
import { dirname, isAbsolute, relative, resolve } from 'path'

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
      outDir: safeOutDir(config.outDir || '.buntal'),
      staticDir: config.staticDir || './public'
    }
  }
}

const safeOutDir = (outDir: string) => {
  const rel = relative(process.cwd(), resolve(outDir))
  if (!rel || rel.startsWith('..') || isAbsolute(rel)) {
    console.error(
      `Error: outDir "${outDir}" must be a subdirectory of the project.`
    )
    process.exit(1)
  }
  return rel
}

const entrypoint = (file: string, confFileExist: boolean) => {
  const configPath = relative(dirname(file), 'buntal.config')
  return `import { runServer } from 'buntal/server'
${confFileExist ? `import config from '${configPath.startsWith('.') ? configPath : './' + configPath}'\n` : ''}
runServer(${confFileExist ? 'config' : ''})
`
}

const projectRoot = process.cwd()

const withEnv = (NODE_ENV: string) => ({
  ...spawnOpts,
  env: { ...process.env, NODE_ENV, BUNTAL_ROOT: projectRoot }
})

const run = async (cmd: string[], NODE_ENV = 'production') => {
  const code = await spawn(cmd, withEnv(NODE_ENV)).exited
  if (code !== 0) process.exit(code)
}

const usesTailwind = async (appDir: string) => {
  if (!(await Bun.file(appDir + '/globals.css').exists())) return false
  const pkg = Bun.file('package.json')
  if (!(await pkg.exists())) return false
  const { dependencies = {}, devDependencies = {} } = await pkg.json()
  return 'tailwindcss' in dependencies || 'tailwindcss' in devDependencies
}

const spawnOpts = {
  stdin: 'inherit',
  stdout: 'inherit',
  stderr: 'inherit'
} as SpawnOptions.OptionsObject<'inherit', 'inherit', 'inherit'>

program
  .name('buntal')
  .description('Buntal CLI - A modern, type-safe web framework for Bun')
  .version((await import('./package.json')).default.version)

program
  .command('dev')
  .description('Start the development server')
  .action(async () => {
    const { confFileExist, params } = await _populateConfig()

    // init the entrypoint
    rmSync(params.outDir, { recursive: true, force: true })
    const entry = `${params.outDir}/index.ts`
    await Bun.write(entry, entrypoint(entry, confFileExist))

    const runner = async () => {
      // run the development server
      spawn(
        ['bun', '--watch', params.outDir + '/index.ts'],
        withEnv(process.env.NODE_ENV || 'development')
      )

      if (await usesTailwind(params.appDir)) {
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
          spawnOpts
        )
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
    const out = resolve(params.outDir)
    for (const file of readdirSync('.', { withFileTypes: true })) {
      if (file.name === '.git' || resolve(file.name) === out) continue
      cpSync(file.name, `${params.outDir}/${file.name}`, {
        recursive: true,
        filter: (src) => resolve(src) !== out
      })
    }

    await Bun.write(
      `${params.outDir}/.buntal/index.ts`,
      entrypoint('.buntal/index.ts', confFileExist)
    )
    process.chdir(params.outDir)
    await run(['bun', '.buntal/index.ts', '--build'], process.env.NODE_ENV)
    if (await usesTailwind(params.appDir)) {
      await run([
        'bunx',
        '@tailwindcss/cli',
        '-i',
        params.appDir + '/globals.css',
        '-o',
        params.outDir + '/dist/globals.css',
        '--minify'
      ])
    }
  })

program
  .command('start')
  .description('Start the production server')
  .action(async () => {
    const { params } = await _populateConfig()

    if (!(await Bun.file(params.outDir + '/.buntal/index.ts').exists())) {
      console.error(
        'Error: The output directory does not contain the entrypoint file. Please run `buntal build` first.'
      )
      process.exit(1)
    }

    process.chdir(params.outDir)
    await run(['bun', '.buntal/index.ts', '--serve'], process.env.NODE_ENV)
  })

program.parse()
