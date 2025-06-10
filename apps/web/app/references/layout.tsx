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
    title: 'Overview',
    href: '/references'
  },
  {
    title: '@buntal/core',
    href: '/references/core',
    items: [
      {
        title: 'Http',
        href: '/references/core/http',
        items: [
          {
            title: 'App',
            href: '/references/core/http/app'
          },
          {
            title: 'buildRouter',
            href: '/references/core/http/build-router'
          },
          {
            title: 'h',
            href: '/references/core/http/h'
          },
          {
            title: 'AtomicHandler',
            href: '/references/core/http/atomic-handler'
          },
          {
            title: 'Req',
            href: '/references/core/http/req'
          },
          {
            title: 'Res',
            href: '/references/core/http/res'
          },
          {
            title: 'cookie',
            href: '/references/core/http/cookie'
          },
          {
            title: 'CookieOptions',
            href: '/references/core/http/cookie-options'
          }
        ]
      },
      {
        title: 'Security',
        href: '/references/core/security',
        items: [
          {
            title: 'jwt',
            href: '/references/core/security/jwt'
          },
          {
            title: 'hash',
            href: '/references/core/security/hash'
          }
        ]
      },
      {
        title: 'Types',
        href: '/references/core/types',
        items: [
          {
            title: 'ExtractRouteParams',
            href: '/references/core/types/extract-route-params'
          }
        ]
      },
      {
        title: 'Middleware',
        href: '/references/core/middleware',
        items: [
          {
            title: 'auth',
            href: '/references/core/middleware/auth'
          },
          {
            title: 'cors',
            href: '/references/core/middleware/cors'
          },
          {
            title: 'logger',
            href: '/references/core/middleware/logger'
          }
        ]
      }
    ]
  },
  {
    title: 'buntal',
    href: '/references/buntal',
    items: [
      {
        title: 'Configuration',
        href: '/references/buntal/configuration',
        items: [
          {
            title: 'BuntalConfig',
            href: '/references/buntal/configuration/buntal-config'
          }
        ]
      },
      {
        title: 'Components',
        href: '/references/buntal/components',
        items: [
          {
            title: 'App',
            href: '/references/buntal/components/app'
          },
          {
            title: 'useRouter',
            href: '/references/buntal/components/use-router'
          },
          {
            title: 'Link',
            href: '/references/buntal/components/link'
          },
          {
            title: 'Meta',
            href: '/references/buntal/components/meta'
          },
          {
            title: 'Script',
            href: '/references/buntal/components/script'
          },
          {
            title: 'Svg',
            href: '/references/buntal/components/svg'
          }
        ]
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
    <div className="drawer lg:drawer-open max-w-[1360px] mx-auto">
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
              <span className="text-xs text-base-content/60">v0.0.25</span>
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
        </ul>
      </div>
    </div>
  )
}
