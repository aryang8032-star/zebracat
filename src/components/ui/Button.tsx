'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-violet-500 text-white hover:bg-violet-600 active:scale-[0.98]',
        secondary: 'border-2 border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white',
        ghost: 'text-ink dark:text-offwhite hover:bg-violet-500/10',
        outline: 'border border-ink/20 dark:border-white/20 hover:border-violet-500 hover:text-violet-500',
        dark: 'bg-ink text-white hover:bg-ink/80',
        cyan: 'bg-cyan-brand text-ink hover:bg-cyan-brand/90',
        white: 'bg-white text-ink hover:bg-white/90',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-full',
        md: 'h-11 px-6 text-sm rounded-full',
        lg: 'h-13 px-8 text-base rounded-full',
        xl: 'h-16 px-10 text-lg rounded-full',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  pill?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, pill = false, icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    if (pill) {
      return (
        <div className="inline-flex items-center rounded-full overflow-hidden shadow-md group cursor-pointer">
          <button
            ref={ref}
            className={cn(
              buttonVariants({ variant, size }),
              'rounded-none rounded-l-full pr-4 group-hover:brightness-110',
              className,
            )}
            {...props}
          >
            {children}
          </button>
          <span
            aria-hidden
            className={cn(
              'flex items-center justify-center h-full aspect-square rounded-full ml-0.5',
              variant === 'primary' ? 'bg-violet-600' : 'bg-violet-500',
              size === 'lg' || size === 'xl' ? 'p-3' : 'p-2',
            )}
          >
            {icon ?? <ArrowUpRight className={cn('text-white', size === 'lg' || size === 'xl' ? 'w-5 h-5' : 'w-4 h-4')} aria-hidden />}
          </span>
        </div>
      )
    }
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
