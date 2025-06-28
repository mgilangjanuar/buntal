import {
  createContext,
  createElement,
  memo,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'
import type { MetaProps } from '../components'
import { Notfound } from '../components/notfound'
import type { ServerRouterType } from '../server/router'

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
  rootLayout: {
    element: (data: any) => ReactNode
    ssr?: boolean
    data?: unknown
  }
  notFound?: ReactNode
}

type PageDataProps =
  | {
      _meta?: MetaProps
      [key: string]: any
    }
  | undefined

type PageArgs =
  | {
      query: Record<string, string>
      params: Record<string, string>
      data?: PageDataProps
    }
  | undefined

const Page = memo(
  ({
    router,
    args,
    onDataChange,
    rootLayout,
    layoutIdx
  }: Readonly<{
    router: ServerRouterType
    args: PageArgs
    onDataChange: (args: PageDataProps) => void
    rootLayout: RouterProviderProps['rootLayout']
    layoutIdx: number
  }>) => {
    const fetchData = useCallback(async (idx: number) => {
      if (!args?.query) {
        return undefined
      }
      const resp = await fetch(
        `${window.location.pathname}?${new URLSearchParams({
          ...args.query,
          _$: idx.toString()
        }).toString()}`
      )
      if (resp.ok) {
        if (resp.headers.get('Content-Type')?.includes('application/json')) {
          return await resp.json()
        }
        return await resp.text()
      }
    }, [])

    useEffect(() => {
      if (router) {
        if (router.layouts[layoutIdx]) {
          const layout = router.layouts[layoutIdx]
          if (layout.ssr) {
            fetchData(layoutIdx + 1).then((data) => {
              onDataChange(data)
            })
          } else {
            onDataChange(layout.data)
          }
        } else {
          if (router.ssr) {
            fetchData(-1).then((data) => {
              onDataChange(data)
            })
          } else {
            onDataChange(router.data)
          }
        }
      }
    }, [router, fetchData, layoutIdx, onDataChange])

    return router.layouts[layoutIdx] ? (
      createElement(router.layouts[layoutIdx].element, {
        ...args,
        children: (
          <Page
            router={router}
            args={args}
            onDataChange={onDataChange}
            rootLayout={rootLayout}
            layoutIdx={layoutIdx + 1}
          />
        )
      })
    ) : (
      <router.element {...args} />
    )
  }
)

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
  const [args, setArgs] = useState<PageArgs>()

  // Memoize compiled route regexes to avoid recreating them
  const compiledRoutes = useMemo(
    () =>
      routes.map((route) => ({
        ...route,
        compiledRegex: new RegExp(route.regex)
      })),
    [routes]
  )

  // Memoize router navigation functions to prevent context value recreation
  const routerMethods = useMemo(
    () => ({
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
    }),
    []
  )

  // Memoize location properties to prevent unnecessary context updates
  const locationProps = useMemo(
    () => ({
      pathname: window.location.pathname,
      search: window.location.search,
      href: window.location.href,
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      hash: window.location.hash
    }),
    [activeRoute]
  )

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      ...locationProps,
      ...routerMethods
    }),
    [locationProps, routerMethods]
  )

  // Memoize onDataChange callback to prevent child re-renders
  const handleDataChange = useCallback((data: PageDataProps) => {
    setArgs((args) => ({
      query: args?.query || {},
      params: args?.params || {},
      data: {
        ...(data || {}),
        ...(args?.data || {})
      }
    }))
  }, [])

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
    // Reset args when active route changes
    setArgs((arg) => {
      if (!arg) return arg
      return {
        ...arg,
        data: undefined
      }
    })

    const foundRoute = compiledRoutes.find((r) =>
      r.compiledRegex.test(activeRoute)
    )
    // Extract only the original route properties without compiledRegex
    const route = foundRoute
      ? {
          regex: foundRoute.regex,
          ssr: foundRoute.ssr,
          data: foundRoute.data,
          element: foundRoute.element,
          layouts: foundRoute.layouts
        }
      : null
    setRouter(route)
  }, [activeRoute, compiledRoutes])

  useEffect(() => {
    if (router) {
      const match = new RegExp(router.regex).exec(window.location.pathname)
      const params: Record<string, string> = Object.entries(
        match?.groups || {}
      ).reduce((acc, [key, value]) => {
        return { ...acc, [key]: decodeURIComponent(value) }
      }, {})

      const query: Record<string, string> =
        Object.fromEntries(new URLSearchParams(window.location.search)) || {}

      setArgs((args) => ({
        ...args,
        query,
        params
      }))
    }

    return () => {
      setArgs(undefined)
    }
  }, [router])

  useEffect(() => {
    if (router) {
      if (window.location.hash) {
        setTimeout(() => {
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
        }, 500)
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
  }, [router])

  useEffect(() => {
    document.querySelectorAll('script').forEach((script) => {
      if (script.innerText === 'document.body.style.display = "none";') {
        script.remove()
      }
    })
  }, [])

  return (
    <RouterContext.Provider {...props} value={contextValue}>
      <rootLayout.element {...args}>
        {router && args ? (
          <Page
            router={router}
            args={args}
            onDataChange={handleDataChange}
            rootLayout={rootLayout}
            layoutIdx={0}
          />
        ) : router === null ? (
          notFound
        ) : (
          <></>
        )}
      </rootLayout.element>
    </RouterContext.Provider>
  )
}

export const useRouter = () => use(RouterContext)
