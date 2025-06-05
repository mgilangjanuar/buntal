import Logo from '@/app/logo.svg' with { type: 'text' }
import { AnimatedGridPattern } from '@/components/animated-grid'
import ThemeSwitcher from '@/components/theme-switcher'
import { cn } from '@/lib/utils'
import { Link, Svg } from 'buntal'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

export default function HomePage() {
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
        <div className="container mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
          <motion.div
            className="flex items-center"
            initial={false}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Svg src={Logo} className="[&>*]:size-8 flex justify-center" />
          </motion.div>
          <h2 className="text-lg font-semibold tracking-tight">Buntal JS</h2>
          <div className="ml-auto flex gap-1 items-center">
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
            repeatDelay={1}
            className={cn(
              '[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]',
              'inset-x-0 inset-y-0 h-[100%] opacity-50'
            )}
          />
        </motion.div>
        <div className="container mx-auto">
          <div className="flex gap-4 py-20 lg:py-40 items-center justify-center flex-col [&>div]:z-10">
            <motion.div
              className="flex justify-center"
              animate={{
                scale: scrollY > 50 ? 0.17 : 1,
                opacity: scrollY > 50 ? 0 : 1,
                y: scrollY > 50 ? -140 : 0,
                x: scrollY > 50 ? -480 : 0
              }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <Svg
                src={Logo}
                className="[&>*]:size-28 md:[&>*]:size-44 flex justify-center"
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
                      key={index}
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
                <strong className="font-semibold">Buntal JS</strong> is a
                wrapper of Bun and React. With Next.js-like file system routing,
                without the forever-loading app router.
              </p>
            </div>
            <div className="flex flex-row gap-3 mt-4">
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
                v0.0.19
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
      <div className="py-[100svh]"></div>
    </main>
  )
}
