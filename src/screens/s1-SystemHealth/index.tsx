'use client'

import { useEffect, useRef } from 'react'
import KpiCard from '@/components/shared/KpiCard'
import StatusDot from '@/components/shared/StatusDot'
import Pill from '@/components/shared/Pill'
import LogItem from '@/components/shared/LogItem'
import { animateScreenEnter, animateStagger, animateProgressBar } from '@/lib/gsap'
import type { ScreenId } from '@/lib/navigation'
import gsap from 'gsap'

interface Props {
  onNav: (id: ScreenId) => void
}

function LatencyChart() {
  const W = 540; const H = 120
  const hours = ['00:00', '06:00', '12:00', '18:00', 'Now']
  const vals = [420, 380, 890, 1200, 847]
  const sla = 2000
  const maxV = sla * 1.1

  function toY(v: number) {
    return H - (v / maxV) * (H - 16) - 4
  }

  const pts = vals.map((v, i) => ({ x: (i / (vals.length - 1)) * W, y: toY(v) }))
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const areaD = `${pathD} L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`
  const slaY = toY(sla)

  return (
    <div>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 120 }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="latGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#457B9D" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#457B9D" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          {/* SLA line */}
          <line x1={0} y1={slaY} x2={W} y2={slaY} stroke="#E63946" strokeWidth="1" strokeDasharray="4,3" opacity="0.7" />
          <text x={W - 4} y={slaY - 4} textAnchor="end" fill="#E63946" fontSize="8" opacity="0.8">SLA 2s</text>
          {/* Teal area */}
          <path d={areaD} fill="url(#latGrad)" />
          <path d={pathD} fill="none" stroke="#457B9D" strokeWidth="1.5" />
          {/* Current dot */}
          <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3" fill="#A8DADC" />
          <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="6" fill="rgba(168,218,220,0.2)" />
        </svg>
      </div>
      <div className="flex justify-between mt-1">
        {hours.map((h, i) => (
          <span key={i} className="text-[10px]" style={{ color: i === hours.length - 1 ? 'var(--lt)' : 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
            {h}
          </span>
        ))}
      </div>
    </div>
  )
}

const AI_TASKS = [
  { label: 'Phân tích đề bài', pct: 98.4, color: '#2ec27e' },
  { label: 'Sinh lời giải', pct: 97.1, color: '#2ec27e' },
  { label: 'Dựng cấu trúc 3D', pct: 96.5, color: '#457B9D' },
  { label: 'Sinh câu hỏi Concept Check', pct: 95.8, color: '#457B9D' },
  { label: 'Kiểm tra lời giải', pct: 93.2, color: '#f4a623' },
]

function ProgressRow({ label, pct, color }: { label: string; pct: number; color: string }) {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    import('@/lib/gsap').then(({ animateProgressBar }) => animateProgressBar(barRef.current, Math.random() * 0.2))
  }, [])
  return (
    <div className="flex items-center gap-3 si">
      <span className="text-[11px] flex-shrink-0" style={{ color: 'var(--text2)', width: 200, fontFamily: 'var(--font-sans)' }}>
        {label}
      </span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--p3)' }}>
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: color, willChange: 'transform' }}
        />
      </div>
      <span className="text-[11px] font-mono flex-shrink-0" style={{ color, fontFamily: 'var(--font-mono)', width: 40, textAlign: 'right' }}>
        {pct}%
      </span>
    </div>
  )
}

export default function S1SystemHealth({ onNav }: Props) {
  const screenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateScreenEnter(screenRef.current)
      animateStagger(screenRef.current)
    }, screenRef) // screenRef làm scope → tự cleanup tất cả animations bên trong

    return () => ctx.revert()
  }, [])

  return (
    <div ref={screenRef}>
      {/* 4 KPIs */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <KpiCard label="Uptime" value="99.97%" numericValue={99.97} delta="Excellent" deltaType="up" accent="teal" />
        <KpiCard label="3D Engine Latency" value="847ms" numericValue={847} delta="Trong ngưỡng SLA" deltaType="up" accent="green" sparkline={[420, 380, 890, 1200, 847, 780, 847]} />
        <KpiCard label="AI Success Rate" value="96.8%" numericValue={96.8} delta="Ổn định" deltaType="neutral" accent="yellow" />
        <KpiCard label="Active Monitors" value="2" numericValue={2} delta="2 chưa xử lý" deltaType="down" accent="red" onClick={() => onNav('s5')} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Left 2fr: System Metrics */}
        <div
          className="si col-span-2 rounded-[10px] p-5"
          style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>Response Latency (24h)</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text3)' }}>
                <span style={{ width: 8, height: 2, display: 'inline-block', background: '#457B9D', borderRadius: 1 }} /> Latency
              </span>
              <span className="flex items-center gap-1 text-[10px]" style={{ color: '#E63946' }}>
                <span style={{ width: 8, height: 1, display: 'inline-block', background: '#E63946', borderRadius: 1, borderTop: '1px dashed #E63946' }} /> SLA 2s
              </span>
            </div>
          </div>
          <LatencyChart />

          <div
            className="my-4"
            style={{ borderTop: '1px solid var(--border)' }}
          />

          <p className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text)' }}>
            AI Success Rate — by task type
          </p>
          <div className="flex flex-col gap-3">
            {AI_TASKS.map((t) => (
              <ProgressRow key={t.label} {...t} />
            ))}
          </div>
        </div>

        {/* Right 1fr: Error Log + Active Monitors */}
        <div className="col-span-1 flex flex-col gap-4">
          {/* Error Log */}
          <div
            className="si rounded-[10px] p-4"
            style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>Error Log (24h)</p>
              <div className="flex gap-1.5">
                <Pill variant="r">2 Critical</Pill>
                <Pill variant="y">12 Warn</Pill>
              </div>
            </div>
            <LogItem type="lk" title="Token abuse detected" meta="#USR-10421 · 14:32:07" timestamp="14:32" status="error" />
            <LogItem type="sy" title="Solution Checker quota 89%" meta="Quota threshold reached" timestamp="11:00" status="warning" />
            <LogItem type="ai" title="3D Generator timeout x2" meta="Retried successfully" timestamp="09:41" status="warning" />
            <LogItem type="sy" title="DB query slow" meta="847ms avg (threshold 500ms)" timestamp="08:15" status="warning" />
            <LogItem type="ai" title="Classifier fallback triggered" meta="Primary model unavailable" timestamp="06:33" status="info" />
            <div className="mt-3 pt-3 grid grid-cols-2 gap-2" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="rounded-[7px] p-2 text-center" style={{ background: 'rgba(230,57,70,0.1)' }}>
                <p className="text-[20px] font-serif" style={{ color: '#E63946', fontFamily: 'var(--font-serif)' }}>2</p>
                <p className="text-[10px]" style={{ color: 'var(--text3)' }}>Critical</p>
              </div>
              <div className="rounded-[7px] p-2 text-center" style={{ background: 'rgba(244,166,35,0.1)' }}>
                <p className="text-[20px] font-serif" style={{ color: '#f4a623', fontFamily: 'var(--font-serif)' }}>12</p>
                <p className="text-[10px]" style={{ color: 'var(--text3)' }}>Warning</p>
              </div>
            </div>
          </div>

          {/* Active Monitors */}
          <div
            className="si rounded-[10px] p-4 glow-red"
            style={{
              background: 'rgba(230,57,70,0.05)',
              border: '1px solid rgba(230,57,70,0.35)',
              willChange: 'box-shadow',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <StatusDot status="err" />
                <p className="text-[12px] font-semibold" style={{ color: '#E63946' }}>Monitors đang kích hoạt</p>
              </div>
              <button
                onClick={() => onNav('s5')}
                className="text-[11px] hover:underline"
                style={{ color: 'var(--teal)' }}
              >
                Xem →
              </button>
            </div>

            {/* Alert 1 */}
            <div
              className="rounded-[8px] p-3 mb-2"
              style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.25)' }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold" style={{ color: '#E63946' }}>CRITICAL</span>
                <span className="text-[10px] font-mono" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>14:32</span>
              </div>
              <p className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>Token abuse — #USR-10421</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--text2)' }}>420K tokens trong 2h — 8.4× avg</p>
            </div>

            {/* Alert 2 */}
            <div
              className="rounded-[8px] p-3"
              style={{ background: 'rgba(244,166,35,0.08)', border: '1px solid rgba(244,166,35,0.25)' }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold" style={{ color: '#f4a623' }}>WARNING</span>
                <span className="text-[10px] font-mono" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>11:00</span>
              </div>
              <p className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>Solution Checker quota {'>'} 89%</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--text2)' }}>890M / 1B token tháng này</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
