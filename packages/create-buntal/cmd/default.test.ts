import { afterAll, describe, expect, test } from 'bun:test'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { copyTemplate } from './default'

const root = mkdtempSync(join(tmpdir(), 'create-buntal-'))
afterAll(() => rmSync(root, { recursive: true, force: true }))

describe('copyTemplate', () => {
  test('copies a template installed under node_modules', () => {
    const source = join(
      root,
      'node_modules',
      'create-buntal',
      'templates',
      'blog'
    )
    for (const dir of ['app', 'node_modules/x', 'data', '.buntal']) {
      mkdirSync(join(source, dir), { recursive: true })
    }
    writeFileSync(join(source, 'package.json'), '{}')
    writeFileSync(join(source, 'app', 'index.tsx'), '')
    writeFileSync(join(source, 'data', 'app.db'), '')
    writeFileSync(join(source, 'bun.lock'), '')

    const dest = join(root, 'my-app')
    copyTemplate(source, dest)

    expect(existsSync(join(dest, 'package.json'))).toBe(true)
    expect(existsSync(join(dest, 'app', 'index.tsx'))).toBe(true)
    expect(existsSync(join(dest, 'node_modules'))).toBe(false)
    expect(existsSync(join(dest, 'data'))).toBe(false)
    expect(existsSync(join(dest, '.buntal'))).toBe(false)
    expect(existsSync(join(dest, 'bun.lock'))).toBe(false)
  })
})
