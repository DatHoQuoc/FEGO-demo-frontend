'use client'

import { cn } from '@/lib/utils'

type PillVariant = 'g' | 'r' | 'y' | 't' | 'p' | 'm'

interface PillProps {
  variant: PillVariant
  children: React.ReactNode
  className?: string
}

const VARIANTS: Record<PillVariant, string> = {
  g: 'bg-[rgba(46,194,126,0.15)] text-[#2ec27e] border border-[rgba(46,194,126,0.3)]',
  r: 'bg-[rgba(230,57,70,0.15)] text-[#E63946] border border-[rgba(230,57,70,0.3)]',
  y: 'bg-[rgba(244,166,35,0.15)] text-[#f4a623] border border-[rgba(244,166,35,0.3)]',
  t: 'bg-[rgba(69,123,157,0.18)] text-[#A8DADC] border border-[rgba(69,123,157,0.3)]',
  p: 'bg-[rgba(155,114,207,0.15)] text-[#9b72cf] border border-[rgba(155,114,207,0.3)]',
  m: 'bg-[rgba(74,110,132,0.2)] text-[#4a6e84] border border-[rgba(74,110,132,0.2)]',
}

export default function Pill({ variant, children, className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide font-sans',
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
