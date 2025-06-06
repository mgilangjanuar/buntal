import ThemeSwitcher from '@/components/theme-switcher'

export default function Header({
  title
}: Readonly<{
  title: string
}>) {
  return (
    <header className="flex items-center !h-14 px-4 gap-4 shadow-sm shadow-base-300/50 sticky top-0 z-10 bg-base-100/80 backdrop-blur-sm">
      <label
        htmlFor="docs-layout-drawer"
        className="btn btn-square btn-sm btn-ghost drawer-button lg:hidden"
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
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M9 4l0 16" />
        </svg>
      </label>
      <div className="divider divider-horizontal mx-0 !w-1 py-3.5 lg:hidden"></div>
      <span className="text-sm truncate flex-1">{title}</span>
      <div className="flex items-center gap-1">
        <a
          href="https://github.com/mgilangjanuar/buntal"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-square btn-sm btn-ghost"
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
            className="!size-4 opacity-70"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
          </svg>
        </a>
        <ThemeSwitcher className="[&_svg]:size-4 [&_svg]:opacity-70 btn btn-ghost btn-square btn-sm" />
      </div>
    </header>
  )
}
