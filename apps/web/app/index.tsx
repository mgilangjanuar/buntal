import Logo from '@/app/logo.svg' with { type: 'text' }
import { Link, Svg } from 'buntal'

export default function HomePage() {
  return (
    <div className="min-h-svh flex flex-col justify-center container mx-auto max-w-prose relative">
      {/* <ThemeSwitcher className="absolute top-4 right-4 [&_svg]:!size-5" /> */}
      <div className="space-y-2">
        <Svg src={Logo} className="[&>*]:size-28" />
        <div className="flex items-center gap-2 text-sm badge badge-primary badge-ghost">
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-primary animate-ping"></div>
            <div className="status status-primary"></div>
          </div>{' '}
          Early Development
        </div>
        <h1 className="text-4xl font-bold">Buntal JS</h1>
        <p className="text-lg leading-7">
          Next.js alternative without{' '}
          <span className="line-through">Vercel</span> bloatware.
        </p>
        <div className="pt-4 flex items-center gap-2">
          <a
            href="https://github.com/mgilangjanuar/buntal"
            className="btn btn-ghost btn-neutral"
            target="_blank"
            rel="noopener noreferrer"
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
              className="!size-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
            v0.0.5
          </a>
          <Link href="/docs" className="btn btn-primary">
            Get Started
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
              className="!size-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M13 18l6 -6" />
              <path d="M13 6l6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
