'use client'

import { LayoutDashboard, Activity, Users, UserCog, Settings, FileText } from 'lucide-react'
import { META, SECTIONS, BADGES, type ScreenId } from '@/lib/navigation'
import { cn } from '@/lib/utils'

const ICONS: Record<ScreenId, React.ElementType> = {
  s0: LayoutDashboard,
  s1: Activity,
  s2: Users,
  s3: UserCog,
  s4: Settings,
  s5: FileText,
}

interface SidebarProps {
  active: ScreenId
  onNav: (id: ScreenId) => void
}

export default function Sidebar({ active, onNav }: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 flex flex-col z-40 overflow-hidden"
      style={{
        width: 'var(--sidebar-w)',
        height: '100vh',
        background: 'var(--p1)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* Dot grid texture */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width="100%" height="100%"
        style={{ opacity: 0.04 }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="#A8DADC" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-5 relative"
        style={{ height: 'var(--topbar-h)', borderBottom: '1px solid var(--border)' }}
      >
        <div
          className="flex items-center justify-center rounded-[7px] flex-shrink-0"
          style={{ width: 30, height: 30, background: 'rgba(69,123,157,0.2)', border: '1px solid rgba(69,123,157,0.35)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <polygon points="8,1 15,14 1,14" fill="none" stroke="#A8DADC" strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="8,5 12,12 4,12" fill="rgba(168,218,220,0.2)" />
          </svg>
        </div>
        <div>
          <p className="text-[13px] font-bold leading-none" style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}>
            VisualEdu
          </p>
          <p className="text-[10px] font-medium mt-0.5" style={{ color: 'var(--teal)', fontFamily: 'var(--font-sans)' }}>
            Admin
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 relative px-2" aria-label="Main navigation">
        {SECTIONS.map((section) => (
          <div key={section.label} className="mb-4">
            <p
              className="px-3 mb-1 text-[9px] font-bold uppercase tracking-[0.12em]"
              style={{ color: 'var(--text3)', fontFamily: 'var(--font-sans)' }}
            >
              {section.label}
            </p>
            {(section.ids as readonly string[]).map((sid) => {
              const meta = META.find((m) => m.id === sid)!
              const Icon = ICONS[sid as ScreenId] as React.FC<{ size?: number; className?: string }>
              const isActive = active === sid
              const badge = BADGES[sid as ScreenId]

              return (
                <button
                  key={sid}
                  onClick={() => onNav(sid as ScreenId)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] mb-0.5 text-left transition-colors duration-150 group',
                    isActive
                      ? 'text-[var(--lt)]'
                      : 'text-[var(--text2)] hover:bg-[rgba(69,123,157,0.07)] hover:text-[var(--text)]'
                  )}
                  style={
                    isActive
                      ? {
                          background: 'rgba(69,123,157,0.12)',
                          borderLeft: '2px solid var(--teal)',
                          paddingLeft: 'calc(12px - 2px)',
                        }
                      : { borderLeft: '2px solid transparent' }
                  }
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={14} className="flex-shrink-0" />
                  <span className="flex-1 text-[12px] font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                    {meta.t}
                  </span>
                  {badge && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                      style={{
                        background: badge.color === 'red' ? 'rgba(230,57,70,0.2)' : 'rgba(244,166,35,0.2)',
                        color: badge.color === 'red' ? '#E63946' : '#f4a623',
                      }}
                    >
                      {badge.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Admin profile */}
      <div
        className="px-4 py-3 relative"
        style={{ borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.15)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0 text-[11px] font-bold"
            style={{ width: 30, height: 30, background: 'rgba(69,123,157,0.3)', color: 'var(--lt)' }}
          >
            AD
          </div>
          <div>
            <p className="text-[12px] font-semibold leading-none" style={{ color: 'var(--text)' }}>Admin</p>
            <p className="text-[10px] mt-0.5" style={{ color: 'var(--text3)' }}>CTO / Founder</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
