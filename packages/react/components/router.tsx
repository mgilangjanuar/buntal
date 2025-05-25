import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type ServerRouterType = {
  regex: string,
  ssr?: boolean,
  element: (data: any) => ReactNode,
  layouts: ((data: any) => ReactNode)[]
}

type RouterType = {
  pathname: string
  search: string
  href: string
  protocol: string
  hostname: string
  hash: string
  push: (url: string) => void
  replace: (url: string) => void
  back: () => void
}

export const RouterContext = createContext<RouterType>({
  pathname: '',
  search: '',
  href: '',
  protocol: '',
  hostname: '',
  hash: '',
  push: () => {},
  replace: () => {},
  back: () => {}
})

type RouterProviderProps = {
  routes: ServerRouterType[],
  notFound?: ReactNode
}

export function RouterProvider({
  routes,
  notFound = <div>Not found</div>,
  ...props
}: RouterProviderProps) {
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
    setRouter(route)
  }, [activeRoute])

  useEffect(() => {
    if (router) {
      const populateArgs = async () => {
        const match = new RegExp(router.regex).exec(window.location.pathname)
        const params: Record<string, string> = match?.groups || {}

        const query: Record<string, string> = Object.fromEntries(
          new URLSearchParams(window.location.search)) || {}

        const fetchData = async () => {
          const resp = await fetch(`${window.location.pathname}?${new URLSearchParams({
            ...query, _$: '1'
          }).toString()}`)
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
    if (router === null) {
      return notFound
    } else {
      if (router && args) {
        if (!layouts?.[0]) {
          return createElement(router.element, args)
        }
        return createElement(layouts[0], {
          ...args,
          children: buildPage(layouts.slice(1))
        })
      }
    }
  }, [router, args])

  return (
    <RouterContext.Provider {...props} value={{
      pathname: window.location.pathname,
      search: window.location.search,
      href: window.location.href,
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      hash: window.location.hash,
      push: (url: string) => {
        window.history.pushState({}, '', url)
        window.dispatchEvent(new PopStateEvent('popstate'))
      },
      replace: (url: string) => {
        window.history.replaceState({}, '', url)
        window.dispatchEvent(new PopStateEvent('popstate'))
      },
      back: () => {
        window.history.back()
        window.dispatchEvent(new PopStateEvent('popstate'))
      }
    }}>
      {buildPage(router?.layouts || [])}
    </RouterContext.Provider>
  )
}

export const useRouter = () => useContext(RouterContext)
