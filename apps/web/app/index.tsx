import { AnimatedGridPattern } from '@/components/animated-grid'
import { cn } from '@/lib/utils'
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
      'developer-friendly',
      'works'
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
          width={120}
          height={120}
          numSquares={10}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            '[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-0 h-[100%] -skew-y-6',
            'opacity-30'
          )}
        />
        <div className="container mx-auto">
          <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
            <div className="flex items-center gap-2 text-sm badge badge-warning badge-soft">
              <div className="inline-grid *:[grid-area:1/1]">
                <div className="status status-warning animate-ping"></div>
                <div className="status status-warning"></div>
              </div>{' '}
              Early Development
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-4xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                <span className="text-balance inline-block">
                  Framework that{' '}
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: titleNumber === 6 ? 0 : 1 }}
                  >
                    is
                  </motion.span>
                </span>
                <span className="relative flex w-full justify-center overflow-hidden text-center pb-4 pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold"
                      initial={{ opacity: 0, y: '-100' }}
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

              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                Managing a small business today is already tough. Avoid further
                complications by ditching outdated, tedious trade methods. Our
                goal is to streamline SMB trade, making it easier and faster
                than ever.
              </p>
            </div>
            <div className="flex flex-row gap-3">
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
