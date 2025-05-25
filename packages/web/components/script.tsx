export function Script({
  ref,
  ...props
}: {
  ref?: React.Ref<HTMLScriptElement>
} & React.HTMLAttributes<HTMLScriptElement>) {
  return <script ref={ref} {...props} />
}
