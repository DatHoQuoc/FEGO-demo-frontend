'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle, ChevronRight } from 'lucide-react'
import KpiCard from '@/components/shared/KpiCard'
import StatusDot from '@/components/shared/StatusDot'
import LogItem from '@/components/shared/LogItem'
import { animateScreenEnter, animateStagger } from '@/lib/gsap'
import type { ScreenId } from '@/lib/navigation'

interface Props {
  onNav: (id: ScreenId) => void
  isActive?: boolean
}

// SVG dual-line area chart for activity
function ActivityChart() {
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  const users = [820, 950, 880, 1100, 1050, 700, 600]
  const sessions = [2200, 2800, 2500, 3200, 3100, 1900, 1600]
  const W = 100; const H = 100
  const maxV = Math.max(...sessions)

  function toXY(arr: number[]) {
    return arr.map((v, i) => ({
      x: (i / (arr.length - 1)) * W,
      y: H - (v / maxV) * (H - 10) - 4,
    }))
  }

  function toPath(pts: { x: number; y: number }[]) {
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  }

  function toArea(pts: { x: number; y: number }[], h: number) {
    const line = toPath(pts)
    return `${line} L${pts[pts.length - 1].x},${h} L${pts[0].x},${h} Z`
  }

  const uPts = toXY(users)
  const sPts = toXY(sessions)

  return (
    <div style={{ position: 'relative' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 130 }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradS" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#457B9D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#457B9D" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="gradU" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2ec27e" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2ec27e" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Dashed vertical line for today (index 4 = T6) */}
        <line x1="66.7" y1="0" x2="66.7" y2={H} stroke="rgba(168,218,220,0.3)" strokeWidth="0.8" strokeDasharray="2,2" />
        <path d={toArea(sPts, H)} fill="url(#gradS)" />
        <path d={toPath(sPts)} fill="none" stroke="#457B9D" strokeWidth="1.2" />
        <path d={toArea(uPts, H)} fill="url(#gradU)" />
        <path d={toPath(uPts)} fill="none" stroke="#2ec27e" strokeWidth="1.2" />
        {/* Current day dot */}
        <circle cx={uPts[4].x} cy={uPts[4].y} r="2" fill="#2ec27e" />
        <circle cx={sPts[4].x} cy={sPts[4].y} r="2" fill="#457B9D" />
      </svg>
      <div className="flex justify-between mt-1">
        {days.map((d, i) => (
          <span key={i} className="text-[10px]" style={{ color: i === 4 ? 'var(--lt)' : 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
            {d}
          </span>
        ))}
      </div>
      <div className="flex gap-3 mt-2">
        <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text3)' }}>
          <span style={{ width: 8, height: 2, display: 'inline-block', background: '#2ec27e', borderRadius: 1 }} />
          Users
        </span>
        <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text3)' }}>
          <span style={{ width: 8, height: 2, display: 'inline-block', background: '#457B9D', borderRadius: 1 }} />
          Phiên học
        </span>
      </div>
    </div>
  )
}

export default function S0Dashboard({ onNav, isActive  }: Props) {
  const screenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return
    animateScreenEnter(screenRef.current)
    animateStagger(screenRef.current)
  }, [isActive])

  return (
    <div ref={screenRef} style={{ opacity: 0 }}>
      {/* Welcome Bar */}
      <div
        className="si rounded-[10px] p-4 mb-5 flex flex-col sm:flex-row sm:items-center gap-3"
        style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}
      >
        <div className="flex-1">
          <h2 className="text-[16px] font-serif" style={{ color: 'var(--text)', fontFamily: 'var(--font-serif)' }}>
            Chào buổi sáng, Admin
          </h2>
          <p className="text-[12px] mt-0.5" style={{ color: 'var(--text2)' }}>
            Thứ Sáu, 07 tháng 3, 2026
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <StatusDot status="on" />
            <span className="text-[12px]" style={{ color: 'var(--text2)' }}>All systems operational</span>
          </div>
          <div className="text-right">
            <p className="text-[10px]" style={{ color: 'var(--text3)' }}>Đăng nhập lần cuối</p>
            <p className="text-[11px] font-mono" style={{ color: 'var(--text2)', fontFamily: 'var(--font-mono)' }}>Hôm nay, 07:42 AM</p>
          </div>
        </div>
      </div>

      {/* 5 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
        <KpiCard label="Active Users hôm nay" value="1,247" numericValue={1247} delta="↑ 18% so với hôm qua" deltaType="up" accent="teal" sparkline={[820, 950, 880, 1100, 1050, 1180, 1247]} />
        <KpiCard label="Phiên học hôm nay" value="3,891" numericValue={3891} delta="↑ 12% so với hôm qua" deltaType="up" accent="green" sparkline={[2200, 2800, 2500, 3200, 3100, 3600, 3891]} />
        <KpiCard label="AI Success Rate" value="96.8%" numericValue={96.8} delta="Ổn định" deltaType="neutral" accent="yellow" />
        <KpiCard label="Queue Moderator" value="23" numericValue={23} delta="↑ 8 items mới" deltaType="down" accent="yellow" onClick={() => onNav('s3')} />
        <KpiCard label="Alerts chờ xử lý" value="2" numericValue={2} delta="Critical" deltaType="down" accent="red" onClick={() => onNav('s5')} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Left: Attention Panel */}
        <div className="col-span-1 flex flex-col gap-3">
          {/* CRITICAL */}
          <div className="si rounded-[10px] overflow-hidden" style={{ border: '1px solid rgba(230,57,70,0.25)' }}>
            <div className="px-3 py-2 flex items-center gap-2" style={{ background: 'rgba(230,57,70,0.12)' }}>
              <XCircle size={12} color="#E63946" />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#E63946' }}>Critical</span>
            </div>
            <div style={{ background: 'var(--p2)' }}>
              <AlertItem
                title="Token abuse #USR-10421"
                sub="420K tokens trong 2h · 8.4× avg"
                action="Xử lý →"
                onAction={() => onNav('s5')}
                color="#E63946"
              />
              <AlertItem
                title="3 giáo viên chờ duyệt"
                sub="Đang chờ phê duyệt tài khoản"
                action="Duyệt →"
                onAction={() => onNav('s2')}
                color="#E63946"
              />
            </div>
          </div>

          {/* WATCH */}
          <div className="si rounded-[10px] overflow-hidden" style={{ border: '1px solid rgba(244,166,35,0.2)' }}>
            <div className="px-3 py-2 flex items-center gap-2" style={{ background: 'rgba(244,166,35,0.1)' }}>
              <AlertTriangle size={12} color="#f4a623" />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#f4a623' }}>Watch</span>
            </div>
            <div style={{ background: 'var(--p2)' }}>
              <AlertItem
                title="Solution Checker quota 89%"
                sub="890M / 1B token tháng này"
                action="Xem →"
                onAction={() => onNav('s4')}
                color="#f4a623"
              />
              <AlertItem
                title="Queue backlog tăng"
                sub="23 items · 31h không xử lý"
                action="Xem →"
                onAction={() => onNav('s3')}
                color="#f4a623"
              />
            </div>
          </div>

          {/* HEALTHY */}
          <div className="si rounded-[10px] overflow-hidden" style={{ border: '1px solid rgba(46,194,126,0.2)', background: 'var(--p2)' }}>
            <div className="px-3 py-2 flex items-center gap-2" style={{ background: 'rgba(46,194,126,0.08)' }}>
              <CheckCircle2 size={12} color="#2ec27e" />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#2ec27e' }}>Healthy</span>
            </div>
            {[
              'System uptime 99.97%',
              'AI pipeline hoạt động bình thường',
              'DB backup hoàn thành 6h trước',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 px-3 py-2" style={{ borderBottom: '1px solid var(--border2)' }}>
                <CheckCircle2 size={11} color="#2ec27e" className="mt-0.5 flex-shrink-0" />
                <span className="text-[11px]" style={{ color: 'var(--text2)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3fr */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Top row: Activity Chart + Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div
              className="si col-span-2 rounded-[10px] p-4"
              style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text3)' }}>
                Hoạt động 7 ngày qua
              </p>
              <ActivityChart />
            </div>

            <div className="si col-span-1 flex flex-col gap-3">
              <MiniStatCard
                title="Content Pipeline"
                value="1,247 bài"
                sub="Queue: 23/50 capacity"
                progress={46}
                color="#457B9D"
              />
              <MiniStatCard
                title="Revenue MRR"
                value="$4,280"
                sub="↑ 12% · 47 subscriptions"
                progress={72}
                color="#2ec27e"
              />
              <div
                className="rounded-[10px] p-3 flex-1"
                style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text3)' }}>
                  System Health
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px]" style={{ color: 'var(--text2)' }}>Latency</span>
                    <div className="flex items-center gap-1">
                      <StatusDot status="on" />
                      <span className="text-[11px] font-mono" style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>847ms</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px]" style={{ color: 'var(--text2)' }}>AI Success</span>
                    <div className="flex items-center gap-1">
                      <StatusDot status="on" />
                      <span className="text-[11px] font-mono" style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>96.8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px]" style={{ color: 'var(--text2)' }}>Last Error</span>
                    <div className="flex items-center gap-1">
                      <StatusDot status="aw" />
                      <span className="text-[11px] font-mono" style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>2h trước</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row: Recent Alerts + Queue + Activity Feed */}
          <div className="grid grid-cols-3 gap-4">
            <div className="si rounded-[10px] p-3" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text3)' }}>Recent Alerts</p>
                <button onClick={() => onNav('s5')} className="text-[10px] hover:underline" style={{ color: 'var(--teal)' }}>Xem tất cả</button>
              </div>
              <LogItem type="lk" title="Token abuse phát hiện" meta="#USR-10421 · 420K tokens" timestamp="14:32" status="error" />
              <LogItem type="sy" title="Solution Checker quota 89%" meta="890M / 1B token" timestamp="11:00" status="warning" />
              <LogItem type="au" title="Đăng nhập thất bại x5" meta="IP: 203.184.xx.xx" timestamp="09:15" status="warning" />
              <LogItem type="sy" title="Queue backlog tăng" meta="23 items unassigned" timestamp="08:00" status="info" />
            </div>

            <div className="si rounded-[10px] p-3" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text3)' }}>Queue Status</p>
              </div>
              <div className="flex rounded-full overflow-hidden h-4 mb-3">
                <div style={{ width: '48%', background: '#E63946' }} title="Unassigned: 15" />
                <div style={{ width: '26%', background: '#457B9D' }} title="Active: 8" />
                <div style={{ width: '13%', background: '#f4a623' }} title="Returned: 4" />
                <div style={{ flex: 1, background: 'var(--p3)' }} />
              </div>
              <div className="flex flex-col gap-1 mb-3">
                {[
                  { label: 'Unassigned', n: 15, color: '#E63946' },
                  { label: 'Active', n: 8, color: '#457B9D' },
                  { label: 'Returned', n: 4, color: '#f4a623' },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, display: 'inline-block' }} />
                      <span className="text-[11px]" style={{ color: 'var(--text2)' }}>{r.label}</span>
                    </div>
                    <span className="text-[11px] font-mono" style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{r.n}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px]" style={{ color: '#f4a623' }}>31h chờ xử lý</span>
              </div>
              <button
                onClick={() => onNav('s3')}
                className="w-full py-1.5 rounded-[7px] text-[11px] font-semibold"
                style={{ background: 'rgba(69,123,157,0.2)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.3)' }}
              >
                Phân công ngay
              </button>
            </div>

            <div className="si rounded-[10px] p-3" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text3)' }}>Activity Feed</p>
              {[
                { who: 'MOD-02', action: 'Duyệt 3 bài tập mới', time: '5 phút trước' },
                { who: 'Admin', action: 'Cập nhật prompt v3.1', time: '32 phút trước' },
                { who: 'MOD-05', action: 'Từ chối 1 bài do lỗi', time: '1h trước' },
                { who: 'System', action: 'DB backup hoàn thành', time: '6h trước' },
                { who: 'Admin', action: 'Tạo tài khoản MOD-06', time: '8h trước' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 py-2" style={{ borderBottom: '1px solid var(--border2)' }}>
                  <div
                    className="rounded-full text-[9px] font-bold flex items-center justify-center flex-shrink-0"
                    style={{ width: 20, height: 20, background: 'rgba(69,123,157,0.2)', color: 'var(--lt)', marginTop: 1 }}
                  >
                    {item.who.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-[11px]" style={{ color: 'var(--text)' }}>
                      <span className="font-semibold">{item.who}</span> {item.action}
                    </p>
                    <p className="text-[10px]" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AlertItem({
  title, sub, action, onAction, color,
}: {
  title: string; sub: string; action: string; onAction: () => void; color: string
}) {
  return (
    <div className="flex items-start justify-between gap-2 px-3 py-2.5" style={{ borderBottom: '1px solid var(--border2)' }}>
      <div>
        <p className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{title}</p>
        <p className="text-[10px] mt-0.5" style={{ color: 'var(--text3)' }}>{sub}</p>
      </div>
      <button
        onClick={onAction}
        className="text-[11px] font-semibold flex-shrink-0 hover:opacity-80"
        style={{ color }}
      >
        {action}
      </button>
    </div>
  )
}

function MiniStatCard({
  title, value, sub, progress, color,
}: {
  title: string; value: string; sub: string; progress: number; color: string
}) {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    import('@/lib/gsap').then(({ animateProgressBar }) => animateProgressBar(barRef.current))
  }, [])
  return (
    <div className="rounded-[10px] p-3" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
      <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text3)' }}>{title}</p>
      <p className="text-[15px] font-serif" style={{ color: 'var(--text)', fontFamily: 'var(--font-serif)' }}>{value}</p>
      <p className="text-[10px] mt-0.5 mb-2" style={{ color: 'var(--text2)' }}>{sub}</p>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--p3)' }}>
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ width: `${progress}%`, background: color, willChange: 'transform' }}
        />
      </div>
    </div>
  )
}
