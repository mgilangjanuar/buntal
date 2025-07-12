import ThemeSwitcher from '@/components/theme-switcher'
import SearchTrigger from '@/components/search/search-trigger'
import { cn } from '@/lib/utils'
import { Link, useRouter } from 'buntal'

export default function Header({
  title
}: Readonly<{
  title: string
}>) {
  const { pathname } = useRouter()

  return (
    <header className="!h-14 sticky top-0 z-10 bg-gradient-to-r xl:bg-none to-base-100/0 via-base-100/50 from-base-100/0 backdrop-blur-sm xl:backdrop-blur-none grid gap-8 xl:grid-cols-[1fr_322px] px-4">
      <div className="flex items-center lg:justify-end xl:justify-start gap-4 w-full xl:col-start-2">
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
        <span className="text-sm truncate flex-1 block lg:hidden">{title}</span>
        <div className="flex items-center gap-1 xl:pl-8">
          <Link
            href="/docs"
            className={cn(
              'hidden sm:flex btn btn-link text-sm text-base-content/60 hover:text-base-content underline-offset-4 btn-sm no-underline',
              pathname.startsWith('/docs') && 'text-base-content'
            )}
          >
            Docs
          </Link>
          <Link
            href="/references"
            className={cn(
              'hidden sm:flex btn btn-link text-sm text-base-content/60 hover:text-base-content underline-offset-4 btn-sm no-underline',
              pathname.startsWith('/references') && 'text-base-content'
            )}
          >
            References
          </Link>
          <SearchTrigger />
          <a
            href="https://github.com/mgilangjanuar/buntal"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-square btn-sm btn-ghost opacity-60 hover:opacity-100"
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
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
          </a>
          <ThemeSwitcher className="[&_svg]:size-4 opacity-60 hover:opacity-100 btn btn-ghost btn-square btn-sm" />
        </div>
      </div>
    </header>
  )
}
