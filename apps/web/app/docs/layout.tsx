import Logo from '@/app/logo.svg' with { type: 'text' }
import LogoWithContextMenu from '@/components/logo-with-context-menu'
import { Spotlight } from '@/components/spotlight-new'
import { cn } from '@/lib/utils'
import { Link, useRouter } from 'buntal'

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
  },
  {
    title: 'Type Reference',
    items: [
      {
        title: 'Http Class',
        href: '/docs/references/http-class'
      },
      {
        title: 'Req Class',
        href: '/docs/references/req-class'
      },
      {
        title: 'Res Class',
        href: '/docs/references/res-class'
      },
      {
        title: 'Config Type',
        href: '/docs/references/config-type'
      },
      {
        title: 'BuntalConfig',
        href: '/docs/references/buntal-config'
      },
      {
        title: 'RouterType',
        href: '/docs/references/router-types'
      },
      {
        title: 'ServerRouterType',
        href: '/docs/references/server-router-types'
      },
      {
        title: 'AtomicHandler',
        href: '/docs/references/atomic-handler'
      },
      {
        title: 'ExtractRouteParams',
        href: '/docs/references/extract-route-params'
      },
      {
        title: 'MetaProps',
        href: '/docs/references/meta-props'
      },
      {
        title: 'LinkProps',
        href: '/docs/references/link-props'
      },
      {
        title: 'ScriptProps',
        href: '/docs/references/script-props'
      },
      {
        title: 'SvgProps',
        href: '/docs/references/svg-props'
      },
      {
        title: 'AppProps',
        href: '/docs/references/app-props'
      },
      {
        title: 'PageProps',
        href: '/docs/references/page-props'
      },
      {
        title: 'LayoutProps',
        href: '/docs/references/layout-props'
      },
      {
        title: 'AuthOptions',
        href: '/docs/references/auth-options'
      },
      {
        title: 'CORSOptions',
        href: '/docs/references/cors-options'
      },
      {
        title: 'JWT Function',
        href: '/docs/references/jwt-function'
      },
      {
        title: 'Hash Function',
        href: '/docs/references/hash-function'
      },
      {
        title: 'CookieOptions',
        href: '/docs/references/cookie-options'
      },
      {
        title: 'Cookie Utilities',
        href: '/docs/references/cookie-utilities'
      },
      {
        title: 'Hook Types',
        href: '/docs/references/hook-types'
      },
      {
        title: 'Server Types',
        href: '/docs/references/server-types'
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
      <div className="drawer-content min-h-svh relative">
        <Spotlight />
        {children}
      </div>
      <div className="drawer-side z-20">
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
              <span className="text-xs text-base-content/60">v0.0.24</span>
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
                <>
                  <h2 className="menu-title">{menu.title}</h2>
                  {menu.items && (
                    <ul className="space-y-0.5">
                      {menu.items.map((item) => (
                        <li key={item.title}>
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
