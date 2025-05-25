import { RouterProvider, type ServerRouterType } from './router'

export function App({ routes }: Readonly<{
  routes: ServerRouterType[]
}>) {

  return <RouterProvider routes={routes} />
}
