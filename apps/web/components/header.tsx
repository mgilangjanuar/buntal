export default function Header({
  title
}: Readonly<{
  title: string
}>) {
  return (
    <header className="flex items-center !h-14 px-4 gap-4 shadow-sm sticky top-0">
      <label
        htmlFor="docs-layout-drawer"
        className="btn btn-square btn-sm btn-ghost drawer-button lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="!size-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M9 4l0 16" />
        </svg>
      </label>
      <div className="divider divider-horizontal mx-0 !w-1 py-3.5 lg:hidden"></div>
      <span className="text-sm truncate">{title}</span>
    </header>
  )
}
