import type { ReactNode } from 'react'
import type { MetaProps } from '../../components'

export * from './build'

export type ServerRouterType = {
  regex: string
  ssr?: boolean
  data?: {
    _meta?: MetaProps
    [key: string]: any
  }
  element: (data: any) => ReactNode
  layouts: {
    element: (data: any) => ReactNode
    ssr?: boolean
    data?: {
      _meta?: MetaProps
      [key: string]: any
    }
  }[]
}
