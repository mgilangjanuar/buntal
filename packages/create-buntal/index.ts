#! /usr/bin/env bun

import { program } from 'commander'
import { createInterface } from 'readline/promises'
import { createProject, TEMPLATES } from './cmd/default'

const ask = async (question: string) => {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const answer = (await rl.question(question)).trim()
  rl.close()
  return answer
}

const pickTemplate = async () => {
  if (!process.stdin.isTTY) return 'default'
  console.log('Choose a template:')
  TEMPLATES.forEach((t, i) =>
    console.log(`  ${i + 1}. ${t.name.padEnd(8)} ${t.description}`)
  )
  const answer = await ask(`Template [1-${TEMPLATES.length}] (1): `)
  if (!answer) return 'default'
  return TEMPLATES[Number(answer) - 1]?.name ?? answer
}

program
  .name('create-buntal')
  .description('Create a new Buntal project')
  .version((await import('./package.json')).default.version)
  .argument('[project-name]', 'Name of the project')
  .option(
    '-t, --template <name>',
    `Template to use: ${TEMPLATES.map((t) => t.name).join(', ')}`
  )
  .action(async (projectName: string | undefined, options) => {
    if (!projectName) {
      projectName = await ask('Please enter the project name: ')
      if (!projectName) {
        program.error('Project name is required.')
      }
    }
    const template: string = options.template ?? (await pickTemplate())
    await createProject(projectName, template)
  })

program.parse()
