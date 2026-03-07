export type ScreenId = 's0' | 's1' | 's2' | 's3' | 's4' | 's5'

export interface NavMeta {
  id: ScreenId
  t: string
  crumb: string
  action: string
}

export const META: NavMeta[] = [
  { id: 's0', t: 'Dashboard',         crumb: 'Tổng quan — Sức khỏe nền tảng',         action: '↺ Refresh' },
  { id: 's1', t: 'System Health',     crumb: 'Kỹ thuật — Phát hiện sớm',              action: '↺ Refresh' },
  { id: 's2', t: 'Role & Permission', crumb: 'Tạo & quản lý tài khoản nội bộ',        action: '+ Tạo tài khoản' },
  { id: 's3', t: 'Moderator Mgmt',    crumb: 'Assign & theo dõi workload',             action: '+ Assign Moderator' },
  { id: 's4', t: 'System Config',     crumb: 'AI · Routing · Prompts · Flags · Cost', action: '💾 Lưu thay đổi' },
  { id: 's5', t: 'Audit Log',         crumb: 'Ai làm gì, lúc nào + Alert rules',      action: '↓ Export log' },
]

export const SECTIONS = [
  { label: 'SYSTEM',        ids: ['s0', 's1'] },
  { label: 'ACCOUNTS',      ids: ['s2', 's3'] },
  { label: 'CONFIGURATION', ids: ['s4'] },
  { label: 'LOGS',          ids: ['s5'] },
] as const

export const BADGES: Partial<Record<ScreenId, { count: string; color: 'red' | 'yellow' }>> = {
  s1: { count: '2', color: 'red' },
  s2: { count: '3', color: 'yellow' },
}
