import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const glowVariants = cva('absolute w-full', {
  variants: {
    variant: {
      top: 'top-0',
      above: '-top-[128px]',
      bottom: 'bottom-0',
      below: '-bottom-[128px]',
      center: 'top-[50%]'
    }
  },
  defaultVariants: {
    variant: 'top'
  }
})

const Glow = ({
  className,
  variant,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof glowVariants> & { ref?: React.Ref<HTMLDivElement> }) => (
  <div
    ref={ref}
    className={cn(glowVariants({ variant }), className)}
    {...props}
  >
    <div
      className={cn(
        'absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--brand-foreground)/.5)_10%,_hsla(var(--brand-foreground)/0)_60%)] sm:h-[512px]',
        variant === 'center' && '-translate-y-1/2'
      )}
    />
    <div
      className={cn(
        'absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--brand)/.3)_10%,_hsla(var(--brand-foreground)/0)_60%)] sm:h-[256px]',
        variant === 'center' && '-translate-y-1/2'
      )}
    />
  </div>
)

export { Glow }
