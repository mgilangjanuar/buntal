import Logo from '@/app/logo.svg' with { type: 'text' }
import LogoWithContextMenu from '@/components/logo-with-context-menu'
import { Link } from 'buntal'

export default function Footer() {
  return (
    <div className="w-full relative">
      <div className="container mx-auto border-t border-base-300">
        <footer className="container mx-auto py-12 max-w-screen-lg">
          <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            <div className="flex flex-col gap-8 lg:col-span-2">
              <div className="space-y-4">
                <div>
                  <LogoWithContextMenu
                    src={Logo}
                    className="[&>*]:size-20 flex justify-start"
                    filename="buntal-logo.svg"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  CONTACT
                </p>
                <div className="flex flex-col gap-4 text-base-content/60">
                  <div className="flex gap-1.5 items-center">
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
                      className="size-4"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                      <path d="M3 7l9 6l9 -6" />
                    </svg>
                    <a
                      href="mailto:hi@buntaljs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline underline-offset-4"
                    >
                      hi@buntaljs.org
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-base-content/60">
                  <div className="flex gap-1.5 items-center">
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
                      className="size-4"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                    </svg>
                    <a
                      href="https://x.com/buntal_js"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline underline-offset-4"
                    >
                      @buntal_js
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-base-content/60">
                  <div className="flex gap-1.5 items-center">
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
                    <a
                      href="https://github.com/mgilangjanuar/buntal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline underline-offset-4"
                    >
                      mgilangjanuar/buntal
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  NAVIGATION
                </p>
                <div className="flex flex-wrap gap-12 text-base-content/60">
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/"
                      className="hover:underline underline-offset-4"
                    >
                      Home
                    </Link>
                    <Link
                      href="/docs"
                      className="hover:underline underline-offset-4"
                    >
                      Docs
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/license"
                      className="hover:underline underline-offset-4"
                    >
                      License
                    </Link>
                    <Link
                      href="/code-of-conduct"
                      className="hover:underline underline-offset-4"
                    >
                      Code of Conduct
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
