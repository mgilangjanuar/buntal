import { useEffect } from 'react'

export function Script({
  src,
  ref,
  ...props
}: {
  src: string
  ref?: React.Ref<HTMLScriptElement>
} & React.ScriptHTMLAttributes<HTMLScriptElement>) {
  useEffect(() => {
    document.querySelectorAll('script[src="' + src + '"]').forEach((el) => {
      el.remove()
    })

    const script = document.createElement('script')
    script.src = src
    for (const [key, value] of Object.entries(props)) {
      if (value !== undefined) {
        script.setAttribute(key, value)
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
