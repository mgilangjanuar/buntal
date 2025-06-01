import { useState } from 'preact/hooks'
import { RouterProvider, type ServerRouterType } from './hooks'

export function App({
  rootLayout,
  routes,
  notFound
}: Readonly<{
  routes: ServerRouterType[]
  rootLayout?: (props: any) => any
  notFound?: any
}>) {
  // const [state, setState] = useState(null)
  return (
    // <RouterProvider
    //   rootLayout={rootLayout}
    //   routes={routes}
    //   notFound={notFound}
    // />
    <div>
      <button>test</button>
    </div>
  )
}
