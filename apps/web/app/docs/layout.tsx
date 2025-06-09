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
    title: 'API Reference',
    items: [
      {
        title: 'Http',
        href: '/docs/references/http'
      },
      {
        title: 'Req',
        href: '/docs/references/req'
      },
      {
        title: 'Res',
        href: '/docs/references/res'
      },
      {
        title: 'AtomicHandler',
        href: '/docs/references/atomic-handler'
      },
      {
        title: 'buildRouter',
        href: '/docs/references/build-router'
      },
      {
        title: 'cookie',
        href: '/docs/references/cookie'
      },
      {
        title: 'CookieOptions',
        href: '/docs/references/cookie-options'
      },
      {
        title: 'jwt',
        href: '/docs/references/jwt'
      },
      {
        title: 'hash',
        href: '/docs/references/hash'
      },
      {
        title: 'auth',
        href: '/docs/references/auth'
      },
      {
        title: 'cors',
        href: '/docs/references/cors'
      },
      {
        title: 'logger',
        href: '/docs/references/logger'
      },
      {
        title: 'BuntalConfig',
        href: '/docs/references/buntal-config'
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
