import type { ReactNode } from 'react'
import { RouterProvider } from '../hooks'
import type { ServerRouterType } from '../server/router'

export function App({
  rootLayout,
  routes,
  notFound
}: Readonly<{
  routes: ServerRouterType[]
  rootLayout: {
    element: (data: any) => ReactNode
    ssr?: boolean
    data?: unknown
  }
  notFound?: ReactNode
}>) {
  return (
    <RouterProvider
      rootLayout={rootLayout}
      routes={routes}
      notFound={notFound}
    />
  )
}
