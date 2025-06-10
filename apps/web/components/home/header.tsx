import Logo from '@/app/logo.svg' with { type: 'text' }
import LogoWithContextMenu from '@/components/logo-with-context-menu'
import ThemeSwitcher from '@/components/theme-switcher'
import { Link } from 'buntal'
import {
  motion,
  type AnimationControls,
  type TargetAndTransition,
  type VariantLabels
} from 'motion/react'

export default function Header({
  animate
}: Readonly<{
  animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean
}>) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-base-100/80 backdrop-blur-sm"
      initial={animate ? { y: -100, opacity: 0 } : {}}
      animate={animate}
      transition={animate ? { duration: 0.3, ease: 'easeInOut' } : {}}
    >
      <div className="container mx-auto max-w-5xl px-4 py-3 flex items-center gap-4">
        <Link className="flex gap-3 items-center" href="/">
          <motion.div
            className="flex items-center"
            initial={false}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <LogoWithContextMenu
              src={Logo}
              className="[&>*]:size-8 flex justify-center"
              filename="buntal-logo.svg"
            />
          </motion.div>
          <h2 className="text-lg font-semibold tracking-tight font-serif">
            Buntal JS
          </h2>
        </Link>
        <div className="ml-auto flex gap-1 items-center">
          <Link
            href="/docs"
            className="btn btn-link text-sm text-base-content/60 hover:text-base-content underline-offset-4 btn-sm"
          >
            Docs
          </Link>
          <a
            href="https://github.com/mgilangjanuar/buntal"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-square btn-sm btn-ghost opacity-60 hover:opacity-100"
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
              className="!size-4"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
          </a>
          <ThemeSwitcher className="[&_svg]:size-4 opacity-60 hover:opacity-100 btn btn-ghost btn-square btn-sm" />
        </div>
      </div>
    </motion.header>
  )
}
