'use client'

import { useState } from 'react'
import Sidebar from './sidebar-admin'
import Topbar from './Topbar'
import { type ScreenId } from '@/lib/navigation'
import dynamic from 'next/dynamic'

const S0Dashboard       = dynamic(() => import('@/screens/s0-Dashboard'))
const S1SystemHealth    = dynamic(() => import('@/screens/s1-SystemHealth'))
const S2RolePermission  = dynamic(() => import('@/screens/s2-RolePermission'))
const S3ModeratorMgmt   = dynamic(() => import('@/screens/s3-ModeratorMgmt'))
const S4SystemConfig    = dynamic(() => import('@/screens/s4-SystemConfig'))
const S5AuditLog        = dynamic(() => import('@/screens/s5-AuditLog'))

export default function Shell() {
  const [active, setActive]   = useState<ScreenId>('s0')
  const [search, setSearch]   = useState('')

  function handleNav(id: ScreenId) {
    setActive(id)
    setSearch('')
  }

  function renderScreen() {
    switch (active) {
      case 's0': return <S0Dashboard onNav={handleNav} />
      case 's1': return <S1SystemHealth onNav={handleNav} />
      case 's2': return <S2RolePermission />
      case 's3': return <S3ModeratorMgmt />
      case 's4': return <S4SystemConfig />
      case 's5': return <S5AuditLog />
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Sidebar active={active} onNav={handleNav} />
      <Topbar
        active={active}
        searchValue={search}
        onSearchChange={setSearch}
      />
      <main
        className="content-scroll"
        style={{
          marginLeft: 'var(--sidebar-w)',
          marginTop: 'var(--topbar-h)',
          padding: '22px 24px',
        }}
      >
        {renderScreen()}
      </main>
    </div>
  )
}
