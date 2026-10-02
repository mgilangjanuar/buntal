import { Canonical } from '@/components/seo'
import { projects } from '@/content/home'
import { absoluteUrl, site } from '@/lib/site'
import { Link, type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: `Work | ${site.name}`,
    description: `Case studies and selected projects by ${site.name}.`,
    og: { url: absoluteUrl('/projects') }
  } satisfies MetaProps
}

export default function ProjectsPage() {
  return (
    <section className="container py-20">
      <Canonical path="/projects" />
      <h1 className="text-4xl font-bold tracking-tight">Work</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        A few projects we are proud of.
      </p>
      <ul className="mt-12 divide-y divide-zinc-200 dark:divide-zinc-800">
        {projects.map((project) => (
          <li key={project.slug} className="py-6">
            <Link
              href={`/projects/${project.slug}`}
              className="group grid gap-2 sm:grid-cols-[1fr_auto]"
            >
              <div>
                <h2 className="text-2xl font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {project.title}
                </h2>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                  {project.summary}
                </p>
              </div>
              <p className="text-sm text-zinc-500">
                {project.client} &middot; {project.year}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
