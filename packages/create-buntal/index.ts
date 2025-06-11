#! /usr/bin/env bun

import { program } from 'commander'
import { createProject } from './cmd/default'

async function promptForProjectName() {
  process.stdout.write('Please enter the project name: ')
  const input = await new Promise<string>((resolve) => {
    process.stdin.once('data', (data) => resolve(data.toString().trim()))
  })
  return input
}

program
  .name('create-buntal')
  .description('Create a new Buntal project')
  .version('0.0.1')

program
  .argument('[project-name]', 'Name of the project')
  .action(async (projectName) => {
    if (!projectName) {
      projectName = await promptForProjectName()

      if (!projectName) {
        console.error('Project name is required.')
        process.exit(1)
      }
    }
    await createProject(projectName)
    process.exit(0)
  })

program.parse()
