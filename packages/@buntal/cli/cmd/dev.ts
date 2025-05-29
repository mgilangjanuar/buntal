import { spawn, type SpawnOptions } from 'bun'
import type { AppOptions } from '../types'

export default async function () {
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
}
