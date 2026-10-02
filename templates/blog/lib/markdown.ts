const UNSAFE_URL =
  /^\s*(javascript|vbscript|data(?!:image\/(png|gif|jpe?g|webp);)):/i

const decode = (value: string) =>
  value
    .replace(/&#x([0-9a-f]+);?/gi, (_, h) =>
      String.fromCharCode(parseInt(h, 16))
    )
    .replace(/&#(\d+);?/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&colon;/gi, ':')
    .replace(/[\u0000-\u001f]/g, '')

export const renderMarkdown = (source: string) =>
  Bun.markdown
    .html(source, {
      tables: true,
      strikethrough: true,
      tasklists: true,
      autolinks: true,
      headings: { ids: true },
      noHtmlBlocks: true,
      noHtmlSpans: true
    })
    .replace(/\s(href|src)="([^"]*)"/g, (attr, name, value) =>
      UNSAFE_URL.test(decode(value)) ? ` ${name}="#"` : attr
    )

export const readingMinutes = (source: string) =>
  Math.max(1, Math.round(source.split(/\s+/).filter(Boolean).length / 220))
