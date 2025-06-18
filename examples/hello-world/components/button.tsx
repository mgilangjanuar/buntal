export function Button({
  children,
  ref,
  ...props
}: Readonly<
  {
    children?: React.ReactNode
    ref: React.Ref<HTMLButtonElement>
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>) {
  return (
    <button
      ref={ref}
      className="px-4 h-10 flex justify-center items-center border rounded-md cursor-pointer text-sm gap-2 font-semibold"
      {...props}
    >
      {children}
    </button>
  )
}
