import Logo from '@/app/logo.svg' with { type: 'text' }
import { AnimatedGridPattern } from '@/components/animated-grid'
import { cn } from '@/lib/utils'
import { Svg } from 'buntal'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

export default function HomePage() {
  const [titleNumber, setTitleNumber] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
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
      setIsScrolled(scrollY > 30)
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
          y: isScrolled ? 0 : -100,
          opacity: isScrolled ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="container mx-auto max-w-3xl px-4 py-3 flex items-center gap-3">
          <motion.div
            className="flex items-center"
            initial={false}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Svg src={Logo} className="[&>*]:size-10 flex justify-center" />
          </motion.div>
          <h2 className="text-xl font-semibold tracking-tight">Buntal JS</h2>
        </div>
      </motion.header>

      <div className="w-full relative">
        <AnimatedGridPattern
          width={100}
          height={100}
          numSquares={15}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            '[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-0 h-[100%] -skew-y-12',
            'opacity-50'
          )}
        />
        <div className="container mx-auto">
          <div className="flex gap-4 py-20 lg:py-40 items-center justify-center flex-col">
            <motion.div
              className="flex justify-center"
              animate={{
                scale: isScrolled ? 0.1 : 1,
                opacity: isScrolled ? 0 : 1,
                y: isScrolled ? -140 : 0,
                x: isScrolled ? -340 : 0
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
              <button className="btn btn-outline">Jump on a call</button>
              <button className="btn btn-primary">Sign up here</button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[100svh]"></div>
    </main>
  )
}
