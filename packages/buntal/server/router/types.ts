import type { ReactNode } from 'react'
import type { MetaProps } from '../../components'

export type RouteBuilderResult = {
  route: string
  safeImport: string
  regex: string
  ssr: boolean
  data?: unknown
  layouts: {
    filePath: string
    ssr?: boolean
    data?: unknown
  }[]
  layoutsSafeImport: RouteBuilderResult['layouts']
}

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
