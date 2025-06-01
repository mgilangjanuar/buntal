import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode
} from 'react'
import { Notfound } from '../notfound'

export type ServerRouterType = {
  regex: string
  ssr?: boolean
  data?: unknown
  element: (data: any) => ReactNode
  layouts: {
    element: (data: any) => ReactNode
    ssr?: boolean
    data?: unknown
  }[]
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
  reload: () => void
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
  back: () => {},
  reload: () => {}
})

type RouterProviderProps = {
  routes: ServerRouterType[]
  rootLayout?: (props: any) => ReactNode
  notFound?: ReactNode
}

export function RouterProvider({
  routes,
  rootLayout,
  notFound = <Notfound />,
  ...props
}: RouterProviderProps) {
  const [activeRoute, setActiveRoute] = useState<string>(
    window?.location.pathname
  )
  const [router, setRouter] = useState<(typeof routes)[number] | null>()
  const args = useRef<{
    query: Record<string, string>
    params: Record<string, string>
  }>(null)
  const [page, setPage] = useState<ReactNode>(null)

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
    const route =
      routes.find((r) => new RegExp(r.regex).test(activeRoute)) || null
    setRouter(route)

    return () => {
      args.current = null
    }
  }, [activeRoute])

  const buildPage = useCallback(
    async (
      layouts: ServerRouterType['layouts'] = router?.layouts || [],
      idx: number = 0
    ): Promise<ReactNode> => {
      if (!router) return

      if (!args.current) {
        const match = new RegExp(router.regex).exec(window.location.pathname)
        const params: Record<string, string> = Object.entries(
          match?.groups || {}
        ).reduce((acc, [key, value]) => {
          return { ...acc, [key]: decodeURIComponent(value) }
        }, {})

        const query: Record<string, string> =
          Object.fromEntries(new URLSearchParams(window.location.search)) || {}

        args.current = { query, params }
      }

      const fetchData = async (idx: number) => {
        const resp = await fetch(
          `${window.location.pathname}?${new URLSearchParams({
            ...(args.current?.query || {}),
            _$: idx.toString()
          }).toString()}`
        )
        if (resp.ok) {
          if (resp.headers.get('Content-Type')?.includes('application/json')) {
            return await resp.json()
          }
          return await resp.text()
        }
      }

      if (!layouts?.[0]) {
        return createElement(router.element, {
          ...args.current,
          data: router.ssr ? await fetchData(-1) : router.data
        })
      }

      return createElement(layouts[0].element, {
        ...args.current,
        data: layouts[0].ssr ? await fetchData(idx) : layouts[0].data,
        children: buildPage(layouts.slice(1), idx + 1)
      })
    },
    [router]
  )

  useEffect(() => {
    if (router) {
      buildPage(router.layouts).then((p) => {
        setPage(p)
        setTimeout(() => {
          if (window.location.hash) {
            const [selector, top] = window.location.hash.split(':') as [
              string,
              string | undefined
            ]
            const target = document.querySelector(selector)
            if (target) {
              window.scrollTo({
                behavior: 'smooth',
                top:
                  target.getBoundingClientRect().top +
                  window.scrollY -
                  (top ? Number(top) : 80)
              })
            }
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' })
          }
        }, 10)
      })
    } else if (router === null) {
      setPage(
        rootLayout
          ? createElement(rootLayout, {
              data: {
                _meta: {
                  title: 'Not found'
                }
              },
              children: notFound
            })
          : notFound
      )
    }
  }, [buildPage, router])

  return (
    <RouterContext.Provider
      {...props}
      value={{
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
        },
        reload: () => {
          window.location.reload()
        }
      }}
    >
      {page}
    </RouterContext.Provider>
  )
}

export const useRouter = () => useContext(RouterContext)
