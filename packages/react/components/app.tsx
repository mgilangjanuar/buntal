import type { ReactNode } from 'react'
import { RouterProvider, type ServerRouterType } from './router'

export function App({ routes, notFound }: Readonly<{
  routes: ServerRouterType[],
  notFound?: ReactNode
}>) {

  return <RouterProvider routes={routes} notFound={notFound} />
}
