'use client'

import { useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import MiniSparkline from './MiniSparkline'
import { cn } from '@/lib/utils'

type AccentColor = 'teal' | 'green' | 'yellow' | 'red' | 'purple'

interface KpiCardProps {
  label: string
  value: string
  numericValue?: number
  delta?: string
  deltaType?: 'up' | 'down' | 'neutral'
  accent?: AccentColor
  sparkline?: number[]
  onClick?: () => void
  className?: string
}

const ACCENT_MAP: Record<AccentColor, { border: string; glow: string; sparkColor: string }> = {
  teal:   { border: '#457B9D', glow: 'rgba(69,123,157,0.18)',   sparkColor: '#A8DADC' },
  green:  { border: '#2ec27e', glow: 'rgba(46,194,126,0.15)',   sparkColor: '#2ec27e' },
  yellow: { border: '#f4a623', glow: 'rgba(244,166,35,0.15)',   sparkColor: '#f4a623' },
  red:    { border: '#E63946', glow: 'rgba(230,57,70,0.15)',    sparkColor: '#E63946' },
  purple: { border: '#9b72cf', glow: 'rgba(155,114,207,0.15)',  sparkColor: '#9b72cf' },
}

export default function KpiCard({
  label,
  value,
  numericValue,
  delta,
  deltaType = 'neutral',
  accent = 'teal',
  sparkline,
  onClick,
  className,
}: KpiCardProps) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const { border, glow, sparkColor } = ACCENT_MAP[accent]

  useEffect(() => {
    if (numericValue === undefined || !valueRef.current) return
    // Parse numeric value for counter animation
    import('@/lib/gsap').then(({ animateCounter }) => {
      const parsed = parseFloat(String(numericValue))
      const hasDecimal = value.includes('.')
      const decimals = hasDecimal ? (value.split('.')[1]?.replace(/[^0-9]/g, '').length ?? 0) : 0
      const prefix = value.match(/^[^0-9,.%]*/)?.[0] ?? ''
      const suffix = value.match(/[^0-9,.]*$/)?.[0] ?? ''
      animateCounter(valueRef.current, parsed, prefix, suffix, decimals)
    })
  }, [])

  const DeltaIcon =
    deltaType === 'up' ? TrendingUp : deltaType === 'down' ? TrendingDown : Minus
  const deltaColor =
    deltaType === 'up' ? '#2ec27e' : deltaType === 'down' ? '#E63946' : '#8dafc4'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[10px] p-4 cursor-default select-none si',
        onClick && 'cursor-pointer hover:opacity-90 transition-opacity',
        className
      )}
      style={{
        background: 'var(--p2)',
        borderTop: `2px solid ${border}`,
        border: `1px solid var(--border)`,
        borderTopColor: border,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Glow circle */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          transform: 'translate(30%, -30%)',
        }}
      />

      <p
        className="text-[10px] uppercase tracking-widest font-semibold mb-1.5"
        style={{ color: 'var(--text3)', fontFamily: 'var(--font-sans)' }}
      >
        {label}
      </p>

      <div className="flex items-end justify-between gap-2">
        <span
          ref={valueRef}
          className="text-[30px] leading-none font-serif"
          style={{ color: 'var(--text)', fontFamily: 'var(--font-serif)' }}
        >
          {value}
        </span>
        {sparkline && (
          <div className="mb-1">
            <MiniSparkline data={sparkline} color={sparkColor} />
          </div>
        )}
      </div>

      {delta && (
        <div className="flex items-center gap-1 mt-2">
          <DeltaIcon size={11} color={deltaColor} />
          <span className="text-[11px]" style={{ color: deltaColor, fontFamily: 'var(--font-sans)' }}>
            {delta}
          </span>
        </div>
      )}
    </div>
  )
}
