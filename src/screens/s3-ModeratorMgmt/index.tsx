'use client'

import { useEffect, useRef, useState } from 'react'
import { Zap, BarChart2, UserPlus, Info } from 'lucide-react'
import KpiCard from '@/components/shared/KpiCard'
import StatusDot from '@/components/shared/StatusDot'
import Pill from '@/components/shared/Pill'
import { animateScreenEnter, animateStagger } from '@/lib/gsap'
import gsap from 'gsap'

const MODERATORS = [
  { id: 'MOD-01', name: 'Nguyễn Thúy Linh', status: 'on', queue: 4, done: 22, avg: '16 phút', accept: '98%', quality: 9.4 },
  { id: 'MOD-02', name: 'Phạm Việt Hùng', status: 'on', queue: 5, done: 19, avg: '21 phút', accept: '95%', quality: 8.8 },
  { id: 'MOD-03', name: 'Đỗ Thu Hà', status: 'on', queue: 3, done: 18, avg: '14 phút', accept: '97%', quality: 9.2 },
  { id: 'MOD-04', name: 'Võ Quang Minh', status: 'aw', queue: 0, done: 11, avg: '24 phút', accept: '91%', quality: 8.1 },
  { id: 'MOD-05', name: 'Trần Thị Lan', status: 'on', queue: 7, done: 25, avg: '18 phút', accept: '96%', quality: 9.0 },
  { id: 'MOD-06', name: 'Hoàng Văn Bình', status: 'aw', queue: 0, done: 8, avg: '22 phút', accept: '89%', quality: 7.8 },
]

const OLDEST = [
  { title: 'Bài tập hình học không gian #T-4821', topic: 'Hình cầu', wait: '31h', status: 'Unassigned' },
  { title: 'Câu hỏi concept check #T-4819', topic: 'Hình trụ', wait: '28h', status: 'Unassigned' },
  { title: 'Lời giải phức tạp #T-4815', topic: 'Hình chóp', wait: '22h', status: 'Returned' },
]

const THROUGHPUT = [12, 18, 15, 22, 19, 8, 6]
const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
const AVG = THROUGHPUT.reduce((a, b) => a + b, 0) / THROUGHPUT.length

function ThroughputChart() {
  const max = Math.max(...THROUGHPUT)
  const H = 80; const W = 100

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80 }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#457B9D" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#457B9D" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Avg dashed line */}
        <line
          x1={0} y1={H - (AVG / max) * (H - 8) - 4}
          x2={W} y2={H - (AVG / max) * (H - 8) - 4}
          stroke="#f4a623" strokeWidth="0.6" strokeDasharray="2,2" opacity="0.8"
        />
        {THROUGHPUT.map((v, i) => {
          const bh = (v / max) * (H - 8)
          const bw = W / THROUGHPUT.length - 2
          const x = i * (W / THROUGHPUT.length) + 0.5
          const y = H - bh - 2
          return (
            <rect
              key={i}
              x={x} y={y} width={bw} height={bh}
              rx={1}
              fill={i === THROUGHPUT.length - 2 ? 'url(#barGrad)' : i === THROUGHPUT.length - 1 ? 'url(#barGrad)' : 'rgba(69,123,157,0.5)'}
              opacity={i >= THROUGHPUT.length - 2 ? 0.5 : 1}
            />
          )
        })}
      </svg>
      <div className="flex justify-between mt-1">
        {DAYS.map((d, i) => (
          <span key={i} className="text-[10px]" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{d}</span>
        ))}
      </div>
    </div>
  )
}

type FilterStatus = 'Tất cả' | 'Active' | 'Away'

export default function S3ModeratorMgmt() {
  const screenRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<FilterStatus>('Tất cả')
  const [assignDropdown, setAssignDropdown] = useState<number | null>(null)
  const [autoBalanceConfirm, setAutoBalanceConfirm] = useState(false)
  const [tooltipId, setTooltipId] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateScreenEnter(screenRef.current)
      animateStagger(screenRef.current)
    }, screenRef) // screenRef làm scope → tự cleanup tất cả animations bên trong

    return () => ctx.revert()
  }, [])

  const filteredMods = filter === 'Tất cả'
    ? MODERATORS
    : MODERATORS.filter((m) => (filter === 'Active' ? m.status === 'on' : m.status === 'aw'))

  return (
    <div ref={screenRef}>
      {/* 4 KPIs */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <KpiCard label="Queue hiện tại" value="23" numericValue={23} delta="↑ 8 items mới" deltaType="down" accent="yellow" />
        <KpiCard label="Đang xử lý" value="8" numericValue={8} delta="4 moderators active" deltaType="up" accent="teal" />
        <KpiCard label="Chờ lâu nhất" value="31h" delta="Vượt ngưỡng 24h" deltaType="down" accent="red" />
        <KpiCard label="Avg/bài" value="18 phút" delta="↓ 3 phút so với tuần trước" deltaType="up" accent="green" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Left: Queue Health */}
        <div className="col-span-2 si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
          <p className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text)' }}>Queue Health</p>

          {/* Stacked bar */}
          <div className="flex rounded-full overflow-hidden h-5 mb-2">
            <div style={{ width: '48%', background: '#E63946' }} title="Unassigned: 15" />
            <div style={{ width: '26%', background: '#457B9D' }} title="Active: 8" />
            <div style={{ width: '13%', background: '#f4a623' }} title="Returned: 4" />
            <div style={{ flex: 1, background: 'var(--p3)' }} />
          </div>
          <div className="flex gap-4 mb-4">
            {[
              { label: 'Unassigned', n: 15, color: '#E63946' },
              { label: 'Active', n: 8, color: '#457B9D' },
              { label: 'Returned', n: 4, color: '#f4a623' },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-1.5">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, display: 'inline-block' }} />
                <span className="text-[11px]" style={{ color: 'var(--text2)' }}>{r.label}: <strong style={{ color: 'var(--text)' }}>{r.n}</strong></span>
              </div>
            ))}
          </div>

          <div className="my-3" style={{ borderTop: '1px solid var(--border)' }} />

          <p className="text-[11px] font-semibold mb-2" style={{ color: 'var(--text2)' }}>Throughput (7 ngày)</p>
          <ThroughputChart />

          <div className="my-3" style={{ borderTop: '1px solid var(--border)' }} />

          <p className="text-[11px] font-semibold mb-2" style={{ color: 'var(--text2)' }}>3 Items chờ lâu nhất</p>
          <div className="flex flex-col gap-2">
            {OLDEST.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-[8px] px-3 py-2"
                style={{ background: 'var(--p3)', border: '1px solid var(--border2)' }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium truncate" style={{ color: 'var(--text)' }}>{item.title}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--text3)' }}>{item.topic}</p>
                </div>
                <span
                  className="text-[12px] font-mono font-bold flex-shrink-0"
                  style={{ color: '#E63946', fontFamily: 'var(--font-mono)' }}
                >
                  {item.wait}
                </span>
                <Pill variant={item.status === 'Unassigned' ? 'r' : 'y'}>{item.status}</Pill>
                <div className="relative">
                  <button
                    onClick={() => setAssignDropdown(assignDropdown === i ? null : i)}
                    className="text-[11px] px-2 py-1 rounded-[5px]"
                    style={{ background: 'rgba(69,123,157,0.2)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.3)' }}
                  >
                    {item.status === 'Unassigned' ? 'Assign →' : 'Re-assign'}
                  </button>
                  {assignDropdown === i && (
                    <div
                      className="absolute right-0 top-8 rounded-[8px] py-1 z-10 min-w-[160px]"
                      style={{ background: 'var(--p3)', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
                    >
                      {MODERATORS.filter((m) => m.status === 'on').map((m) => (
                        <button
                          key={m.id}
                          className="w-full text-left px-3 py-1.5 text-[12px] hover:opacity-80 transition-opacity"
                          style={{ color: 'var(--text)' }}
                          onClick={() => setAssignDropdown(null)}
                        >
                          {m.name} ({m.queue} tasks)
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Actions + Alerts */}
        <div className="col-span-1 flex flex-col gap-3">
          {/* Quick Actions */}
          <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
            <p className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text)' }}>Quick Actions</p>
            {[
              { icon: Zap, label: 'Phân công lại tất cả' },
              { icon: BarChart2, label: 'Xuất báo cáo' },
              { icon: UserPlus, label: 'Thêm Moderator' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-[8px] text-[12px] mb-1.5 transition-colors hover:opacity-80"
                style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)' }}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>

          {/* Queue Alerts */}
          <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
            <p className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text)' }}>Queue Alerts</p>

            {/* Alert 1 */}
            <div
              className="rounded-[8px] p-3 mb-2"
              style={{ background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.25)' }}
            >
              <p className="text-[12px] font-semibold mb-1" style={{ color: '#E63946' }}>31h không xử lý</p>
              <p className="text-[11px] mb-2" style={{ color: 'var(--text2)' }}>#T-4821 chưa được assign</p>
              <div className="flex gap-1.5">
                <button
                  className="px-2 py-1 rounded text-[11px] font-semibold"
                  style={{ background: 'rgba(69,123,157,0.2)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.3)' }}
                >
                  Assign ngay
                </button>
                <button
                  className="px-2 py-1 rounded text-[11px]"
                  style={{ background: 'transparent', color: 'var(--text3)', border: '1px solid var(--border)' }}
                >
                  Snooze
                </button>
              </div>
            </div>

            {/* Alert 2 */}
            <div
              className="rounded-[8px] p-3"
              style={{ background: 'rgba(244,166,35,0.08)', border: '1px solid rgba(244,166,35,0.25)' }}
            >
              <p className="text-[12px] font-semibold mb-1" style={{ color: '#f4a623' }}>Workload không đều</p>
              <p className="text-[11px] mb-2" style={{ color: 'var(--text2)' }}>MOD-05 có 7 tasks, MOD-04/06 có 0</p>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setAutoBalanceConfirm((v) => !v)}
                  className="px-2 py-1 rounded text-[11px] font-semibold w-full text-left"
                  style={{ background: 'rgba(244,166,35,0.15)', color: '#f4a623', border: '1px solid rgba(244,166,35,0.3)' }}
                >
                  Cân bằng tự động
                </button>
                {autoBalanceConfirm && (
                  <div
                    className="rounded-[6px] p-2"
                    style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(244,166,35,0.2)' }}
                  >
                    <p className="text-[11px] mb-1.5" style={{ color: '#f4a623' }}>
                      Tự động phân phối lại queue cho 4 moderators đang active. Xác nhận?
                    </p>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setAutoBalanceConfirm(false)}
                        className="px-2 py-0.5 rounded text-[11px] font-semibold"
                        style={{ background: 'rgba(244,166,35,0.2)', color: '#f4a623', border: '1px solid rgba(244,166,35,0.3)' }}
                      >
                        Xác nhận
                      </button>
                      <button
                        onClick={() => setAutoBalanceConfirm(false)}
                        className="px-2 py-0.5 rounded text-[11px]"
                        style={{ background: 'transparent', color: 'var(--text3)', border: '1px solid var(--border)' }}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                )}
                <button
                  className="px-2 py-1 rounded text-[11px] w-full text-left"
                  style={{ background: 'transparent', color: 'var(--text3)', border: '1px solid var(--border)' }}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>Moderator Performance</p>
          <div className="flex gap-1.5">
            {(['Tất cả', 'Active', 'Away'] as FilterStatus[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-2.5 py-1 rounded-full text-[11px] transition-colors"
                style={
                  filter === f
                    ? { background: 'rgba(69,123,157,0.25)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.4)' }
                    : { background: 'var(--p3)', color: 'var(--text3)', border: '1px solid var(--border)' }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Moderator', 'Trạng thái', 'Queue hiện tại', 'Đã xử lý (tuần)', 'Avg time', 'Accept rate', 'Quality score', 'Actions'].map((h) => (
                  <th key={h} className="text-left pb-2 pr-4 font-medium text-[11px]" style={{ color: 'var(--text3)', whiteSpace: 'nowrap' }}>
                    {h}
                    {h === 'Quality score' && (
                      <button
                        className="ml-1 inline-block"
                        onMouseEnter={() => setTooltipId('qs')}
                        onMouseLeave={() => setTooltipId(null)}
                      >
                        <Info size={10} style={{ color: 'var(--text3)', display: 'inline' }} />
                      </button>
                    )}
                  </th>
                ))}
              </tr>
              {tooltipId === 'qs' && (
                <tr>
                  <td colSpan={8}>
                    <div
                      className="rounded-[6px] px-3 py-2 mb-2 text-[11px]"
                      style={{ background: 'var(--p3)', border: '1px solid var(--border)', color: 'var(--text2)' }}
                    >
                      Tính từ: tỉ lệ bài Moderator duyệt không bị báo cáo lỗi sau publish
                    </div>
                  </td>
                </tr>
              )}
            </thead>
            <tbody>
              {filteredMods.map((mod) => (
                <tr key={mod.id} style={{ borderBottom: '1px solid var(--border2)' }}>
                  <td className="py-2.5 pr-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                        style={{ width: 24, height: 24, background: 'rgba(69,123,157,0.18)', color: 'var(--lt)' }}
                      >
                        {mod.name.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p style={{ color: 'var(--text)' }}>{mod.name}</p>
                        <p className="text-[10px]" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{mod.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 pr-4">
                    <div className="flex items-center gap-1.5">
                      <StatusDot status={mod.status as any} />
                      <span style={{ color: 'var(--text2)' }}>{mod.status === 'on' ? 'Active' : 'Away'}</span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span
                      className="font-mono font-bold"
                      style={{ color: mod.queue > 5 ? '#f4a623' : 'var(--text)', fontFamily: 'var(--font-mono)' }}
                    >
                      {mod.queue}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span className="font-mono" style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{mod.done}</span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span style={{ color: 'var(--text2)' }}>{mod.avg}</span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span
                      style={{
                        color: parseFloat(mod.accept) >= 95 ? '#2ec27e' : '#f4a623',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {mod.accept}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--p3)', minWidth: 50 }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(mod.quality / 10) * 100}%`,
                            background: mod.quality >= 9 ? '#2ec27e' : mod.quality >= 8 ? '#457B9D' : '#f4a623',
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-mono" style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                        {mod.quality}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5">
                    <button
                      className="text-[11px] px-2 py-0.5 rounded"
                      style={{ background: 'rgba(69,123,157,0.15)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.25)' }}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
