import { useEffect } from 'preact/hooks'

export function Script({
  src,
  ref,
  ...props
}: {
  src: string
  ref?: any
} & any) {
  useEffect(() => {
    document.querySelectorAll('script[src="' + src + '"]').forEach((el) => {
      el.remove()
    })

    const script = document.createElement('script')
    script.src = src
    for (const [key, value] of Object.entries(props)) {
      if (value !== undefined) {
        script.setAttribute(key, value as any)
      }
    }

    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  if (typeof window === 'undefined') {
    return <script ref={ref} src={src} {...props} />
  }
}
