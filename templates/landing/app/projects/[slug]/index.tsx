import { Canonical, JsonLd, NoIndex } from '@/components/seo'
import { projects } from '@/content/home'
import { absoluteUrl, site } from '@/lib/site'
import type { Req } from '@buntal/http'
import { Link, type MetaProps } from 'buntal'

export const $ = (req: Req<{ slug: string }>) => {
  const project = projects.find((p) => p.slug === req.params.slug)
  if (!project) {
    return { project: null, _meta: { title: `Not found | ${site.name}` } }
  }
  const url = absoluteUrl(`/projects/${project.slug}`)
  return {
    project,
    _meta: {
      title: `${project.title} | ${site.name}`,
      description: project.summary,
      og: { url, type: 'article' }
    } satisfies MetaProps
  }
}

export default function ProjectPage({ data }: { data?: ReturnType<typeof $> }) {
  const project = data?.project
  if (!project) {
    return (
      <section className="container py-20">
        <NoIndex />
        <h1 className="text-3xl font-bold">Project not found</h1>
        <Link href="/projects" className="mt-4 inline-block underline">
          Back to all work
        </Link>
      </section>
    )
  }

  return (
    <article className="container max-w-3xl py-20">
      <Canonical path={`/projects/${project.slug}`} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.summary,
          dateCreated: String(project.year),
          creator: { '@type': 'Organization', name: site.name, url: site.url }
        }}
      />
      <Link href="/projects" className="text-sm text-zinc-500 hover:underline">
        &larr; All work
      </Link>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
        {project.summary}
      </p>
      <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-zinc-200 py-6 text-sm sm:grid-cols-4 dark:border-zinc-800">
        <div>
          <dt className="text-zinc-500">Client</dt>
          <dd className="font-medium">{project.client}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Year</dt>
          <dd className="font-medium">{project.year}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Role</dt>
          <dd className="font-medium">{project.role}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Stack</dt>
          <dd className="font-medium">{project.stack.join(', ')}</dd>
        </div>
      </dl>
      {project.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          <p className="mt-3 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            {section.body}
          </p>
        </section>
      ))}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-full bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-500"
        >
          Visit live site
        </a>
      )}
    </article>
  )
}
