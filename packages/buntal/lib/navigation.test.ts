import { describe, expect, test } from 'bun:test'
import { sameOriginPath, scrollToHash } from './navigation'

;(globalThis as any).window = {
  location: { href: 'https://app.test/a/b', origin: 'https://app.test' },
  scrollY: 0,
  scrollTo: () => {}
}
;(globalThis as any).document = {
  getElementById: () => null,
  querySelector: (s: string) => {
    if (s.includes('"')) throw new SyntaxError('bad selector')
    return null
  }
}

describe('sameOriginPath', () => {
  test('keeps same-origin paths', () => {
    expect(sameOriginPath('/x?y=1#z')).toBe('/x?y=1#z')
    expect(sameOriginPath('c')).toBe('/a/c')
    expect(sameOriginPath('https://app.test/p')).toBe('/p')
  })

  test('refuses anything that would leave the origin', () => {
    for (const href of [
      'javascript:alert(1)',
      '//evil.test/x',
      'https://evil.test',
      'mailto:a@b.c',
      'http://app.test/x'
    ]) {
      expect(sameOriginPath(href)).toBeNull()
    }
  })
})

describe('scrollToHash', () => {
  test('invalid selectors do not throw', () => {
    expect(scrollToHash('#a"]')).toBe(false)
  })
})
