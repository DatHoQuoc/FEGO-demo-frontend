'use client'

interface MiniSparklineProps {
  data: number[]
  color: string
  height?: number
  width?: number
}

export default function MiniSparkline({ data, color, height = 28, width = 64 }: MiniSparklineProps) {
  if (!data || data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const barW = Math.floor(width / data.length) - 1

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      {data.map((v, i) => {
        const bh = Math.max(2, ((v - min) / range) * (height - 4))
        const x = i * (barW + 1)
        const y = height - bh
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={bh}
            rx={1}
            fill={color}
            opacity={i === data.length - 1 ? 1 : 0.5}
          />
        )
      })}
    </svg>
  )
}
