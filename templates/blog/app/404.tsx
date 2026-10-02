import { NoIndex } from '@/components/seo'
import { Link } from 'buntal'

export default function NotFound() {
  return (
    <section className="container py-32 text-center">
      <NoIndex />
      <p className="text-sm font-semibold text-indigo-600">404</p>
      <h1 className="mt-2 text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-500"
      >
        Go home
      </Link>
    </section>
  )
}
