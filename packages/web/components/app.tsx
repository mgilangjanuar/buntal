import { createElement, type ReactNode, useCallback, useEffect, useState } from 'react'

export function App({ routes }: Readonly<{
  routes: {
    regex: string,
    ssr?: boolean,
    element: (data: any) => ReactNode,
    layouts: ((data: any) => ReactNode)[]
  }[]
}>) {
  const [activeRoute, setActiveRoute] = useState<string>(window?.location.pathname)
  const [router, setRouter] = useState<typeof routes[number] | null>(null)
  const [args, setArgs] = useState<{
    query: Record<string, string>,
    params: Record<string, string>,
    data?: unknown
  }>()

  useEffect(() => {
    const handler = () => {
      setActiveRoute(window.location.pathname)
    }
    window.addEventListener('popstate', handler)
    return () => {
      window.removeEventListener('popstate', handler)
    }
  }, [])

  useEffect(() => {
    const route = routes.find(r => new RegExp(r.regex).test(activeRoute)) || null
    if (route) {
      setRouter(route)
    }
  }, [activeRoute])

  useEffect(() => {
    if (router) {
      const populateArgs = async () => {
        const match = new RegExp(router.regex).exec(window.location.pathname)
        const params: Record<string, string> = match?.groups || {}

        const query: Record<string, string> = Object.fromEntries(
          new URLSearchParams(window.location.search)) || {}

        const fetchData = async () => {
          const resp = await fetch(`${window.location.pathname}?_$=1`)
          if (resp.ok) {
            if (resp.headers.get('Content-Type')?.includes('application/json')) {
              return resp.json()
            }
            return resp.text()
          }
        }
        const data = router.ssr ? await fetchData() : {}

        setArgs({
          query,
          params,
          data
        })
      }
      populateArgs()
    }
  }, [router])

  const buildPage = useCallback((layouts?: ((data: any) => ReactNode)[]): ReactNode => {
    if (router && args) {
      if (!layouts?.[0]) {
        return createElement(router.element, args)
      }
      return createElement(layouts[0], {
        ...args,
        children: buildPage(layouts.slice(1))
      })
    }
  }, [router, args])

  return buildPage(router?.layouts || [])
}
