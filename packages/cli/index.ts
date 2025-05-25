import { $ } from 'bun'
import { program } from 'commander'

program
  .command('dev')
  .description('Start the development server')
  .action(async () => {
    await Bun.write('.buntal/index.ts', `import { runServer } from 'buntal-react/server'

runServer()
`)

    await $`bun --watch .buntal/index.ts`
  })

program.parse()
