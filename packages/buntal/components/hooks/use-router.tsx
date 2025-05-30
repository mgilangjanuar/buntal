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
    data: any
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
      layouts: ((data: any) => ReactNode)[] = router?.layouts || []
    ): Promise<ReactNode> => {
      if (!router) return

      if (!args.current) {
        const populateArgs = async () => {
          const match = new RegExp(router.regex).exec(window.location.pathname)
          const params: Record<string, string> = Object.entries(
            match?.groups || {}
          ).reduce((acc, [key, value]) => {
            return { ...acc, [key]: decodeURIComponent(value) }
          }, {})

          const query: Record<string, string> =
            Object.fromEntries(new URLSearchParams(window.location.search)) ||
            {}

          const fetchData = async () => {
            const resp = await fetch(
              `${window.location.pathname}?${new URLSearchParams({
                ...query,
                _$: '1'
              }).toString()}`
            )
            if (resp.ok) {
              if (
                resp.headers.get('Content-Type')?.includes('application/json')
              ) {
                return resp.json()
              }
              return resp.text()
            }
          }
          const data = router.ssr ? await fetchData() : router.data
          return { query, params, data }
        }
        args.current = await populateArgs()
      }

      if (!layouts?.[0]) {
        return createElement(router.element, args.current)
      }

      return createElement(layouts[0], {
        ...args.current,
        children: buildPage(layouts.slice(1))
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
