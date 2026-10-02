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
    const script = document.createElement('script')
    script.src = src
    document.querySelectorAll('script[src]').forEach((el) => {
      if ((el as HTMLScriptElement).src === script.src) el.remove()
    })

    for (const [key, value] of Object.entries(props)) {
      if (value === undefined || value === null || value === false) continue
      if (typeof value === 'function') {
        if (key === 'onLoad') script.addEventListener('load', value)
        else if (key === 'onError') script.addEventListener('error', value)
        continue
      }
      if (key === 'dangerouslySetInnerHTML' || key === 'children') continue
      const attr =
        key === 'crossOrigin'
          ? 'crossorigin'
          : key === 'referrerPolicy'
            ? 'referrerpolicy'
            : key === 'noModule'
              ? 'nomodule'
              : key
      script.setAttribute(attr, value === true ? '' : String(value))
    }

    document.body.appendChild(script)
    return () => {
      script.remove()
    }
  }, [src])

  return null
}
