import { ContactForm } from '@/components/contact-form'
import { Canonical, JsonLd } from '@/components/seo'
import { faqs, features, plans, projects, testimonials } from '@/content/home'
import { absoluteUrl, site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Link, type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    og: { url: absoluteUrl('/') }
  } satisfies MetaProps
}

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Canonical path="/" />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              name: site.name,
              url: site.url,
              email: site.email,
              sameAs: site.social.map((s) => s.href)
            },
            { '@type': 'WebSite', name: site.name, url: site.url }
          ]
        }}
      />

      <section className="container py-24 text-center sm:py-32">
        <p className="mx-auto mb-6 w-fit rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          Now booking projects for next quarter
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {site.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {site.description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="#contact"
            className="rounded-full bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-500"
          >
            Start a project
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-zinc-300 px-6 py-3 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            See our work
          </Link>
        </div>
      </section>

      <section
        id="features"
        className="scroll-mt-20 bg-zinc-50 py-24 dark:bg-zinc-900/50"
      >
        <div className="container">
          <SectionHeading
            eyebrow="Services"
            title="Everything you need to launch"
            description="One small team for strategy, design and engineering."
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <li
                key={feature.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="work" className="container scroll-mt-20 py-24">
        <SectionHeading eyebrow="Selected work" title="Recent projects" />
        <ul className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block h-full rounded-2xl border border-zinc-200 p-6 transition hover:border-indigo-400 dark:border-zinc-800"
              >
                <p className="text-sm text-zinc-500">
                  {project.client} &middot; {project.year}
                </p>
                <h3 className="mt-2 text-xl font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {project.title}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {project.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-zinc-50 py-24 dark:bg-zinc-900/50">
        <div className="container">
          <SectionHeading eyebrow="Testimonials" title="Teams we have helped" />
          <ul className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name}>
                <figure className="h-full rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                  <blockquote className="text-lg">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-950 dark:text-white">
                      {t.name}
                    </span>
                    , {t.title}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="pricing" className="container scroll-mt-20 py-24">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, fixed pricing"
          description="Pick a starting point. Every project begins with a free call."
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={cn(
                'flex flex-col rounded-2xl border p-8',
                plan.highlighted
                  ? 'border-indigo-500 ring-2 ring-indigo-500'
                  : 'border-zinc-200 dark:border-zinc-800'
              )}
            >
              <h3 className="font-semibold">{plan.name}</h3>
              <p className="mt-4 text-4xl font-bold">{plan.price}</p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {plan.description}
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f}>&#10003; {f}</li>
                ))}
              </ul>
              <Link
                href="#contact"
                className={cn(
                  'mt-8 rounded-full px-4 py-2.5 text-center font-medium',
                  plan.highlighted
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900'
                )}
              >
                Get started
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-zinc-50 py-24 dark:bg-zinc-900/50">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="cursor-pointer list-none font-medium marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="container max-w-3xl scroll-mt-20 py-24">
        <SectionHeading
          eyebrow="Contact"
          title="Tell us about your project"
          description={`Or email ${site.email}.`}
        />
        <ContactForm />
      </section>
    </>
  )
}
