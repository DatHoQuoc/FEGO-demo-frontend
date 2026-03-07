'use client'

import { useState } from 'react'
import Sidebar from './sidebar-admin'
import Topbar from './Topbar'
import { type ScreenId } from '@/lib/navigation'
import dynamic from 'next/dynamic'

const S0Dashboard      = dynamic(() => import('@/screens/s0-Dashboard'),      { ssr: false })
const S1SystemHealth   = dynamic(() => import('@/screens/s1-SystemHealth'),   { ssr: false })
const S2RolePermission = dynamic(() => import('@/screens/s2-RolePermission'), { ssr: false })
const S3ModeratorMgmt  = dynamic(() => import('@/screens/s3-ModeratorMgmt'),  { ssr: false })
const S4SystemConfig   = dynamic(() => import('@/screens/s4-SystemConfig'),   { ssr: false })
const S5AuditLog       = dynamic(() => import('@/screens/s5-AuditLog'),       { ssr: false })

export default function Shell() {
  const [active, setActive] = useState<ScreenId>('s0')
  const [search, setSearch] = useState('')

  function handleNav(id: ScreenId) {
    setActive(id)
    setSearch('')
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
        <div style={{ display: active === 's0' ? 'block' : 'none' }}><S0Dashboard onNav={handleNav} isActive={active === 's0'} /></div>
        {/* <div style={{ display: active === 's1' ? 'block' : 'none' }}><S1SystemHealth onNav={handleNav} isActive={active === 's1'} /></div>
        <div style={{ display: active === 's2' ? 'block' : 'none' }}><S2RolePermission isActive={active === 's2'} /></div>
        <div style={{ display: active === 's3' ? 'block' : 'none' }}><S3ModeratorMgmt isActive={active === 's3'} /></div>
        <div style={{ display: active === 's4' ? 'block' : 'none' }}><S4SystemConfig isActive={active === 's4'} /></div>
        <div style={{ display: active === 's5' ? 'block' : 'none' }}><S5AuditLog isActive={active === 's5'} /></div> */}
      </main>
    </div>
  )
}