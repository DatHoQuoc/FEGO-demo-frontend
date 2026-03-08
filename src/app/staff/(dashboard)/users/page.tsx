"use client"

import { useState } from "react"
import { Download, Search, UserCheck, UserPlus, Clock, UserX, Sparkles, ChevronDown } from "lucide-react"

const filterTabs = [
  { label: "Tat ca", count: "1,240", active: false, bg: "bg-card-bg" },
  { label: "Active", count: "1,087", active: true, bg: "bg-navy text-fg-light" },
  { label: "Trial", count: "89", active: false, bg: "bg-card-bg" },
  { label: "Sap het han", count: "23", active: false, bg: "bg-card-bg" },
  { label: "Het han", count: "64", active: false, bg: "bg-card-bg" },
  { label: "Loi TT", count: "2", active: false, bg: "bg-red text-fg-light" },
]

const statsCards = [
  {
    icon: UserCheck,
    iconBg: "bg-teal",
    iconColor: "text-navy",
    value: "1,087",
    label: "Active",
    sub: "87.7% tong users",
  },
  {
    icon: UserPlus,
    iconBg: "bg-blue",
    iconColor: "text-fg-light",
    value: "89",
    label: "Trial",
    sub: "Trung binh con 8 ngay",
  },
  {
    icon: Clock,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-warning",
    value: "23",
    label: "Sap het han",
    sub: "Trong vong 7 ngay",
    subColor: "text-warning",
  },
  {
    icon: UserX,
    iconBg: "bg-[#FEE2E2]",
    iconColor: "text-red",
    value: "64",
    label: "Expired",
    sub: "Chua gia han",
    subColor: "text-red",
  },
]

const users = [
  {
    id: 1,
    initials: "NTL",
    name: "Nguyen Thi Lan",
    email: "ntlan@email.com",
    role: "Giao vien",
    status: "Active",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    expiry: "01/09/2026",
    expiryColor: "text-navy",
    usage: 80,
    usageLabel: "Cao",
    flag: null,
    highlight: false,
  },
  {
    id: 2,
    initials: "PMD",
    name: "Pham Minh Duc",
    email: "pmduc@school.edu.vn",
    role: "Giao vien",
    status: "Active",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    expiry: "09/03/2026",
    expiryColor: "text-warning font-bold",
    usage: 80,
    usageLabel: "Cao",
    flag: { text: "Sap het han · Usage cao", bg: "bg-[#FEF3C7]", color: "text-[#92400E]" },
    highlight: "bg-[#FFFBEB]",
    showContact: true,
    expandable: true,
  },
  {
    id: 3,
    initials: "LTH",
    name: "Le Thu Huong",
    email: "lthuong@email.com",
    role: "Hoc sinh",
    status: "Trial",
    statusBg: "bg-[#EBF7F8]",
    statusColor: "text-blue",
    expiry: "Con 5 ngay",
    expiryColor: "text-warning",
    usage: 50,
    usageLabel: "Trung binh",
    flag: { text: "Trial sap het", bg: "bg-[#FEF3C7]", color: "text-[#92400E]" },
    highlight: false,
  },
  {
    id: 4,
    initials: "TVB",
    name: "Tran Van Binh",
    email: "tvbinh@email.com",
    role: "Giao vien",
    status: "Loi TT",
    statusBg: "bg-red",
    statusColor: "text-fg-light",
    expiry: "05/03/2026",
    expiryColor: "text-red",
    usage: null,
    usageLabel: null,
    flag: { text: "Giao dich that bai", bg: "bg-[#FEE2E2]", color: "text-[#991B1B]" },
    highlight: "bg-[#FFF5F5]",
    showProcess: true,
  },
  {
    id: 5,
    initials: "NBA",
    name: "Nguyen Bao An",
    email: "nban@email.com",
    role: "Hoc sinh",
    status: "Active",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    expiry: "15/06/2026",
    expiryColor: "text-navy",
    usage: 20,
    usageLabel: "Thap",
    flag: null,
    highlight: false,
  },
  {
    id: 6,
    initials: "VTM",
    name: "Vo Thi Mai",
    email: "vtmai@email.com",
    role: "Giao vien",
    status: "Expired",
    statusBg: "bg-[#FEE2E2]",
    statusColor: "text-[#991B1B]",
    expiry: "01/02/2026",
    expiryColor: "text-red",
    usage: 20,
    usageLabel: "Thap",
    flag: { text: "Da het han 33 ngay", bg: "bg-[#FEE2E2]", color: "text-[#991B1B]" },
    highlight: false,
  },
  {
    id: 7,
    initials: "TMK",
    name: "Tran Minh Khoa",
    email: "tmkhoa@email.com",
    role: "Hoc sinh",
    status: "Active",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    expiry: "20/08/2026",
    expiryColor: "text-navy",
    usage: 80,
    usageLabel: "Cao",
    flag: null,
    highlight: false,
  },
  {
    id: 8,
    initials: "HVN",
    name: "Hoang Van Nam",
    email: "hvnam@email.com",
    role: "Giao vien",
    status: "Trial",
    statusBg: "bg-[#EBF7F8]",
    statusColor: "text-blue",
    expiry: "Con 12 ngay",
    expiryColor: "text-navy",
    usage: 80,
    usageLabel: "Cao",
    flag: { text: "Trial usage cao → Tiem nang convert", bg: "bg-[#EBF7F8]", color: "text-blue" },
    highlight: false,
  },
  {
    id: 9,
    initials: "LTH",
    name: "Ly Thi Hoa",
    email: "lthoa@email.com",
    role: "Hoc sinh",
    status: "Active",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    expiry: "30/04/2026",
    expiryColor: "text-navy",
    usage: 50,
    usageLabel: "Trung binh",
    flag: null,
    highlight: false,
  },
  {
    id: 10,
    initials: "DMQ",
    name: "Dang Minh Quan",
    email: "dmquan@email.com",
    role: "Giao vien",
    status: "Expired",
    statusBg: "bg-[#FEE2E2]",
    statusColor: "text-[#991B1B]",
    expiry: "15/01/2026",
    expiryColor: "text-red",
    usage: 20,
    usageLabel: "Thap",
    flag: null,
    highlight: false,
  },
]

export default function UsersPage() {
  const [expandedRow, setExpandedRow] = useState<number | null>(2)
  const [activeFilter, setActiveFilter] = useState("Active")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Quan ly Users & Subscription</h1>
          <p className="mt-1 text-sm text-muted-text">1,240 tai khoan · 06/03/2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-blue px-4 py-2 text-sm font-medium text-blue hover:bg-blue/5 transition-colors">
            <Download className="h-4 w-4" />
            Xuat danh sach
          </button>
          <button className="rounded-lg bg-card-bg p-2.5 border border-border-light hover:bg-hover-row transition-colors">
            <Search className="h-5 w-5 text-navy" />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]"
          >
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full ${card.iconBg}`}>
              <card.icon className={`h-5 w-5 ${card.iconColor}`} />
            </div>
            <p className="font-mono text-3xl font-bold text-navy">{card.value}</p>
            <p className="text-sm text-muted-text">{card.label}</p>
            <p className={`mt-1 font-mono text-xs ${card.subColor || 'text-muted-text'}`}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {filterTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(tab.label)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === tab.label 
                  ? 'bg-navy text-fg-light' 
                  : tab.label === 'Loi TT' 
                    ? 'bg-red text-fg-light' 
                    : 'bg-card-bg text-navy border border-border-light hover:bg-hover-row'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
            <input
              type="text"
              placeholder="Tim theo ten, email..."
              className="h-9 rounded-lg border border-border-light bg-card-bg pl-9 pr-4 text-sm placeholder:text-muted-text focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-border-light bg-card-bg px-3 py-2 text-sm text-navy hover:bg-hover-row">
            Tat ca vai tro <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border-light bg-card-bg px-3 py-2 text-sm text-navy hover:bg-hover-row">
            Het han som nhat <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* AI Follow-up Banner */}
      <div className="flex items-center gap-4 rounded-[10px] border-l-4 border-teal bg-[#EBF7F8] px-4 py-3.5">
        <Sparkles className="h-5 w-5 flex-shrink-0 text-blue" />
        <div className="flex-1">
          <p className="text-sm font-medium text-navy">
            He thong phat hien 8 tai khoan can follow-up uu tien cao
          </p>
          <p className="text-xs text-muted-text">
            5 giao vien sap het han co usage cao · 2 loi thanh toan · 1 trial co usage cao can convert
          </p>
        </div>
        <button className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-fg-light hover:bg-navy-light transition-colors">
          Xem danh sach uu tien →
        </button>
      </div>

      {/* Main Table */}
      <div className="rounded-[10px] border border-border-light bg-card-bg shadow-[0_1px_3px_rgba(29,53,87,0.10)] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1.5fr_1fr] gap-4 bg-navy px-4 py-3">
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Ten</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Vai tro</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Trang thai</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Het han</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Usage 30 ngay</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Flag</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Hanh dong</span>
        </div>

        {/* Table Rows */}
        {users.map((user) => (
          <div key={user.id}>
            <div
              className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1.5fr_1fr] gap-4 items-center px-4 py-3 border-b border-border-light hover:bg-hover-row cursor-pointer ${user.highlight || ''}`}
              onClick={() => user.expandable && setExpandedRow(expandedRow === user.id ? null : user.id)}
            >
              {/* Name */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-navy text-xs font-semibold">
                  {user.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-navy truncate">{user.name}</p>
                  <p className="text-xs text-muted-text truncate">{user.email}</p>
                </div>
              </div>

              {/* Role */}
              <span className="text-sm text-navy">{user.role}</span>

              {/* Status */}
              <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${user.statusBg} ${user.statusColor}`}>
                {user.status}
              </span>

              {/* Expiry */}
              <span className={`font-mono text-sm ${user.expiryColor}`}>{user.expiry}</span>

              {/* Usage */}
              <div>
                {user.usage !== null ? (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-border-light overflow-hidden">
                      <div
                        className="h-full bg-teal rounded-full"
                        style={{ width: `${user.usage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-text">{user.usageLabel}</span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-text">—</span>
                )}
              </div>

              {/* Flag */}
              <div>
                {user.flag ? (
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs ${user.flag.bg} ${user.flag.color}`}>
                    {user.flag.text}
                  </span>
                ) : (
                  <span className="text-xs text-muted-text">—</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {user.showContact && (
                  <button className="rounded-lg border border-blue px-2.5 py-1 text-xs font-medium text-blue hover:bg-blue/5">
                    Lien he
                  </button>
                )}
                {user.showProcess && (
                  <button className="rounded-lg bg-red px-2.5 py-1 text-xs font-medium text-fg-light hover:opacity-90">
                    Xu ly
                  </button>
                )}
                <button className="text-xs text-blue hover:underline">Xem</button>
              </div>
            </div>

            {/* Expanded Row Panel */}
            {expandedRow === user.id && user.expandable && (
              <div className="border-t-2 border-teal bg-card-bg px-8 py-5">
                <div className="grid grid-cols-2 gap-8">
                  {/* Left - Account Details */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-navy">
                      Pham Minh Duc · GV · THPT Nguyen Du
                    </h3>
                    <p className="text-xs text-muted-text">
                      Email: pmduc@school.edu.vn · Tham gia: 01/09/2025
                    </p>
                    <p className="text-xs text-navy">
                      Goi hien tai: <span className="font-medium">Giao vien Pro</span> · 299,000 VND/thang
                    </p>
                    <p className="text-xs text-muted-text">
                      Usage stats: 47 phien · 89 bai · 28 lop trong 30 ngay
                    </p>
                  </div>

                  {/* Right - Quick Actions */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-blue px-3 py-2 text-xs font-medium text-blue hover:bg-blue/5">
                        Gia han thu nghiem
                      </button>
                      <button className="rounded-lg border border-blue px-3 py-2 text-xs font-medium text-blue hover:bg-blue/5">
                        Dieu chinh goi
                      </button>
                    </div>
                    <textarea
                      placeholder="Them ghi chu CS..."
                      className="w-full rounded-lg border border-border-light bg-page-bg px-3 py-2 text-xs placeholder:text-muted-text focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-red px-3 py-1.5 text-xs font-medium text-red hover:bg-red/5">
                        Hoan tien
                      </button>
                      <button className="rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-fg-light hover:bg-navy-light">
                        Lien he qua email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-text">Hien thi 1-10 / 1,240 tai khoan</p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-border-light bg-card-bg px-3 py-1.5 text-sm text-muted-text hover:bg-hover-row">
            Truoc
          </button>
          <button className="rounded-lg border border-border-light bg-card-bg px-3 py-1.5 text-sm text-navy hover:bg-hover-row">
            Sau
          </button>
        </div>
      </div>
    </div>
  )
}
