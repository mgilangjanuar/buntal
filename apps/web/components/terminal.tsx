import { cn } from '@/lib/utils'
import { motion, type MotionProps } from 'motion/react'
import { createContext, use, useEffect, useMemo, useRef, useState } from 'react'

// Context to control animation start across all children
const TerminalAnimationContext = createContext<{
  isInView: boolean
  animationStarted: boolean
}>({
  isInView: false,
  animationStarted: false
})

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  ...props
}: AnimatedSpanProps) => {
  const { animationStarted } = use(TerminalAnimationContext)

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={animationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay: animationStarted ? delay / 1000 : 0 }}
      className={cn('grid text-sm font-normal tracking-tight', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface TypingAnimationProps extends MotionProps {
  children: string
  className?: string
  duration?: number
  delay?: number
  as?: React.ElementType
}

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = 'span',
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== 'string') {
    throw new Error('TypingAnimation: children must be a string. Received:')
  }

  const { animationStarted } = use(TerminalAnimationContext)
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true
  })

  const [displayedText, setDisplayedText] = useState<string>('')
  const [started, setStarted] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!animationStarted) {
      setDisplayedText('')
      setStarted(false)
      return
    }

    const startTimeout = setTimeout(() => {
      setStarted(true)
    }, delay)
    return () => clearTimeout(startTimeout)
  }, [delay, animationStarted])

  useEffect(() => {
    if (!started) return

    let i = 0
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, duration)

    return () => {
      clearInterval(typingEffect)
    }
  }, [children, duration, started])

  return (
    <MotionComponent
      ref={elementRef}
      className={cn('text-sm font-normal tracking-tight', className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  )
}

interface TerminalProps {
  children: React.ReactNode
  className?: string
  threshold?: number // How much of the component should be visible to trigger animations
}

export const Terminal = ({
  children,
  className,
  threshold = 0.1
}: TerminalProps) => {
  const [isInView, setIsInView] = useState(false)
  const [animationStarted, setAnimationStarted] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          setIsInView(true)
          setAnimationStarted(true)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before fully in view
      }
    )

    if (terminalRef.current) {
      observer.observe(terminalRef.current)
    }

    return () => {
      if (terminalRef.current) {
        observer.unobserve(terminalRef.current)
      }
    }
  }, [threshold])

  const contextValue = useMemo(
    () => ({
      isInView,
      animationStarted
    }),
    [isInView, animationStarted]
  )

  return (
    <TerminalAnimationContext value={contextValue}>
      <motion.div
        ref={terminalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={cn(
          'z-0 h-full max-h-[400px] w-full max-w-lg rounded-xl',
          className
        )}
      >
        <div className="flex flex-col gap-y-2 p-4 border border-b-0 rounded-t-xl">
          <div className="flex flex-row gap-x-2">
            <motion.div
              className="h-2 w-2 rounded-full bg-red-500"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                animationStarted
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{ duration: 0.2, delay: 0.1 }}
            />
            <motion.div
              className="h-2 w-2 rounded-full bg-yellow-500"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                animationStarted
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{ duration: 0.2, delay: 0.2 }}
            />
            <motion.div
              className="h-2 w-2 rounded-full bg-green-500"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                animationStarted
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{ duration: 0.2, delay: 0.3 }}
            />
          </div>
        </div>
        <div
          className="overflow-y-auto max-h-[357px] rounded-b-xl"
          data-theme="dark"
        >
          <pre className="overflow-x-auto p-4 pr-0">
            <code className="grid gap-y-1">{children}</code>
          </pre>
        </div>
      </motion.div>
    </TerminalAnimationContext>
  )
}
