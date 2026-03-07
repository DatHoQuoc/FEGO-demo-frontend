'use client'

import {
  Plus, Edit2, Trash2, Shield, Settings, Lock,
  Cpu, CreditCard,
} from 'lucide-react'
import Pill from './Pill'

type LogType = 'cr' | 'ed' | 'dl' | 'au' | 'sy' | 'lk' | 'ai' | 'bi'

interface LogItemProps {
  type: LogType
  title: string
  meta: string
  timestamp: string
  status?: 'success' | 'warning' | 'error' | 'info'
  className?: string
}

const TYPE_MAP: Record<LogType, { icon: React.ElementType; bg: string; color: string }> = {
  cr: { icon: Plus,       bg: 'rgba(46,194,126,0.15)',   color: '#2ec27e' },
  ed: { icon: Edit2,      bg: 'rgba(69,123,157,0.18)',   color: '#A8DADC' },
  dl: { icon: Trash2,     bg: 'rgba(230,57,70,0.15)',    color: '#E63946' },
  au: { icon: Shield,     bg: 'rgba(155,114,207,0.15)',  color: '#9b72cf' },
  sy: { icon: Settings,   bg: 'rgba(22,40,64,0.8)',      color: '#8dafc4' },
  lk: { icon: Lock,       bg: 'rgba(244,166,35,0.15)',   color: '#f4a623' },
  ai: { icon: Cpu,        bg: 'rgba(58,106,138,0.2)',    color: '#A8DADC' },
  bi: { icon: CreditCard, bg: 'rgba(46,194,126,0.12)',   color: '#2ec27e' },
}

const STATUS_PILL: Record<string, { v: 'g' | 'r' | 'y' | 't'; label: string }> = {
  success: { v: 'g', label: 'Success' },
  warning: { v: 'y', label: 'Warning' },
  error:   { v: 'r', label: 'Error' },
  info:    { v: 't', label: 'Info' },
}

export default function LogItem({ type, title, meta, timestamp, status, className }: LogItemProps) {
  const { icon: Icon, bg, color } = TYPE_MAP[type] as { icon: React.FC<{ size?: number; color?: string }>, bg: string, color: string }
  const statusPill = status ? STATUS_PILL[status] : null

  return (
    <div
      className={`flex items-start gap-3 py-2.5 si ${className ?? ''}`}
      style={{ borderBottom: '1px solid var(--border2)' }}
    >
      <div
        className="flex items-center justify-center rounded-[7px] flex-shrink-0 mt-0.5"
        style={{ width: 28, height: 28, background: bg }}
      >
        <Icon size={13} color={color} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p
            className="text-[12px] font-medium leading-tight"
            style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}
          >
            {title}
          </p>
          {statusPill && <Pill variant={statusPill.v}>{statusPill.label}</Pill>}
        </div>
        <p
          className="text-[11px] mt-0.5 truncate"
          style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}
        >
          {meta}
        </p>
      </div>
      <span
        className="text-[10px] flex-shrink-0 mt-0.5"
        style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}
      >
        {timestamp}
      </span>
    </div>
  )
}
