import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

export default function HomePage() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => [
      'simple',
      'without bloatware',
      'blazing fast',
      'type-safe',
      'lightweight',
      'efficient'
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
      <div className="w-full">
        <div className="container mx-auto">
          <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
            <div>
              <button className="gap-4 btn btn-sm">
                Read our launch article
              </button>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-4xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                <span className="text-balance inline-block">
                  Web framework must be
                </span>
                <span className="relative flex w-full justify-center overflow-hidden text-center pb-4 pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold"
                      initial={{ opacity: 0, y: '-100' }}
                      transition={{ type: 'spring', stiffness: 50 }}
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
    </main>
  )
}
