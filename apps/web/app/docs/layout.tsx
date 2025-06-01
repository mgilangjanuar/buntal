import Logo from '@/app/logo.svg' with { type: 'text' }
import { cn } from '@/lib/utils'
import { Link, Svg, useRouter } from 'buntal'
import { Suspense } from 'react'

const MENUS = [
  {
    title: 'Get Started',
    href: '/docs'
  },
  {
    title: 'Installation',
    href: '/docs/install'
  },
  {
    title: 'Variants',
    items: [
      {
        title: 'HTTP Server',
        href: '/docs/packages/http-server'
      },
      {
        title: 'Full-stack Web',
        href: '/docs/packages/full-stack-web'
      }
    ]
  }
]

export default function DocsLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { pathname } = useRouter()

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="docs-layout-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content min-h-svh bg-base-100">
        <Suspense
          fallback={
            <div className="flex flex-col p-4 w-full md:max-w-prose">
              <div className="h-14 flex flex-col items-start py-2">
                <div className="skeleton h-4 w-[20%]"></div>
              </div>
              <div className="skeleton h-6 w-[50%] mb-4"></div>
              <div className="skeleton h-32 w-full"></div>
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
      <div className="drawer-side z-20">
        <label
          htmlFor="docs-layout-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-0.5">
          <Link
            href="/"
            className="flex items-center gap-4 px-3 !h-10 group mb-3.5"
          >
            <Svg src={Logo} className="[&>*]:size-10" />
            <div className="flex flex-col -space-y-1">
              <h3 className="font-semibold text-lg group-hover:underline underline-offset-2">
                Buntal JS
              </h3>
              <span className="text-xs text-base-content/60">v0.0.13</span>
            </div>
          </Link>
          {MENUS.map((menu, i) => (
            <li key={i}>
              {menu.href ? (
                <Link
                  href={menu.href}
                  className={cn(
                    'truncate',
                    pathname === menu.href && 'menu-active'
                  )}
                >
                  {menu.title}
                </Link>
              ) : (
                <>
                  <h2 className="menu-title">{menu.title}</h2>
                  {menu.items && (
                    <ul className="space-y-0.5">
                      {menu.items.map((item, j) => (
                        <li key={j}>
                          <Link
                            href={item.href}
                            className={cn(
                              'truncate',
                              pathname === item.href && 'menu-active'
                            )}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
