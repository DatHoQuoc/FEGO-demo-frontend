'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, X, ChevronRight, Plus } from 'lucide-react'
import KpiCard from '@/components/shared/KpiCard'
import StatusDot from '@/components/shared/StatusDot'
import Pill from '@/components/shared/Pill'
import { animateScreenEnter, animateStagger } from '@/lib/gsap'
import gsap from 'gsap'

const PERMISSIONS = [
  'AI Config',
  'User Accounts',
  'Content Review',
  'Revenue Data',
  'System Logs',
  'Feature Flags',
]

const PERM_MATRIX: Record<string, ('full' | 'partial' | 'none')[]> = {
  'AI Config': ['full', 'none', 'none'],
  'User Accounts': ['full', 'partial', 'full'],
  'Content Review': ['full', 'full', 'none'],
  'Revenue Data': ['full', 'none', 'full'],
  'System Logs': ['full', 'partial', 'none'],
  'Feature Flags': ['full', 'none', 'none'],
}

const ACCOUNTS = [
  { id: 'ADM-01', name: 'Trần Minh Đức', role: 'Admin', status: 'Active', last: '10 phút trước' },
  { id: 'ADM-02', name: 'Lê Hoàng Anh', role: 'Admin', status: 'Active', last: '1h trước' },
  { id: 'MOD-01', name: 'Nguyễn Thúy Linh', role: 'Moderator', status: 'Active', last: '25 phút trước' },
  { id: 'MOD-02', name: 'Phạm Việt Hùng', role: 'Moderator', status: 'Away', last: '3h trước' },
  { id: 'MOD-03', name: 'Đỗ Thu Hà', role: 'Moderator', status: 'Active', last: '45 phút trước' },
  { id: 'MOD-04', name: 'Võ Quang Minh', role: 'Moderator', status: 'Away', last: '2h trước' },
  { id: 'STF-01', name: 'Hoàng Bảo Châu', role: 'Staff', status: 'Active', last: '15 phút trước' },
  { id: 'STF-02', name: 'Bùi Thanh Tâm', role: 'Staff', status: 'Locked', last: '2 ngày trước' },
]

const PENDING = [
  { name: 'Nguyễn Thị Mai', school: 'THPT Nguyễn Du, HCM', time: '2 ngày trước' },
  { name: 'Trần Văn Hùng', school: 'THPT Chu Văn An, HN', time: '1 ngày trước' },
  { name: 'Lê Thị Hoa', school: 'THPT Lê Quý Đôn, ĐN', time: '5 giờ trước' },
]

type FilterRole = 'Tất cả' | 'Admin' | 'Moderator' | 'Staff'
const FILTERS: FilterRole[] = ['Tất cả', 'Admin', 'Moderator', 'Staff']

export default function S2RolePermission() {
  const screenRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<FilterRole>('Tất cả')
  const [rejectStates, setRejectStates] = useState<Record<number, boolean>>({})
  const [approved, setApproved] = useState<Record<number, boolean>>({})
  const [rejected, setRejected] = useState<Record<number, boolean>>({})
  const [lockConfirmRow, setLockConfirmRow] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateScreenEnter(screenRef.current)
      animateStagger(screenRef.current)
    }, screenRef) // screenRef làm scope → tự cleanup tất cả animations bên trong

    return () => ctx.revert()
  }, [])

  const filtered = filter === 'Tất cả' ? ACCOUNTS : ACCOUNTS.filter((a) => a.role === filter)

  const statusDot = (s: string) =>
    s === 'Active' ? 'on' : s === 'Away' ? 'aw' : 'err'

  return (
    <div ref={screenRef}>
      {/* 4 KPIs */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <KpiCard label="Tài khoản nội bộ" value="19" numericValue={19} delta="8 Admin/Mod/Staff" deltaType="neutral" accent="teal" />
        <KpiCard label="Active hôm nay" value="11" numericValue={11} delta="58% đang online" deltaType="up" accent="green" />
        <KpiCard label="Pending duyệt" value="3" numericValue={3} delta="Chờ phê duyệt" deltaType="neutral" accent="yellow" />
        <KpiCard label="Bị khóa" value="1" numericValue={1} delta="Cần xem xét" deltaType="down" accent="red" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Left: Role System */}
        <div className="col-span-1 flex flex-col gap-3">
          {/* Role cards */}
          <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>Hệ thống Role</p>
              <button
                className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-[6px]"
                style={{ background: 'rgba(69,123,157,0.2)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.3)' }}
              >
                <Plus size={10} /> Tạo role
              </button>
            </div>

            {[
              {
                name: 'Admin',
                pill: { v: 'p' as const, label: 'Super' },
                desc: 'Phân quyền, hệ thống, AI config',
                count: 2,
                chips: ['Full system', 'AI config', 'User mgmt'],
              },
              {
                name: 'Moderator',
                pill: { v: 't' as const, label: 'Content' },
                desc: 'Quản lý nội dung & review queue',
                count: 12,
                chips: ['Review queue', 'Verify', 'Reject', 'Annotate'],
              },
              {
                name: 'Staff',
                pill: { v: 'g' as const, label: 'Business' },
                desc: 'User mgmt, revenue, analytics',
                count: 5,
                chips: ['User mgmt', 'Revenue', 'Analytics', 'Growth'],
              },
            ].map((role) => (
              <div
                key={role.name}
                className="rounded-[8px] p-3 mb-2"
                style={{ background: 'var(--p3)', border: '1px solid var(--border2)' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{role.name}</span>
                  <Pill variant={role.pill.v}>{role.pill.label}</Pill>
                  <span className="ml-auto text-[10px]" style={{ color: 'var(--text3)' }}>{role.count} tài khoản</span>
                </div>
                <p className="text-[11px] mb-2" style={{ color: 'var(--text2)' }}>{role.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {role.chips.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(168,218,220,0.08)', color: 'var(--text2)', border: '1px solid var(--border)' }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Permission Matrix */}
          <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
            <p className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text)' }}>Permission Matrix</p>
            <table className="w-full text-[11px]">
              <thead>
                <tr>
                  <th className="text-left pb-2 font-medium" style={{ color: 'var(--text3)' }}>Permission</th>
                  {['Admin', 'Mod', 'Staff'].map((r) => (
                    <th key={r} className="text-center pb-2 font-medium" style={{ color: 'var(--text3)' }}>{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS.map((perm) => {
                  const [a, m, s] = PERM_MATRIX[perm]
                  return (
                    <tr key={perm} style={{ borderTop: '1px solid var(--border2)' }}>
                      <td className="py-1.5" style={{ color: 'var(--text2)' }}>{perm}</td>
                      {[a, m, s].map((val, ci) => (
                        <td key={ci} className="text-center py-1.5">
                          {val === 'full' && <Check size={11} color="#2ec27e" className="mx-auto" />}
                          {val === 'partial' && <span style={{ color: '#f4a623', fontSize: 14, lineHeight: 1 }}>~</span>}
                          {val === 'none' && <span style={{ color: 'var(--text3)', fontSize: 12 }}>—</span>}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 2fr */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Pending Approvals */}
          <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>Pending Approvals</p>
              <Pill variant="y">3 pending</Pill>
            </div>

            <div className="flex flex-col gap-3">
              {PENDING.map((p, i) => {
                const isApproved = approved[i]
                const isRejected = rejected[i]
                const isConfirming = rejectStates[i]

                if (isApproved) {
                  return (
                    <div key={i} className="rounded-[8px] p-3 flex items-center gap-2" style={{ background: 'rgba(46,194,126,0.08)', border: '1px solid rgba(46,194,126,0.2)' }}>
                      <Check size={13} color="#2ec27e" />
                      <span className="text-[12px]" style={{ color: '#2ec27e' }}>Đã duyệt: {p.name}</span>
                    </div>
                  )
                }
                if (isRejected) {
                  return (
                    <div key={i} className="rounded-[8px] p-3 flex items-center gap-2" style={{ background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.2)' }}>
                      <X size={13} color="#E63946" />
                      <span className="text-[12px]" style={{ color: '#E63946' }}>Đã từ chối: {p.name}</span>
                    </div>
                  )
                }

                return (
                  <div
                    key={i}
                    className="rounded-[8px] p-3"
                    style={{ background: 'var(--p3)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
                        style={{ width: 32, height: 32, background: 'rgba(69,123,157,0.2)', color: 'var(--lt)' }}
                      >
                        {p.name.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{p.name}</span>
                          <Pill variant="g">Đã tải CMND/Bằng cấp</Pill>
                        </div>
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--text2)' }}>{p.school}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{p.time}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setApproved((prev) => ({ ...prev, [i]: true }))}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-[6px] text-[11px] font-semibold"
                          style={{ background: 'rgba(46,194,126,0.15)', color: '#2ec27e', border: '1px solid rgba(46,194,126,0.3)' }}
                        >
                          <Check size={11} /> Duyệt
                        </button>
                        <button
                          onClick={() => setRejectStates((prev) => ({ ...prev, [i]: true }))}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-[6px] text-[11px] font-semibold"
                          style={{ background: 'rgba(230,57,70,0.12)', color: '#E63946', border: '1px solid rgba(230,57,70,0.25)' }}
                        >
                          <X size={11} /> Từ chối
                        </button>
                      </div>
                    </div>

                    {isConfirming && (
                      <div
                        className="mt-3 rounded-[7px] p-2.5"
                        style={{ background: 'rgba(244,166,35,0.08)', border: '1px solid rgba(244,166,35,0.25)' }}
                      >
                        <p className="text-[12px] mb-2" style={{ color: '#f4a623' }}>
                          Bạn chắc chắn muốn từ chối giáo viên <strong>{p.name}</strong>?
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setRejected((prev) => ({ ...prev, [i]: true })); setRejectStates((prev) => ({ ...prev, [i]: false })) }}
                            className="px-2.5 py-1 rounded text-[11px] font-semibold"
                            style={{ background: 'rgba(230,57,70,0.2)', color: '#E63946', border: '1px solid rgba(230,57,70,0.35)' }}
                          >
                            Xác nhận
                          </button>
                          <button
                            onClick={() => setRejectStates((prev) => ({ ...prev, [i]: false }))}
                            className="px-2.5 py-1 rounded text-[11px] font-semibold"
                            style={{ background: 'var(--p3)', color: 'var(--text2)', border: '1px solid var(--border)' }}
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Internal Accounts Table */}
          <div className="si rounded-[10px] p-4" style={{ background: 'var(--p2)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>Tài khoản nội bộ</p>
              <button
                className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-[6px]"
                style={{ background: 'rgba(69,123,157,0.2)', color: 'var(--lt)', border: '1px solid rgba(69,123,157,0.3)' }}
              >
                <Plus size={10} /> Tạo tài khoản
              </button>
            </div>

            {/* Filter chips */}
            <div className="flex gap-1.5 mb-3">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors"
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

            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Tài khoản', 'Role', 'Trạng thái', 'Last active', 'Actions'].map((h) => (
                      <th
                        key={h}
                        className="text-left pb-2 pr-3 font-medium text-[11px]"
                        style={{ color: 'var(--text3)' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((acc) => (
                    <>
                      <tr
                        key={acc.id}
                        style={{ borderBottom: '1px solid var(--border2)' }}
                      >
                        <td className="py-2.5 pr-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                              style={{ width: 22, height: 22, background: 'rgba(69,123,157,0.18)', color: 'var(--lt)' }}
                            >
                              {acc.name.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p style={{ color: 'var(--text)' }}>{acc.name}</p>
                              <p className="text-[10px]" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{acc.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 pr-3">
                          <Pill variant={acc.role === 'Admin' ? 'p' : acc.role === 'Moderator' ? 't' : 'g'}>
                            {acc.role}
                          </Pill>
                        </td>
                        <td className="py-2.5 pr-3">
                          <div className="flex items-center gap-1.5">
                            <StatusDot status={statusDot(acc.status) as any} />
                            <span style={{ color: acc.status === 'Locked' ? '#E63946' : 'var(--text2)' }}>
                              {acc.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 pr-3">
                          <span style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{acc.last}</span>
                        </td>
                        <td className="py-2.5">
                          {acc.status !== 'Locked' ? (
                            <button
                              onClick={() => setLockConfirmRow(lockConfirmRow === acc.id ? null : acc.id)}
                              className="text-[11px] px-2 py-0.5 rounded"
                              style={{ background: 'rgba(230,57,70,0.1)', color: '#E63946', border: '1px solid rgba(230,57,70,0.2)' }}
                            >
                              Khóa
                            </button>
                          ) : (
                            <button
                              className="text-[11px] px-2 py-0.5 rounded"
                              style={{ background: 'rgba(46,194,126,0.1)', color: '#2ec27e', border: '1px solid rgba(46,194,126,0.2)' }}
                            >
                              Mở khóa
                            </button>
                          )}
                        </td>
                      </tr>
                      {lockConfirmRow === acc.id && (
                        <tr>
                          <td colSpan={5} className="pb-2">
                            <div
                              className="rounded-[7px] p-2.5 text-[11px]"
                              style={{ background: 'rgba(244,166,35,0.08)', border: '1px solid rgba(244,166,35,0.25)' }}
                            >
                              <p className="mb-2" style={{ color: '#f4a623' }}>
                                Khóa tài khoản <strong>{acc.name}</strong>? Người dùng sẽ không thể đăng nhập.
                              </p>
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => setLockConfirmRow(null)}
                                  className="px-2.5 py-1 rounded text-[11px] font-semibold"
                                  style={{ background: 'rgba(230,57,70,0.2)', color: '#E63946', border: '1px solid rgba(230,57,70,0.3)' }}
                                >
                                  Xác nhận
                                </button>
                                <button
                                  onClick={() => setLockConfirmRow(null)}
                                  className="px-2.5 py-1 rounded text-[11px] font-semibold"
                                  style={{ background: 'var(--p3)', color: 'var(--text2)', border: '1px solid var(--border)' }}
                                >
                                  Hủy
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
