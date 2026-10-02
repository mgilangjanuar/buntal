import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'fs'
import { join } from 'path'
import { sanitizeSvg } from './sanitize-svg'

describe('sanitizeSvg', () => {
  test('leaves ordinary SVGs untouched', () => {
    const logo = readFileSync(
      join(import.meta.dir, '../../../examples/hello-world/app/logo.svg'),
      'utf8'
    )
    expect(sanitizeSvg(logo)).toBe(logo)
    const grad =
      '<svg><linearGradient id="g"/><rect fill="url(#g)" href="#g"/></svg>'
    expect(sanitizeSvg(grad)).toBe(grad)
  })

  test('strips executable content', () => {
    const payloads = [
      '<svg><script>alert(1)</script></svg>',
      '<svg><SCRIPT src="x"></SCRIPT></svg>',
      '<svg onload="alert(1)"></svg>',
      "<svg><a href='javascript:alert(1)'>x</a></svg>",
      '<svg><a xlink:href="jav&#x09;ascript:alert(1)">x</a></svg>',
      '<svg><foreignObject><img src=x onerror=alert(1)></foreignObject></svg>',
      '<svg><scr<script></script>ipt>alert(1)</script></svg>',
      '<svg><use href="data:image/svg+xml,<svg onload=alert(1)>"/></svg>',
      '<svg><iframe src="data:text/html,x"></iframe></svg>'
    ]
    for (const p of payloads) {
      const out = sanitizeSvg(p).toLowerCase()
      expect(out).not.toMatch(
        /<script|onload|onerror|javascript:|<foreignobject|<iframe|<use/
      )
    }
  })
})
