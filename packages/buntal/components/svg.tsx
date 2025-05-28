export function Svg({ src, className }: { src: string; className?: string }) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: src
      }}
    />
  )
}
