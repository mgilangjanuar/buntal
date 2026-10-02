import { describe, expect, test } from 'bun:test'
import { stripServerExports } from './transform'

const strip = (source: string) => stripServerExports('/app/page.tsx', source)

describe('stripServerExports', () => {
  test('removes $ and imports used only by it', () => {
    const out = strip(`import { db } from '@/lib/db'
import { SQL } from 'bun'
import { Link, type MetaProps } from 'buntal'

export const $ = async (req) => {
  const rows = await db\`SELECT 1\`
  return { rows, _meta: { title: 'x' } satisfies MetaProps }
}

export default function Page({ data }) {
  return <Link href="/">{data.rows.length}</Link>
}`)!
    expect(out).not.toContain('$ =')
    expect(out).not.toContain('@/lib/db')
    expect(out).not.toContain("from 'bun'")
    expect(out).toContain("import { Link } from 'buntal'")
    expect(out).toContain('export default function Page')
  })

  test('removes helpers only the loader used, keeps shared ones', () => {
    const out = strip(`import { query } from './server'
import { format } from './shared'

const load = (id) => query(id)
const label = (x) => format(x)

export const $ = (req) => ({ item: load(req.params.id), title: label('a') })

export default function Page({ data }) {
  return <p>{label(data.item)}</p>
}`)!
    expect(out).not.toContain('./server')
    expect(out).not.toContain('const load')
    expect(out).toContain('const label')
    expect(out).toContain("import { format } from './shared'")
  })

  test('keeps side-effect imports and other exports', () => {
    const out = strip(`import './styles.css'
import { util } from './util'
export const config = util()
export const $ = { _meta: { title: 'Static' } }
export default () => null`)!
    expect(out).toContain("import './styles.css'")
    expect(out).toContain('export const config = util()')
    expect(out).not.toContain('_meta')
  })

  test('leaves files without a loader untouched', () => {
    expect(strip(`export default () => <p>hi</p>`)).toBeUndefined()
  })

  test('keeps $ when the component reads it as a value', () => {
    expect(
      strip(`export const $ = { a: 1 }
export default () => <p>{$.a}</p>`)
    ).toBeUndefined()
  })
})
