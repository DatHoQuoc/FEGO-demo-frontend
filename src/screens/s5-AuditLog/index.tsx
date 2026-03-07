'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Edit2, Download, CheckCircle2, AlertTriangle,
  Slack, Mail, Bell, Phone,
} from 'lucide-react'
import KpiCard from '@/components/shared/KpiCard'
import StatusDot from '@/components/shared/StatusDot'
import Pill from '@/components/shared/Pill'
import LogItem from '@/components/shared/LogItem'
import Toggle from '@/components/shared/Toggle'
import { animateScreenEnter, animateStagger } from '@/lib/gsap'

// ─── Types ───────────────────────────────────────────────────────────────────

type FilterKey = 'Tất cả' | 'Phân quyền' | 'Config' | 'Security' | 'AI' | 'Content' | 'Billing'

type AlertStatus = 'on' | 'aw' | 'err' | 'off'

interface AlertRule {
  id: number
  label: string
  threshold: string
  channels: string[]
  status: AlertStatus
  statusLabel: string
  section: string
  active?: boolean
}

// ─── Static data ──────────────────────────────────────────────────────────────

const LOG_ENTRIES: {
  type: 'cr' | 'ed' | 'dl' | 'au' | 'sy' | 'lk' | 'ai' | 'bi'
  title: string
  meta: string
  timestamp: string
  status?: 'success' | 'warning' | 'error' | 'info'
  filter: FilterKey
}[] = [
  { type: 'lk', title: 'Token abuse phát hiện — #USR-10421',     meta: 'by: System Monitor · IP: 42.118.xx.xx',       timestamp: '14:32:07', status: 'error',   filter: 'Security'   },
  { type: 'au', title: 'Phân quyền Admin → Moderator — MOD-06',  meta: 'by: Admin (ADM-01)',                          timestamp: '13:15:44', status: 'success',  filter: 'Phân quyền' },
  { type: 'sy', title: 'Prompt v3.1 deployed — Solution Gen.',    meta: 'by: Admin (ADM-01) · from v3.0',             timestamp: '12:48:02', status: 'success',  filter: 'Config'     },
  { type: 'ai', title: 'AI fallback triggered — haiku',           meta: 'latency spike 2.4s · 8 phút',                timestamp: '11:22:31', status: 'warning',  filter: 'AI'         },
  { type: 'cr', title: 'Tài khoản MOD-06 được tạo',              meta: 'by: Admin (ADM-01) · Hoàng Văn Bình',        timestamp: '10:55:18', status: 'success',  filter: 'Phân quyền' },
  { type: 'ed', title: 'Feature flag AR Mode OFF → ON',           meta: 'by: Admin (ADM-01)',                         timestamp: '10:30:00', status: 'info',     filter: 'Config'     },
  { type: 'bi', title: 'Subscription upgrade — Teacher plan',     meta: 'user: TRN-0821 · +$12/mo',                  timestamp: '09:48:55', status: 'success',  filter: 'Billing'    },
  { type: 'au', title: 'Giáo viên Nguyễn Thị Mai được duyệt',    meta: 'by: Admin (ADM-01) · THPT Nguyễn Du',       timestamp: '09:12:33', status: 'success',  filter: 'Phân quyền' },
  { type: 'lk', title: 'Đăng nhập thất bại x5 — IP blocked',     meta: 'IP: 203.184.xx.xx · auto-blocked 24h',       timestamp: '09:00:05', status: 'error',    filter: 'Security'   },
  { type: 'ai', title: 'Error Classifier success rate < 90%',     meta: 'rate: 88.1% · threshold: 90%',               timestamp: '07:45:22', status: 'warning',  filter: 'AI'         },
  { type: 'sy', title: 'DB backup hoàn thành',                    meta: 'by: System · 6.2GB · 4 phút',                timestamp: '06:00:01', status: 'success',  filter: 'Config'     },
  { type: 'cr', title: 'Bài tập #EX-4820 được publish',          meta: 'by: MOD-03 · Đỗ Thu Hà · Hình cầu',         timestamp: '05:30:44', status: 'success',  filter: 'Content'    },
]

const ALERT_SECTIONS = ['Kỹ thuật', 'Chi phí', 'Vận hành']

const ALERT_RULES: AlertRule[] = [
  { id: 1,  label: 'Response Latency > 2000ms',    threshold: 'avg 5 phút > 2s',            channels: ['Slack', 'Email'],    status: 'on',  statusLabel: 'Active',     section: 'Kỹ thuật'  },
  { id: 2,  label: 'AI Success Rate < 90%',        threshold: 'bất kỳ agent nào < 90%',     channels: ['Slack', 'Email'],    status: 'on',  statusLabel: 'Active',     section: 'Kỹ thuật'  },
  { id: 3,  label: 'API Error Rate > 5%',          threshold: '5 phút rolling window',       channels: ['Slack'],             status: 'on',  statusLabel: 'Active',     section: 'Kỹ thuật'  },
  { id: 4,  label: 'Token Abuse Detection',        threshold: '> 5× avg trong 2h',           channels: ['Slack', 'Email', 'SMS'], status: 'err', statusLabel: 'Active now', section: 'Kỹ thuật', active: true },
  { id: 5,  label: 'Monthly Token Quota > 85%',   threshold: '890M / 1B tokens',            channels: ['Email'],             status: 'aw',  statusLabel: 'Triggered',  section: 'Chi phí',  active: true },
  { id: 6,  label: 'Daily Cost > $55',             threshold: '$55/ngày budget',             channels: ['Email', 'Slack'],    status: 'on',  statusLabel: 'Active',     section: 'Chi phí'   },
  { id: 7,  label: 'Queue Backlog > 30h',          threshold: 'bài chờ > 30h không xử lý',  channels: ['Slack'],             status: 'aw',  statusLabel: 'Watch',      section: 'Vận hành'  },
]

const ALERT_HISTORY = [
  { type: 'lk' as const, title: 'Token abuse — #USR-10421', meta: 'Active since 14:32 · unresolved', timestamp: '14:32', status: 'error' as const },
  { type: 'ai' as const, title: 'Error Classifier rate 88.1%', meta: 'Resolved tự động 08:30', timestamp: '07:45', status: 'warning' as const },
  { type: 'sy' as const, title: 'API Error Rate spike 6.2%', meta: 'Resolved sau 4 phút', timestamp: 'Hôm qua 22:14', status: 'success' as const },
  { type: 'sy' as const, title: 'Latency > 2s during peak', meta: 'Resolved sau 8 phút · haiku fallback', timestamp: 'Hôm qua 19:01', status: 'success' as const },
  { type: 'bi' as const, title: 'Monthly quota 79% warning', meta: 'Acknowledged · monitoring', timestamp: '5 ngày trước', status: 'info' as const },
]

const CHANNEL_ICONS: Record<string, React.ElementType> = {
  Slack: Slack,
  Email: Mail,
  Dashboard: Bell,
  SMS: Phone,
}

const FILTER_KEYS: FilterKey[] = ['Tất cả', 'Phân quyền', 'Config', 'Security', 'AI', 'Content', 'Billing']

// ─── Component ────────────────────────────────────────────────────────────────

export default function S5AuditLog() {
  const screenRef = useRef<HTMLDivElement>(null)
  const [logFilter, setLogFilter] = useState<FilterKey>('Tất cả')
  const [editingRule, setEditingRule] = useState<number | null>(null)
  const [testSent, setTestSent] = useState<string | null>(null)
  const [ruleEnabled, setRuleEnabled] = useState<Record<number, boolean>>(
    Object.fromEntries(ALERT_RULES.map((r) => [r.id, r.status !== 'off']))
  )

  useEffect(() => {
    animateScreenEnter(screenRef.current)
    animateStagger(screenRef.current)
  }, [])

  const filteredLogs = logFilter === 'Tất cả'
    ? LOG_ENTRIES
    : LOG_ENTRIES.filter((l) => l.filter === logFilter)

  function sendTest(channel: string) {
    setTestSent(channel)
    setTimeout(() => setTestSent(null), 2500)
  }

  return (
    <div ref={screenRef} style={{ opacity: 0 }}>
      {/* 4 KPI cards */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <KpiCard label="Log entries hôm nay" value="847"  numericValue={847}  delta="↑ 12% so với hôm qua" deltaType="up"      accent="teal"   />
        <KpiCard label="Phân quyền changes" value="3"    numericValue={3}    delta="Hôm nay"               deltaType="neutral" accent="yellow" />
        <KpiCard label="Config changes"      value="2"    numericValue={2}    delta="Hôm nay"               deltaType="neutral" accent="purple" />
        <KpiCard label="Security events"     value="1"    numericValue={1}    delta="Critical · chưa xử lý" deltaType="down"    accent="red"    />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* ── LEFT: Audit Log ───────────────────────────────────── */}
        <div
          className="si rounded-[10px] p-4"
          style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>Audit Log</p>
            <button
              className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-[6px]"
              style={{ background: 'rgba(69,123,157,0.15)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.25)' }}
            >
              <Download size={11} />
              Export CSV
            </button>
          </div>

          {/* Search + filter chips */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Tìm trong log..."
              className="w-full px-3 py-1.5 rounded-[7px] text-[12px] mb-2.5 focus:outline-none focus:ring-1 focus:ring-[var(--teal)]"
              style={{
                background: 'var(--p3)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontFamily: 'var(--font-sans)',
              }}
            />
            <div className="flex flex-wrap gap-1.5">
              {FILTER_KEYS.map((k) => (
                <button
                  key={k}
                  onClick={() => setLogFilter(k)}
                  className="text-[10px] px-2.5 py-1 rounded-full font-medium transition-colors"
                  style={
                    logFilter === k
                      ? { background: 'rgba(69,123,157,0.3)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.45)' }
                      : { background: 'var(--p3)', color: 'var(--text3)', border: '1px solid var(--border2)' }
                  }
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Log list */}
          <div className="overflow-y-auto" style={{ maxHeight: 520 }}>
            {filteredLogs.length === 0 ? (
              <p className="text-[12px] text-center py-8" style={{ color: 'var(--text3)' }}>
                Không có log cho bộ lọc này
              </p>
            ) : (
              filteredLogs.map((entry, i) => (
                <LogItem
                  key={i}
                  type={entry.type}
                  title={entry.title}
                  meta={entry.meta}
                  timestamp={entry.timestamp}
                  status={entry.status}
                />
              ))
            )}
          </div>
        </div>

        {/* ── RIGHT: Alert Rules + Channels + History ───────────── */}
        <div className="flex flex-col gap-4">
          {/* Card A: Alert Rules */}
          <div
            className="si rounded-[10px] p-4"
            style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}
          >
            <p className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text)' }}>Alert Rules</p>

            {ALERT_SECTIONS.map((section) => {
              const rules = ALERT_RULES.filter((r) => r.section === section)
              return (
                <div key={section} className="mb-4">
                  <p
                    className="text-[9px] font-bold uppercase tracking-[0.12em] mb-2"
                    style={{ color: 'var(--text3)' }}
                  >
                    {section}
                  </p>
                  {rules.map((rule) => (
                    <div key={rule.id}>
                      <div
                        className="flex items-center gap-2 py-2 rounded-[6px] px-2 -mx-2 transition-colors"
                        style={{
                          borderBottom: '1px solid var(--border2)',
                          background: rule.active
                            ? rule.status === 'err'
                              ? 'rgba(230,57,70,0.05)'
                              : 'rgba(244,166,35,0.04)'
                            : undefined,
                        }}
                      >
                        <StatusDot status={ruleEnabled[rule.id] ? rule.status : 'off'} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-medium leading-tight truncate" style={{ color: 'var(--text)' }}>
                            {rule.label}
                          </p>
                          <p className="text-[10px] mt-0.5" style={{ color: 'var(--text3)' }}>
                            {rule.threshold}
                            <span className="ml-2" style={{ color: 'var(--text3)' }}>
                              {rule.channels.join(' · ')}
                            </span>
                          </p>
                        </div>
                        <Pill
                          variant={
                            rule.status === 'err' ? 'r'
                            : rule.status === 'aw' ? 'y'
                            : rule.status === 'on' ? 'g'
                            : 'm'
                          }
                        >
                          {rule.statusLabel}
                        </Pill>
                        <button
                          onClick={() => setEditingRule(editingRule === rule.id ? null : rule.id)}
                          className="flex-shrink-0 p-1 rounded hover:bg-[rgba(69,123,157,0.1)] transition-colors"
                          title="Edit rule"
                        >
                          <Edit2 size={11} style={{ color: 'var(--text3)' }} />
                        </button>
                      </div>

                      {/* Inline edit form */}
                      {editingRule === rule.id && (
                        <div
                          className="my-1 mx-0 rounded-[8px] p-3"
                          style={{ background: 'var(--p3)', border: '1px solid var(--border)' }}
                        >
                          <p className="text-[11px] font-semibold mb-2" style={{ color: 'var(--text2)' }}>
                            Chỉnh sửa rule: {rule.label}
                          </p>
                          <div className="flex flex-col gap-2 mb-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px]" style={{ color: 'var(--text3)' }}>Bật rule này</span>
                              <Toggle
                                checked={ruleEnabled[rule.id]}
                                onChange={(v) => setRuleEnabled((prev) => ({ ...prev, [rule.id]: v }))}
                              />
                            </div>
                            <div>
                              <p className="text-[10px] mb-1" style={{ color: 'var(--text3)' }}>Threshold</p>
                              <input
                                type="text"
                                defaultValue={rule.threshold}
                                className="w-full px-2.5 py-1.5 rounded-[6px] text-[11px] focus:outline-none focus:ring-1 focus:ring-[var(--teal)]"
                                style={{
                                  background: 'var(--p2)',
                                  border: '1px solid var(--border)',
                                  color: 'var(--text)',
                                  fontFamily: 'var(--font-sans)',
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingRule(null)}
                              className="px-3 py-1 rounded-[5px] text-[11px] font-semibold"
                              style={{ background: 'rgba(69,123,157,0.25)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.35)' }}
                            >
                              Lưu
                            </button>
                            <button
                              onClick={() => setEditingRule(null)}
                              className="px-3 py-1 rounded-[5px] text-[11px]"
                              style={{ background: 'transparent', color: 'var(--text3)', border: '1px solid var(--border)' }}
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

          {/* Card B: Notification Channels */}
          <div
            className="si rounded-[10px] p-4"
            style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}
          >
            <p className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text)' }}>Notification Channels</p>
            <div className="flex flex-col gap-2">
              {[
                { name: 'Slack',     status: 'connected', dot: 'on' as const,  configured: true  },
                { name: 'Email',     status: 'active',    dot: 'on' as const,  configured: true  },
                { name: 'Dashboard', status: 'always on', dot: 'on' as const,  configured: true  },
                { name: 'SMS',       status: 'chưa cấu hình', dot: 'off' as const, configured: false },
              ].map((ch) => {
                const Icon = (CHANNEL_ICONS[ch.name] ?? Bell) as React.FC<{ size?: number; style?: React.CSSProperties }>
                return (
                  <div
                    key={ch.name}
                    className="flex items-center gap-3 py-2"
                    style={{ borderBottom: '1px solid var(--border2)' }}
                  >
                    <div
                      className="flex items-center justify-center rounded-[7px] flex-shrink-0"
                      style={{
                        width: 28, height: 28,
                        background: ch.configured ? 'rgba(46,194,126,0.12)' : 'rgba(74,110,132,0.15)',
                      }}
                    >
                      <Icon size={13} style={{ color: ch.configured ? '#2ec27e' : 'var(--text3)' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{ch.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusDot status={ch.dot} />
                      <span className="text-[10px]" style={{ color: ch.configured ? '#2ec27e' : 'var(--text3)' }}>
                        {ch.status}
                      </span>
                    </div>
                    {ch.configured ? (
                      <button
                        onClick={() => sendTest(ch.name)}
                        className="text-[10px] px-2 py-0.5 rounded-[5px] transition-colors"
                        style={{
                          background: testSent === ch.name ? 'rgba(46,194,126,0.2)' : 'rgba(69,123,157,0.15)',
                          color: testSent === ch.name ? '#2ec27e' : 'var(--lt)',
                          border: `1px solid ${testSent === ch.name ? 'rgba(46,194,126,0.3)' : 'rgba(69,123,157,0.25)'}`,
                        }}
                      >
                        {testSent === ch.name ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 size={10} /> Test sent
                          </span>
                        ) : 'Test'}
                      </button>
                    ) : (
                      <button
                        className="text-[10px] px-2 py-0.5 rounded-[5px]"
                        style={{ background: 'rgba(69,123,157,0.1)', color: 'var(--text3)', border: '1px solid var(--border)' }}
                      >
                        + Thêm
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
            <p className="text-[10px] mt-2 leading-relaxed" style={{ color: 'var(--text3)' }}>
              Khi alert kích hoạt, Admin nhận thông báo qua các kênh đã cấu hình và alert sẽ xuất hiện trong Dashboard.
            </p>
          </div>

          {/* Card C: Alert History (7 days) */}
          <div
            className="si rounded-[10px] p-4"
            style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>Alert History (7 ngày)</p>
              <div className="flex items-center gap-2">
                <AlertTriangle size={11} color="#f4a623" />
                <span className="text-[11px]" style={{ color: '#f4a623' }}>2 chưa giải quyết</span>
              </div>
            </div>
            {ALERT_HISTORY.map((item, i) => (
              <LogItem
                key={i}
                type={item.type}
                title={item.title}
                meta={item.meta}
                timestamp={item.timestamp}
                status={item.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
