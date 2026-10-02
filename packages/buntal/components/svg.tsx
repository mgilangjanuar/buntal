import { useMemo } from 'react'
import { sanitizeSvg } from '../lib/sanitize-svg'

export function Svg({
  src,
  className,
  unsafe = false
}: {
  src: string
  className?: string
  unsafe?: boolean
}) {
  const html = useMemo(() => (unsafe ? src : sanitizeSvg(src)), [src, unsafe])
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  )
}
