import { site } from '@/lib/site'
import { Link } from 'buntal'

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-10 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. Built with{' '}
          <a
            href="https://buntaljs.org"
            className="underline underline-offset-4"
          >
            Buntal
          </a>
          .
        </p>
        <ul className="flex gap-5">
          {site.social.map((item) => (
            <li key={item.href}>
              <Link href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
