import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-violet-500/10 text-violet-500 border border-violet-500/20',
        cyan: 'bg-cyan-brand/10 text-cyan-600 border border-cyan-brand/20',
        success: 'bg-success/10 text-success border border-success/20',
        dark: 'bg-ink/10 text-ink dark:bg-white/10 dark:text-white border border-ink/10 dark:border-white/10',
        service: 'bg-white/80 backdrop-blur text-ink border border-white/30 shadow-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
