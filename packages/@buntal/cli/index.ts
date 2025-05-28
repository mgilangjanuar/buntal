#! /usr/bin/env bun

import { program } from 'commander'
import dev from './cmd/dev'

program
  .name('buntal')
  .description('Buntal CLI - A modern, type-safe web framework for Bun')
  .version('0.0.1')

program.command('dev').description('Start the development server').action(dev)

program.parse()
