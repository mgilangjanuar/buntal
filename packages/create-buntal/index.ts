#! /usr/bin/env bun

import { program } from 'commander'
import { createProject } from './cmd/default'

program
  .name('create-buntal')
  .description('Create a new Buntal project')
  .version('0.0.1')

program.argument('<project-name>', 'Name of the project').action(createProject)

program.parse()
