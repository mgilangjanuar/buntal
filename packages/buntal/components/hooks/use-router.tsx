import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'
import type { ServerRouterType } from '.'
import type { MetaProps } from '../meta'
import { Notfound } from '../notfound'

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

type PageDataProps = {
  _meta?: MetaProps
  [key: string]: any
}

type PageArgs =
  | {
      query: Record<string, string>
      params: Record<string, string>
      data?: PageDataProps
    }
  | undefined

const Page = ({
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
  const fetchData = useCallback(
    async (idx: number) => {
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
    },
    [args?.query]
  )

  useEffect(() => {
    if (router) {
      if (router.layouts[layoutIdx]) {
        const layout = router.layouts[layoutIdx]
        if (layout.ssr) {
          fetchData(layoutIdx + 1).then((data) => {
            onDataChange(data)
          })
        } else {
          onDataChange(layout.data || {})
        }
      } else {
        if (router.ssr) {
          fetchData(-1).then((data) => {
            onDataChange(data)
          })
        } else {
          onDataChange(router.data || {})
        }
      }
    }
  }, [router, fetchData])

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
  }, [activeRoute])

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
      <rootLayout.element {...args}>
        {router ? (
          <Page
            router={router}
            args={args}
            onDataChange={(data) => {
              setArgs((args) => ({
                query: args?.query || {},
                params: args?.params || {},
                data: {
                  ...(data || {}),
                  ...(args?.data || {})
                }
              }))
            }}
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

export const useRouter = () => useContext(RouterContext)
