'use client'

import { Search, RefreshCw, PlusCircle, Save, Download } from 'lucide-react'
import { META, type ScreenId } from '@/lib/navigation'
import { useRouter } from 'next/navigation';

interface TopbarProps {
  active: ScreenId
  onAction?: () => void
  searchValue?: string
  onSearchChange?: (v: string) => void
}

const ACTION_ICON: Record<string, React.ElementType> = {
  '↺ Refresh': RefreshCw,
  '+ Tạo tài khoản': PlusCircle,
  '+ Assign Moderator': PlusCircle,
  '💾 Lưu thay đổi': Save,
  '↓ Export log': Download,
}

export default function Topbar({ active, onAction, searchValue = '', onSearchChange }: TopbarProps) {
  const meta = META.find((m) => m.id === active)!
  const ActionIcon = (ACTION_ICON[meta.action] ?? RefreshCw) as React.FC<{ size?: number }>
  const router = useRouter();
  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center"
      style={{
        left: 'var(--sidebar-w)',
        height: 'var(--topbar-h)',
        background: 'var(--p1)',
        borderBottom: '1px solid var(--border)',
        paddingLeft: 24,
        paddingRight: 20,
      }}
    >
      {/* Left: title + crumb */}
      <div className="flex-1 min-w-0">
        <h1
          className="text-[18px] leading-none font-serif"
          style={{ color: 'var(--text)', fontFamily: 'var(--font-serif)' }}
        >
          {meta.t}
        </h1>
        <p
          className="text-[11px] mt-0.5"
          style={{ color: 'var(--text2)', fontFamily: 'var(--font-sans)' }}
        >
          {meta.crumb}
        </p>
      </div>

      {/* Right: search + action */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="relative">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text3)' }}
          />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-7 pr-3 py-1.5 rounded-[7px] text-[12px] focus:outline-none focus:ring-1 focus:ring-[var(--teal)]"
            style={{
              background: 'var(--p3)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              width: 180,
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        <button
          onClick={() => {
            router.push('/admin');
            onAction?.();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[12px] font-semibold transition-colors duration-150 hover:opacity-90"
          style={{
            background: 'rgba(69,123,157,0.25)',
            border: '1px solid rgba(69,123,157,0.4)',
            color: 'var(--lt)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <ActionIcon size={12} />
          {meta.action.replace(/^[↺+💾↓]\s*/, '')}
        </button>
      </div>
    </header>
  )
}
