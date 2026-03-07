'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, AlertTriangle, Zap } from 'lucide-react'
import KpiCard from '@/components/shared/KpiCard'
import StatusDot from '@/components/shared/StatusDot'
import Pill from '@/components/shared/Pill'
import Toggle from '@/components/shared/Toggle'
import { animateScreenEnter, animateStagger } from '@/lib/gsap'
import gsap from 'gsap'

type TabId = 'agents' | 'routing' | 'prompts' | 'flags' | 'cost'
const TABS: { id: TabId; label: string }[] = [
  { id: 'agents', label: 'AI Agents' },
  { id: 'routing', label: 'Routing & Fallback' },
  { id: 'prompts', label: 'Prompt Versions' },
  { id: 'flags', label: 'Feature Flags' },
  { id: 'cost', label: 'Cost & Limits' },
]

const AGENTS = [
  { name: 'Problem Analyzer', model: 'sonnet-4-5', rate: 98.4, lat: '320ms', cost: '$0.0012', ver: 'v2.3', status: 'on' as const, warn: false },
  { name: '3D Structure Generator', model: 'sonnet-4-5', rate: 96.5, lat: '890ms', cost: '$0.0031', ver: 'v1.8', status: 'on' as const, warn: false },
  { name: 'Solution Generator', model: 'sonnet-4-5', rate: 97.1, lat: '1240ms', cost: '$0.0048', ver: 'v3.1', status: 'on' as const, warn: false },
  { name: 'Concept Check Generator', model: 'haiku-4-5', rate: 95.8, lat: '210ms', cost: '$0.0004', ver: 'v1.5', status: 'on' as const, warn: false },
  { name: 'Solution Checker', model: 'sonnet-4-5', rate: 93.2, lat: '1680ms', cost: '$0.0061', ver: 'v2.0', status: 'on' as const, warn: false },
  { name: 'Error Classifier', model: 'haiku-4-5', rate: 88.1, lat: '340ms', cost: '$0.0005', ver: 'v1.2', status: 'aw' as const, warn: true },
]

const CORE_FLAGS = [
  { name: '3D Geometry Renderer', users: 1247 },
  { name: 'AI Solution Generator', users: 980 },
  { name: 'Concept Check System', users: 856 },
  { name: 'Student Progress Tracking', users: 1100 },
  { name: 'Teacher Dashboard', users: 92 },
  { name: 'Real-time Collaboration', users: 340 },
]

const EXP_FLAGS = [
  { name: 'AR Mode (Beta)', on: false },
  { name: 'AI Hint Generator', on: true },
  { name: 'Adaptive Difficulty', on: false },
]

const PROMPT_AGENTS = [
  {
    name: 'Solution Generator',
    versions: [
      { v: 'v3.1', status: 'current', rate: 97.1, date: '01/03/2026' },
      { v: 'v3.0', status: 'stable', rate: 95.3, date: '15/02/2026' },
      { v: 'v2.9', status: 'old', rate: 94.0, date: '01/02/2026' },
    ],
  },
  { name: 'Problem Analyzer', versions: [{ v: 'v2.3', status: 'current', rate: 98.4, date: '28/02/2026' }] },
  { name: '3D Structure Generator', versions: [{ v: 'v1.8', status: 'current', rate: 96.5, date: '20/02/2026' }] },
  { name: 'Concept Check Generator', versions: [{ v: 'v1.5', status: 'current', rate: 95.8, date: '12/02/2026' }] },
  { name: 'Solution Checker', versions: [{ v: 'v2.0', status: 'current', rate: 93.2, date: '05/03/2026' }] },
]

// Tab: AI Agents
function TabAgents() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {AGENTS.map((agent) => (
        <div
          key={agent.name}
          className="si rounded-[10px] p-4"
          style={{
            background: agent.warn ? 'rgba(244,166,35,0.05)' : 'var(--p2)',
            border: `1px solid ${agent.warn ? 'rgba(244,166,35,0.3)' : 'var(--border)'}`,
          }}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <StatusDot status={agent.warn ? 'aw' : agent.status} />
                <h3 className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{agent.name}</h3>
              </div>
              <Pill variant={agent.model.includes('sonnet') ? 't' : 'm'}>{agent.model}</Pill>
            </div>
            <button
              className="text-[11px] px-2 py-1 rounded-[5px] flex-shrink-0"
              style={{ background: 'rgba(69,123,157,0.18)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.3)' }}
            >
              Config
            </button>
          </div>

          {agent.warn && (
            <div
              className="flex items-center gap-2 rounded-[6px] px-2.5 py-1.5 mb-3 text-[11px]"
              style={{ background: 'rgba(244,166,35,0.1)', color: '#f4a623' }}
            >
              <AlertTriangle size={11} />
              Success rate thấp hơn threshold (90%)
            </div>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {[
              { label: 'Success rate', val: `${agent.rate}%`, color: agent.rate >= 95 ? '#2ec27e' : agent.rate >= 90 ? '#f4a623' : '#E63946' },
              { label: 'Avg latency', val: agent.lat, color: 'var(--text)' },
              { label: 'Cost/call', val: agent.cost, color: 'var(--text)' },
              { label: 'Prompt ver', val: agent.ver, color: 'var(--lt)' },
            ].map(({ label, val, color }) => (
              <div key={label}>
                <p className="text-[10px]" style={{ color: 'var(--text3)' }}>{label}</p>
                <p className="text-[12px] font-mono font-medium" style={{ color, fontFamily: 'var(--font-mono)' }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Tab: Routing & Fallback
function TabRouting() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { name: 'Claude API', status: 'Active', dot: 'on' as const, detail: 'Primary · claude-sonnet-4-5' },
          { name: 'Claude Haiku', status: 'Standby', dot: 'aw' as const, detail: 'Fallback · claude-haiku-4-5' },
          { name: 'Backup LLM', status: 'Configured', dot: 'on' as const, detail: 'Emergency · GPT-4o mini' },
        ].map((p) => (
          <div key={p.name} className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-2">
              <StatusDot status={p.dot} />
              <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{p.name}</span>
              <Pill variant={p.dot === 'on' ? 'g' : 'y'}>{p.status}</Pill>
            </div>
            <p className="text-[11px]" style={{ color: 'var(--text2)' }}>{p.detail}</p>
          </div>
        ))}
      </div>

      <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
        <p className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text)' }}>Routing Rules</p>
        {[
          { label: 'Primary', cond: '', action: 'claude-sonnet-4-5', color: '#2ec27e' },
          { label: 'Fallback', cond: 'nếu latency > 2s', action: 'claude-haiku-4-5', color: '#f4a623' },
          { label: 'Emergency', cond: 'nếu API down > 5 phút', action: 'Backup LLM + Slack notify', color: '#E63946' },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5" style={{ borderBottom: '1px solid var(--border2)' }}>
            <Pill variant={i === 0 ? 'g' : i === 1 ? 'y' : 'r'}>{r.label}</Pill>
            <span className="text-[12px] flex-1" style={{ color: 'var(--text)' }}>
              {r.cond && <span style={{ color: 'var(--text3)' }}>{r.cond} → </span>}
              {r.action}
            </span>
          </div>
        ))}
      </div>

      <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
        <p className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text)' }}>Recent Fallback Log</p>
        {[
          { time: '2 ngày trước', event: 'Fallback to haiku — latency spike 2.4s', dur: '8 phút' },
          { time: '5 ngày trước', event: 'Emergency fallback triggered — API 503', dur: '3 phút' },
          { time: '1 tuần trước', event: 'Fallback to haiku — latency spike 2.1s', dur: '4 phút' },
        ].map((l, i) => (
          <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid var(--border2)' }}>
            <span className="text-[10px] font-mono flex-shrink-0" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)', width: 90 }}>{l.time}</span>
            <span className="text-[12px] flex-1" style={{ color: 'var(--text2)' }}>{l.event}</span>
            <Pill variant="y">{l.dur}</Pill>
          </div>
        ))}
      </div>
    </div>
  )
}

// Tab: Prompt Versions
function TabPrompts() {
  const [expanded, setExpanded] = useState<string>('Solution Generator')
  const [rollbackTarget, setRollbackTarget] = useState<{ agent: string; ver: string } | null>(null)

  return (
    <div className="mt-4 flex flex-col gap-2">
      {PROMPT_AGENTS.map((agent) => (
        <div key={agent.name} className="si rounded-[10px] overflow-hidden" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-left"
            onClick={() => setExpanded(expanded === agent.name ? '' : agent.name)}
          >
            <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{agent.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px]" style={{ color: 'var(--text3)' }}>{agent.versions[0].v}</span>
              {expanded === agent.name ? <ChevronUp size={14} style={{ color: 'var(--text3)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text3)' }} />}
            </div>
          </button>

          {expanded === agent.name && (
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border2)' }}>
                    {['Version', 'Status', 'Success rate', 'Date', 'Action'].map((h) => (
                      <th key={h} className="text-left px-4 py-2 font-medium text-[11px]" style={{ color: 'var(--text3)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {agent.versions.map((ver) => {
                    const isRollbackConfirm = rollbackTarget?.agent === agent.name && rollbackTarget?.ver === ver.v

                    return (
                      <>
                        <tr
                          key={ver.v}
                          style={{
                            borderBottom: '1px solid var(--border2)',
                            background: isRollbackConfirm ? 'rgba(244,166,35,0.06)' : undefined,
                          }}
                        >
                          <td className="px-4 py-2.5 font-mono font-medium" style={{ color: 'var(--lt)', fontFamily: 'var(--font-mono)' }}>{ver.v}</td>
                          <td className="px-4 py-2.5">
                            <Pill variant={ver.status === 'current' ? 'g' : ver.status === 'stable' ? 't' : 'm'}>{ver.status}</Pill>
                          </td>
                          <td className="px-4 py-2.5 font-mono" style={{ color: ver.rate >= 96 ? '#2ec27e' : '#f4a623', fontFamily: 'var(--font-mono)' }}>
                            {ver.rate}%
                          </td>
                          <td className="px-4 py-2.5" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{ver.date}</td>
                          <td className="px-4 py-2.5">
                            {ver.status !== 'current' && (
                              <button
                                onClick={() => setRollbackTarget(isRollbackConfirm ? null : { agent: agent.name, ver: ver.v })}
                                className="text-[11px] px-2 py-0.5 rounded"
                                style={{ background: 'rgba(230,57,70,0.1)', color: '#E63946', border: '1px solid rgba(230,57,70,0.25)' }}
                              >
                                Rollback
                              </button>
                            )}
                          </td>
                        </tr>
                        {isRollbackConfirm && (
                          <tr>
                            <td colSpan={5} className="px-4 pb-3">
                              <div
                                className="rounded-[8px] p-3"
                                style={{ background: 'rgba(244,166,35,0.08)', border: '1px solid rgba(244,166,35,0.25)' }}
                              >
                                <p className="text-[12px] mb-2" style={{ color: '#f4a623' }}>
                                  Rollback về [{ver.v}] sẽ ảnh hưởng tất cả học sinh đang dùng {agent.name} ngay lập tức.
                                  Success rate expected: <strong>{ver.rate}%</strong>
                                  {' '}({ver.rate < 97 ? `↓ từ ${agent.versions[0].rate}%` : ''})
                                </p>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setRollbackTarget(null)}
                                    className="px-3 py-1.5 rounded-[6px] text-[11px] font-semibold"
                                    style={{ background: 'rgba(230,57,70,0.2)', color: '#E63946', border: '1px solid rgba(230,57,70,0.35)' }}
                                  >
                                    Xác nhận Rollback
                                  </button>
                                  <button
                                    onClick={() => setRollbackTarget(null)}
                                    className="px-3 py-1.5 rounded-[6px] text-[11px]"
                                    style={{ background: 'transparent', color: 'var(--text3)', border: '1px solid var(--border)' }}
                                  >
                                    Hủy
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Tab: Feature Flags
function TabFlags() {
  const [coreFlags, setCoreFlags] = useState(CORE_FLAGS.map((f) => ({ ...f, on: true })))
  const [expFlags, setExpFlags] = useState(EXP_FLAGS)
  const [emergencyConfirm, setEmergencyConfirm] = useState(false)
  const [emergencyInput, setEmergencyInput] = useState('')

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Core Features */}
      <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
        <p className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text)' }}>Core Features</p>
        <div className="flex flex-col gap-3">
          {coreFlags.map((flag, i) => (
            <div key={flag.name} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[12px]" style={{ color: 'var(--text)' }}>{flag.name}</p>
                <p className="text-[10px]" style={{ color: 'var(--text3)' }}>{flag.users.toLocaleString()} users đang hoạt động</p>
              </div>
              <Toggle
                checked={flag.on}
                onChange={(v) => setCoreFlags((prev) => prev.map((f, j) => j === i ? { ...f, on: v } : f))}
                requireConfirmation={true}
                confirmationMessage={`Tắt ${flag.name} sẽ ảnh hưởng ${flag.users.toLocaleString()} users đang hoạt động. Xác nhận?`}
                affectedCount={flag.users}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Experimental */}
      <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
        <p className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text)' }}>Experimental</p>
        <div className="flex flex-col gap-3">
          {expFlags.map((flag, i) => (
            <div key={flag.name} className="flex items-center justify-between">
              <p className="text-[12px]" style={{ color: 'var(--text)' }}>{flag.name}</p>
              <Toggle
                checked={flag.on}
                onChange={(v) => setExpFlags((prev) => prev.map((f, j) => j === i ? { ...f, on: v } : f))}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Override */}
      <div
        className="si rounded-[10px] p-4 glow-red"
        style={{ background: 'rgba(230,57,70,0.04)', border: '1px solid rgba(230,57,70,0.35)', willChange: 'box-shadow' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} color="#E63946" />
          <p className="text-[12px] font-semibold" style={{ color: '#E63946' }}>Maintenance — Emergency Override</p>
        </div>
        <p className="text-[12px] mb-3" style={{ color: 'var(--text2)' }}>
          Tắt toàn bộ tính năng AI ngay lập tức cho đến khi được bật lại thủ công.
        </p>
        <button
          onClick={() => setEmergencyConfirm((v) => !v)}
          className="px-4 py-2 rounded-[8px] text-[13px] font-bold transition-opacity hover:opacity-90"
          style={{ background: 'rgba(230,57,70,0.2)', color: '#E63946', border: '1px solid rgba(230,57,70,0.4)' }}
        >
          EMERGENCY STOP
        </button>

        {emergencyConfirm && (
          <div
            className="mt-3 rounded-[8px] p-4"
            style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.35)' }}
          >
            <p className="text-[13px] font-semibold mb-2" style={{ color: '#E63946' }}>
              CẢNH BÁO: Hành động này tắt TẤT CẢ tính năng AI ngay lập tức.
            </p>
            <p className="text-[12px] mb-3" style={{ color: 'var(--text2)' }}>
              1,247 học sinh đang trong phiên học sẽ bị gián đoạt.
            </p>
            <p className="text-[11px] mb-1.5" style={{ color: 'var(--text3)' }}>
              Nhập &quot;CONFIRM&quot; để xác nhận:
            </p>
            <input
              type="text"
              placeholder='CONFIRM'
              value={emergencyInput}
              onChange={(e) => setEmergencyInput(e.target.value)}
              className="px-3 py-2 rounded-[7px] text-[13px] font-mono mb-3 w-full focus:outline-none focus:ring-1 focus:ring-[#E63946]"
              style={{
                background: 'var(--p3)',
                border: '1px solid rgba(230,57,70,0.4)',
                color: 'var(--text)',
                fontFamily: 'var(--font-mono)',
              }}
            />
            <div className="flex gap-2">
              <button
                disabled={emergencyInput !== 'CONFIRM'}
                className="px-4 py-2 rounded-[7px] text-[12px] font-bold transition-opacity"
                style={{
                  background: emergencyInput === 'CONFIRM' ? '#E63946' : 'rgba(230,57,70,0.2)',
                  color: emergencyInput === 'CONFIRM' ? 'white' : 'rgba(230,57,70,0.4)',
                  cursor: emergencyInput === 'CONFIRM' ? 'pointer' : 'not-allowed',
                }}
                onClick={() => { setEmergencyConfirm(false); setEmergencyInput('') }}
              >
                Thực hiện Emergency Stop
              </button>
              <button
                onClick={() => { setEmergencyConfirm(false); setEmergencyInput('') }}
                className="px-4 py-2 rounded-[7px] text-[12px]"
                style={{ background: 'transparent', color: 'var(--text3)', border: '1px solid var(--border)' }}
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Tab: Cost & Limits
function TabCost() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    import('@/lib/gsap').then(({ animateProgressBar }) => animateProgressBar(barRef.current))
  }, [])

  const breakdown = [
    { label: 'Solution Generator', pct: 38, color: '#457B9D' },
    { label: '3D Generator', pct: 24, color: '#9b72cf' },
    { label: 'Solution Checker', pct: 19, color: '#2ec27e' },
    { label: 'Problem Analyzer', pct: 11, color: '#f4a623' },
    { label: 'Others', pct: 8, color: '#4a6e84' },
  ]

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        <KpiCard label="Tháng này" value="$1,247" delta="↑ 18% so với tháng trước" deltaType="down" accent="yellow" />
        <KpiCard label="Hôm nay" value="$48.30" delta="87.8% of $55 budget" deltaType="neutral" accent="green" />
        <KpiCard label="Cost/session" value="$0.031" delta="↓ 4% hiệu quả hơn" deltaType="up" accent="teal" />
      </div>

      {/* Cost breakdown */}
      <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
        <p className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text)' }}>Cost Breakdown by Agent</p>
        <div className="flex rounded-full overflow-hidden h-5 mb-3">
          {breakdown.map((b) => (
            <div key={b.label} style={{ width: `${b.pct}%`, background: b.color }} title={`${b.label}: ${b.pct}%`} />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {breakdown.map((b) => (
            <div key={b.label} className="flex items-center gap-1.5">
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: b.color, display: 'inline-block', flexShrink: 0 }} />
              <span className="text-[11px]" style={{ color: 'var(--text2)' }}>{b.label}</span>
              <span className="text-[11px] font-mono" style={{ color: b.color, fontFamily: 'var(--font-mono)' }}>{b.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly budget */}
      <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>Monthly Budget</p>
          <span className="text-[12px] font-mono" style={{ color: '#f4a623', fontFamily: 'var(--font-mono)' }}>62.4% used</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden mb-4" style={{ background: 'var(--p3)' }}>
          <div
            ref={barRef}
            className="h-full rounded-full"
            style={{ width: '62.4%', background: 'linear-gradient(90deg, #457B9D, #f4a623)', willChange: 'transform' }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px]">
            <span style={{ color: 'var(--text2)' }}>Alert at 85%</span>
            <Toggle checked={true} onChange={() => { }} label="" />
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span style={{ color: 'var(--text2)' }}>Alert at 100%</span>
            <Toggle checked={true} onChange={() => { }} label="" />
          </div>
        </div>
      </div>

      {/* Per-user limits */}
      <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
        <p className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text)' }}>Per-user Limits</p>
        <div className="flex flex-col gap-3">
          {[
            { tier: 'Free', limit: '10/ngày', editable: '10' },
            { tier: 'Student', limit: '50/ngày', editable: '50' },
            { tier: 'Teacher', limit: 'Không giới hạn', editable: null },
          ].map((row) => (
            <div key={row.tier} className="flex items-center justify-between gap-3">
              <Pill variant={row.tier === 'Free' ? 'm' : row.tier === 'Student' ? 't' : 'g'}>{row.tier}</Pill>
              <span className="flex-1 text-[12px]" style={{ color: 'var(--text2)' }}>{row.limit}</span>
              {row.editable ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={row.editable}
                    className="w-16 px-2 py-1 rounded-[5px] text-[12px] text-center focus:outline-none"
                    style={{ background: 'var(--p3)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                  <button
                    className="text-[11px] px-2 py-1 rounded-[5px]"
                    style={{ background: 'rgba(69,123,157,0.2)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.3)' }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <Toggle checked={true} onChange={() => { }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function S4SystemConfig() {
  const screenRef = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState<TabId>('agents')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateScreenEnter(screenRef.current)
      animateStagger(screenRef.current)
    }, screenRef) // screenRef làm scope → tự cleanup tất cả animations bên trong

    return () => ctx.revert()
  }, [])

  function switchTab(id: TabId) {
    setTab(id)
    if (contentRef.current) {
      import('@/lib/gsap').then(({ gsap }) => {
        gsap.fromTo(contentRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.22 })
      })
    }
  }

  return (
    <div ref={screenRef}>
      {/* Tabs */}
      <div className="si flex gap-1 p-1 rounded-[10px] w-fit" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => switchTab(t.id)}
            className="px-4 py-1.5 rounded-[7px] text-[12px] font-medium transition-colors"
            style={
              tab === t.id
                ? { background: 'rgba(69,123,157,0.25)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.35)' }
                : { background: 'transparent', color: 'var(--text3)' }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div ref={contentRef}>
        {tab === 'agents' && <TabAgents />}
        {tab === 'routing' && <TabRouting />}
        {tab === 'prompts' && <TabPrompts />}
        {tab === 'flags' && <TabFlags />}
        {tab === 'cost' && <TabCost />}
      </div>
    </div>
  )
}
