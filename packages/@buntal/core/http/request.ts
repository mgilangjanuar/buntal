export type Req<P = Record<string, string>, T = unknown> = Request & {
  params: P,
  query?: Record<string, string>,
  context?: T
}
