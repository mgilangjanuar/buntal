#! /usr/bin/env bun

import type { SpawnOptions } from 'bun'
import { program } from 'commander'

type Options = {
  env?: 'development' | 'production',
  appDir?: string,
  outDir?: string,
  staticDir?: string,
}

program
  .command('dev')
  .description('Start the development server')
  .action(async () => {

    // populate config
    const confFileExist = await Bun.file('buntal.config.ts').exists()
    const config: Options = confFileExist ? await import(process.cwd() + '/buntal.config.ts') : {}
    const params = {
      env: config.env || 'development',
      appDir: config.appDir || './app',
      outDir: config.outDir || '.buntal',
      staticDir: config.staticDir || './public',
    }

    await Bun.write(params.outDir + '/index.ts', `import { runServer } from 'buntal-react/server'
${confFileExist ? `import config from '../buntal.config'\n` : ''}
runServer(${confFileExist ? 'config' : undefined})
`)

    const opts = {
      stdin: 'inherit',
      stdout: 'inherit',
      stderr: 'inherit',
    } as SpawnOptions.OptionsObject<'inherit', 'inherit', 'inherit'>

    const runner = async () => {
      // run the development server
      Bun.spawn(['bun', '--watch', params.outDir + '/index.ts'], opts)

      // watch tailwindcss if it exists
      if (await Bun.file(params.appDir + '/globals.css').exists() && await Bun.file('package.json').exists()) {
        const packageJson = await Bun.file('package.json').json()
        if ('tailwindcss' in packageJson.dependencies) {
          Bun.spawn([
            'bunx', '@tailwindcss/cli',
            '-i', params.appDir + '/globals.css',
            '-o', params.outDir + '/dist/globals.css', '--watch'
          ], opts)
        }
      }
    }
    await runner()
  })

program.parse()
