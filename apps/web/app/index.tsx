import Logo from '@/app/logo.svg' with { type: 'text' }
import { AnimatedGridPattern } from '@/components/animated-grid'
import Code from '@/components/code'
import LogoWithContextMenu from '@/components/logo-with-context-menu'
import ThemeSwitcher from '@/components/theme-switcher'
import { WobbleCard } from '@/components/wobble-card'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'
import { Link } from 'buntal'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

export const $ = async () => {
  const resp = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GH_PERSONAL_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `query {
        user(login:"mgilangjanuar") {
          ... on Sponsorable {
            sponsors(first: 100) {
              totalCount
              nodes {
                ... on User { login, avatarUrl, name }
              }
            }
          }
        }
      }`,
      variables: {}
    })
  })
  const json = await resp.json()
  return {
    sponsors: json.data.user.sponsors.nodes as {
      login: string
      avatarUrl: string
      name: string
    }[]
  }
}

export default function HomePage({
  data
}: Readonly<{ data?: {} | Awaited<ReturnType<typeof $>> }>) {
  const { theme } = useTheme()
  const [titleNumber, setTitleNumber] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const titles = useMemo(
    () => [
      'simple',
      'bloatware-free',
      'blazing fast',
      'type-safe',
      'lightweight',
      'developer-friendly'
    ],
    []
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrollY(scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen">
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-base-100/80 backdrop-blur-sm border-b border-base-200"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: scrollY > 50 ? 0 : -100,
          opacity: scrollY > 50 ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
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
              className="btn btn-link text-sm text-base-content/70 hover:text-base-content underline-offset-4 btn-sm"
            >
              Docs
            </Link>
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
        </div>
      </motion.header>

      <div className="w-full relative">
        <motion.div
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
          className="absolute inset-0 z-0"
        >
          <AnimatedGridPattern
            width={100}
            height={100}
            numSquares={15}
            maxOpacity={0.1}
            duration={3}
            className={cn(
              '[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]',
              'inset-x-0 inset-y-0 h-[100%] opacity-85 dark:opacity-35'
            )}
          />
        </motion.div>
        <div className="container mx-auto">
          <div className="flex gap-4 py-20 lg:py-40 items-center justify-center flex-col [&>div]:z-10">
            <motion.div
              className="flex justify-center !z-20"
              animate={{
                scale: scrollY > 50 ? 0.17 : 1,
                opacity: scrollY > 50 ? 0 : 1,
                y: scrollY > 50 ? -140 : 0,
                x: scrollY > 50 ? -480 : 0
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <LogoWithContextMenu
                src={Logo}
                className="[&>*]:size-28 md:[&>*]:size-44 flex justify-center"
                filename="buntal-logo.svg"
              />
            </motion.div>
            <div className="flex items-center gap-2 text-sm badge badge-ghost">
              <div className="inline-grid *:[grid-area:1/1]">
                <div className="status status-warning animate-ping"></div>
                <div className="status status-warning"></div>
              </div>{' '}
              Early Development
            </div>
            <div className="flex gap-4 flex-col max-w-2xl w-full">
              <h1 className="text-4xl md:text-7xl tracking-tight text-center font-regular">
                <span className="text-balance inline-block font-serif">
                  Framework that is
                </span>
                <span className="relative flex w-full justify-center overflow-hidden text-center pb-4 pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={title}
                      className="absolute font-semibold font-serif"
                      initial={{ opacity: 0, y: 0 }}
                      transition={{ type: 'keyframe', stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? {
                              y: 0,
                              opacity: 1
                            }
                          : {
                              y: titleNumber > index ? -150 : 150,
                              opacity: 0
                            }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-base-content/80 max-w-2xl text-center">
                <strong className="font-bold font-serif">Buntal JS</strong> is a
                wrapper of Bun and React. With Next.js-like file system routing,
                without the forever-loading app router.
              </p>
            </div>
            <div className="grid grid-col-1 mt-4">
              <Code
                language="sh"
                className="overflow-x-auto text-sm md:text-base"
              >
                {'bun create buntal@latest my-app'}
              </Code>
            </div>
            <div className="flex flex-row gap-3 mt-2">
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
                v0.0.22
              </a>
              <Link href="/docs" className="btn btn-primary btn-soft">
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
      </div>
      <div className="w-full relative">
        <div className="container mx-auto">
          <div className="flex gap-8 pb-20 lg:pb-40 items-center justify-center flex-col">
            <p className="text-base-content/50 text-sm">sponsored by</p>
            <div>
              <a
                href="https://m.do.co/c/4aad6c899906"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={
                    theme === 'dark'
                      ? '/DO_Logo_horizontal_white.svg'
                      : '/DO_Logo_horizontal_blue.svg'
                  }
                  alt="DigitalOcean Referral Badge"
                  className="max-w-56 w-full h-auto"
                />
              </a>
            </div>
            <div className="flex gap-3 items-center flex-wrap">
              {data &&
                'sponsors' in data &&
                data.sponsors.map((sponsor) => (
                  <a
                    key={sponsor.login}
                    href={`https://github.com/${sponsor.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={sponsor.avatarUrl}
                      className="size-12 rounded-md"
                      alt={sponsor.name}
                    />
                  </a>
                ))}
              <div className="tooltip tooltip-bottom" data-tip="Could be you!">
                <a
                  href="https://github.com/sponsors/mgilangjanuar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!size-12 rounded-md flex items-center justify-center flex-col border border-dashed opacity-50 hover:opacity-100"
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
                    className="size-5 block"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <div className="container mx-auto">
          <div className="pb-20 lg:pb-40 grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl mx-auto w-full">
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[560px] lg:min-h-[300px]"
              className=""
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-lg md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Ultra-lightweight framework without bloatware
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200">
                  Buntal JS is a lightweight solution (
                  <strong className="font-semibold">~30 kB</strong> unpacked)
                  for building REST APIs and full-stack web apps, achieved by
                  minimizing unnecessary dependencies.
                </p>
              </div>
              <img
                src="/08.46.20@2x.png?v=2"
                alt="ultra-lightweight framework"
                className="absolute -right-8 filter -bottom-2 object-contain rounded-2xl bg-center grayscale bg-cover max-w-[280px] md:max-w-xs"
              />
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 min-h-[300px]">
              <h2 className="max-w-80  text-left text-balance text-lg md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                SSR, SPA, file-based routing, and more
              </h2>
              <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                Everything out of the box. Building web apps without headaches.
              </p>
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
              <div className="max-w-sm">
                <h2 className="max-w-sm md:max-w-lg text-left text-balance text-lg md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Blazing fast & type-safe by default
                </h2>
                <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                  Built on Bun's native HTTP server, known for its speed and
                  reaching{' '}
                  <strong className="font-semibold">&gt; 2k RPS.</strong> Also
                  written in TypeScript with strictly typed parameters, ensuring
                  robust and reliable code.
                </p>
              </div>
              <img
                src="/2025-05-29@2x.png"
                alt="type-safe params"
                className="absolute -right-2 filter -bottom-6 object-contain rounded-2xl bg-center bg-cover max-w-xs md:max-w-md"
              />
            </WobbleCard>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <div className="container mx-auto">
          <div className="pb-20 lg:pb-40 mx-auto max-w-lg w-fit text-base-content/80 space-y-3">
            <div className="grid grid-cols-[104px_112px_68px] md:grid-cols-[104px_240px_62px] content-center gap-4">
              <div className="col-start-3">
                <p className="text-left font-mono text-sm leading-normal text-base-content/50 pl-2 md:pl-0.5">
                  rps
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[104px_112px_68px] md:grid-cols-[104px_240px_62px] content-center gap-4">
              <div className="text-right leading-tight">
                <p className="text-right">@buntal/core</p>
                <p className="text-base-content/50 text-xs">bun</p>
              </div>
              <progress
                className="progress h-3 progress-secondary w-28 md:w-60 mt-1"
                value="100"
                max="100"
              ></progress>
              <div>
                <p className="text-right font-mono text-sm leading-normal">
                  2099.56
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[104px_112px_68px] md:grid-cols-[104px_240px_62px] content-center gap-4">
              <div className="text-right leading-tight">
                <p className="text-right">Elysia</p>
                <p className="text-base-content/50 text-xs">bun</p>
              </div>
              <progress
                className="progress h-3 w-28 md:w-60 mt-1"
                value={(2096.58 / 2099.56) * 100}
                max="100"
              ></progress>
              <div>
                <p className="text-right font-mono text-sm leading-normal">
                  2096.58
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[104px_112px_68px] md:grid-cols-[104px_240px_62px] content-center gap-4">
              <div className="text-right leading-tight">
                <p className="text-right">Gin</p>
                <p className="text-base-content/50 text-xs">go</p>
              </div>
              <progress
                className="progress h-3 w-28 md:w-60 mt-1"
                value={(1987.36 / 2099.56) * 100}
                max="100"
              ></progress>
              <div>
                <p className="text-right font-mono text-sm leading-normal">
                  1987.36
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[104px_112px_68px] md:grid-cols-[104px_240px_62px] content-center gap-4">
              <div className="text-right leading-tight">
                <p className="text-right">Express.js</p>
                <p className="text-base-content/50 text-xs">node</p>
              </div>
              <progress
                className="progress h-3 w-28 md:w-60 mt-1"
                value={(1376.42 / 2099.56) * 100}
                max="100"
              ></progress>
              <div>
                <p className="text-right font-mono text-sm leading-normal">
                  1376.42
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[104px_112px_68px] md:grid-cols-[104px_240px_62px] content-center gap-4">
              <div className="text-right leading-tight">
                <p className="text-right">FastAPI</p>
                <p className="text-base-content/50 text-xs">uvicorn</p>
              </div>
              <progress
                className="progress h-3 w-28 md:w-60 mt-1"
                value={(835.9 / 2099.56) * 100}
                max="100"
              ></progress>
              <div>
                <p className="text-right font-mono text-sm leading-normal">
                  835.90
                </p>
              </div>
            </div>
            <div className="text-right mt-8 text-xs text-base-content/50">
              <p>*) Tested on MacBook M1 Pro in June 2025.</p>
              <p>
                Run the benchmark script{' '}
                <a
                  href="https://github.com/mgilangjanuar/buntal/tree/main/benchmark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 font-medium"
                >
                  here
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
