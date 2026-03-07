'use client'

interface StatusDotProps {
  status: 'on' | 'aw' | 'err' | 'off'
  size?: number
}

const STATUS_MAP = {
  on:  { bg: '#2ec27e', cls: 'dot-pulse-slow' },
  aw:  { bg: '#f4a623', cls: '' },
  err: { bg: '#E63946', cls: 'dot-pulse-fast' },
  off: { bg: '#4a6e84', cls: '' },
}

export default function StatusDot({ status, size = 7 }: StatusDotProps) {
  const { bg, cls } = STATUS_MAP[status]
  return (
    <span
      className={`inline-block rounded-full flex-shrink-0 ${cls}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        willChange: cls ? 'transform' : undefined,
      }}
    />
  )
}
