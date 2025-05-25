#! /usr/bin/env bun

import type { SpawnOptions } from 'bun'
import { program } from 'commander'

program
  .command('dev')
  .description('Start the development server')
  .action(async () => {
    await Bun.write('.buntal/index.ts', `import { runServer } from 'buntal-react/server'

runServer()
`)
    const opts = {
      stdin: 'inherit',
      stdout: 'inherit',
      stderr: 'inherit',
    } as SpawnOptions.OptionsObject<'inherit', 'inherit', 'inherit'>

    const runner = async () => {
      Bun.spawn(['bun', '--watch', '.buntal/index.ts'], opts)
      if (await Bun.file('app/globals.css').exists() && await Bun.file('package.json').exists()) {
        const packageJson = await Bun.file('package.json').json()
        if ('tailwindcss' in packageJson.dependencies) {
          Bun.spawn([
            'bunx', '@tailwindcss/cli',
            '-i', 'app/globals.css',
            '-o', '.buntal/dist/globals.css', '--watch'
          ], opts)
        }
      }
    }
    await runner()
  })

program.parse()
