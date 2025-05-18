export type Req<T = unknown> = Request & {
  params?: Record<string, string>,
  query?: Record<string, string>,
  context?: T
}
