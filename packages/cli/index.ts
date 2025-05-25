#! /usr/bin/env bun

import { program } from 'commander'
import dev from './command/dev'

program
  .command('dev')
  .description('Start the development server')
  .action(dev)

program.parse()
