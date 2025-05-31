#! /usr/bin/env bun

import { program } from 'commander'
import build from './cmd/build'
import dev from './cmd/dev'
import start from './cmd/start'

program
  .name('buntal')
  .description('Buntal CLI - A modern, type-safe web framework for Bun')
  .version('0.0.2')

program.command('dev').description('Start the development server').action(dev)
program.command('build').description('Build the application').action(build)
program
  .command('start')
  .description('Start the production server')
  .action(start)

program.parse()
