import Logo from '@/app/logo.svg' with { type: 'text' }
import LogoWithContextMenu from '@/components/logo-with-context-menu'
import { Spotlight } from '@/components/spotlight-new'
import { cn } from '@/lib/utils'
import { Link, useRouter } from 'buntal'

type MenuItem = {
  title: string
  href?: string
  items?: MenuItem[]
}

const MENUS: MenuItem[] = [
  {
    title: 'Get Started',
    href: '/docs'
  },
  {
    title: 'Installation',
    href: '/docs/install'
  },
  {
    title: 'Guides',
    items: [
      {
        title: 'HTTP Server',
        href: '/docs/guides/http-server'
      },
      {
        title: 'Full-stack Web',
        href: '/docs/guides/full-stack-web'
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
    <div className="drawer lg:drawer-open mx-auto">
      <input
        id="docs-layout-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content min-h-svh relative bg-base-100">
        <Spotlight />
        {children}
      </div>
      <div className="drawer-side z-20 !overscroll-none no-scrollbar">
        <label
          htmlFor="docs-layout-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu text-base-content min-h-full w-80 p-4 gap-0.5 backdrop-blur-sm bg-base-200 md:bg-base-100/0">
          <Link
            href="/"
            className="flex items-center gap-4 px-3 !h-10 group mb-3.5"
          >
            <LogoWithContextMenu
              src={Logo}
              className="[&>*]:size-10"
              filename="buntal-logo.svg"
            />
            <div className="flex flex-col -space-y-1">
              <h3 className="font-semibold text-lg group-hover:underline underline-offset-2 font-serif">
                Buntal JS
              </h3>
              <span className="text-xs text-base-content/60">v0.1.8</span>
            </div>
          </Link>
          {MENUS.map((menu) => (
            <li key={menu.title}>
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
                <h2 className="menu-title">{menu.title}</h2>
              )}
              {menu.items && (
                <ul className="space-y-0.5">
                  {menu.items.map((item: MenuItem) => (
                    <li key={item.title}>
                      {item.href && (
                        <Link
                          href={item.href}
                          className={cn(
                            'truncate',
                            pathname === item.href && 'menu-active'
                          )}
                        >
                          {item.title}
                        </Link>
                      )}
                      {!item.href && <a>{item.title}</a>}
                      {item.items && (
                        <ul className="space-y-0.5">
                          {item.items.map((subItem: MenuItem) => (
                            <li key={subItem.title}>
                              {subItem.href && (
                                <Link
                                  href={subItem.href}
                                  className={cn(
                                    'truncate',
                                    pathname === subItem.href && 'menu-active'
                                  )}
                                >
                                  {subItem.title}
                                </Link>
                              )}
                              {!subItem.href && <a>{subItem.title}</a>}
                              {subItem.items && (
                                <ul className="space-y-0.5">
                                  {subItem.items.map((nestedItem: MenuItem) => (
                                    <li key={nestedItem.title}>
                                      <Link
                                        href={nestedItem.href!}
                                        className={cn(
                                          'truncate',
                                          pathname === nestedItem.href &&
                                            'menu-active'
                                        )}
                                      >
                                        {nestedItem.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="flex md:hidden my-4">
            <Link href="/references">
              References
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
                className="size-4"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                <path d="M11 13l9 -9" />
                <path d="M15 4h5v5" />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
