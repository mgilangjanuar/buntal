import { site } from '@/lib/site'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-200 py-10 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      <div className="container">
        &copy; {new Date().getFullYear()} {site.author.name}. Built with{' '}
        <a href="https://buntaljs.org" className="underline underline-offset-4">
          Buntal
        </a>
        .
      </div>
    </footer>
  )
}
