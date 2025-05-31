import { $ } from 'bun'
import type { AppOptions } from '../types'

export default async function () {
  // populate config
  const confFileExist = await Bun.file('buntal.config.ts').exists()
  const { default: config }: { default: AppOptions } = confFileExist
    ? await import(process.cwd() + '/buntal.config.ts')
    : { default: {} }
  const params = {
    outDir: config.outDir || '.buntal'
  }

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
}
