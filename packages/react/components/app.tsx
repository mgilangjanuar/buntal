import type { ReactNode } from 'react'
import { RouterProvider, type ServerRouterType } from './router'

export function App({ rootLayout, routes, notFound }: Readonly<{
  routes: ServerRouterType[],
  rootLayout?: (props: any) => ReactNode,
  notFound?: ReactNode
}>) {

  return <RouterProvider rootLayout={rootLayout} routes={routes} notFound={notFound} />
}
