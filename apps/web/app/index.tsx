import Logo from '@/app/logo.svg' with { type: 'text' }
import { AnimatedGridPattern } from '@/components/animated-grid'
import { cn } from '@/lib/utils'
import { Svg } from 'buntal'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

export default function HomePage() {
  const [titleNumber, setTitleNumber] = useState(0)
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

  return (
    <main className="min-h-screen">
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
            'opacity-30'
          )}
        />
        <div className="container mx-auto">
          <div className="flex gap-4 py-20 lg:py-40 items-center justify-center flex-col">
            <Svg src={Logo} className="[&>*]:size-32 flex justify-center" />
            <div className="flex items-center gap-2 text-sm badge badge-warning badge-soft">
              <div className="inline-grid *:[grid-area:1/1]">
                <div className="status status-warning animate-ping"></div>
                <div className="status status-warning"></div>
              </div>{' '}
              Early Development
            </div>
            <div className="flex gap-4 flex-col max-w-2xl w-full">
              <h1 className="text-4xl md:text-7xl tracking-tighter text-center font-regular">
                <span className="text-balance inline-block">
                  Framework that is
                </span>
                <span className="relative flex w-full justify-center overflow-hidden text-center pb-4 pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold"
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
      <div className="py-20"></div>
    </main>
  )
}
