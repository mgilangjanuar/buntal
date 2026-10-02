import Logo from '@/app/logo.svg' with { type: 'text' }
import { site } from '@/lib/site'
import { Link, Svg } from 'buntal'

export function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <nav
        aria-label="Main"
        className="container flex h-16 items-center justify-between"
      >
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Svg src={Logo} className="*:size-7" />
          {site.name}
        </Link>
        <ul className="flex items-center gap-5 text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            <Link
              href="/"
              className="hover:text-zinc-950 dark:hover:text-white"
            >
              Posts
            </Link>
          </li>
          <li>
            <Link
              href="/tags"
              className="hover:text-zinc-950 dark:hover:text-white"
            >
              Tags
            </Link>
          </li>
          <li>
            <a
              href="/rss.xml"
              className="hover:text-zinc-950 dark:hover:text-white"
            >
              RSS
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
