import Logo from '@/app/logo.svg' with { type: 'text' }
import { site } from '@/lib/site'
import { Link, Svg } from 'buntal'

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav
        aria-label="Main"
        className="container flex h-16 items-center justify-between gap-6"
      >
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Svg src={Logo} className="*:size-7" />
          {site.name}
        </Link>
        <ul className="hidden items-center gap-6 text-sm sm:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Start a project
        </Link>
      </nav>
    </header>
  )
}
