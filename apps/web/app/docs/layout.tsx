import Logo from "@/app/logo.svg" with { type: 'text' }
import { Link, Svg } from 'buntal'

export default function DocsLayout({ children }: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="docs-layout-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="docs-layout-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-0.5">
          <Link href="/" className="flex items-center gap-4 px-3 !h-10 group mb-3">
            <Svg src={Logo} className="[&>*]:size-10" />
            <div className="flex flex-col -space-y-1">
              <h3 className="font-semibold text-lg group-hover:underline underline-offset-2">Buntal JS</h3>
              <span className="text-xs text-base-content/60">v0.0.3</span>
            </div>
          </Link>
          <li>
            <span className="grid grid-cols-1">
              <Link href="/docs" className="truncate">
                Get Started
              </Link>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
