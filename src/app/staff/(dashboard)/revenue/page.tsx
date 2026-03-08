"use client"

import { useState } from "react"
import { Download, ChevronDown, AlertCircle, Search, Phone, RefreshCw, Check, X } from "lucide-react"

const mrrData = [
  { month: "T10/25", value: 38 },
  { month: "T11/25", value: 40 },
  { month: "T12/25", value: 42 },
  { month: "T1/26", value: 43 },
  { month: "T2/26", value: 43.3 },
  { month: "T3/26", value: 48.5 },
]

const filterTabs = [
  { label: "Tat ca", count: "312", active: true },
  { label: "Thanh cong", count: "307", active: false },
  { label: "That bai", count: "2", active: false },
  { label: "Hoan tien", count: "3", active: false },
]

const transactions = [
  {
    id: "#TXN-2892",
    time: "06/03 21:14",
    customer: "Nguyen Thi Lan",
    plan: "GV Pro",
    amount: "299,000",
    status: "success",
    statusLabel: "Thanh cong",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    payment: "Visa 4567",
    highlight: false,
  },
  {
    id: "#TXN-2891",
    time: "05/03 23:14",
    customer: "Le Thu Huong",
    plan: "HS Basic",
    amount: "99,000",
    status: "failed",
    statusLabel: "That bai",
    statusIcon: "x",
    statusBg: "bg-[#FEE2E2]",
    statusColor: "text-[#991B1B]",
    payment: "Visa 4242",
    highlight: "bg-[#FFF5F5]",
    showProcess: true,
  },
  {
    id: "#TXN-2890",
    time: "05/03 18:32",
    customer: "Tran Van Binh",
    plan: "GV Pro",
    amount: "299,000",
    status: "failed",
    statusLabel: "That bai",
    statusIcon: "x",
    statusBg: "bg-[#FEE2E2]",
    statusColor: "text-[#991B1B]",
    payment: "MC 5678",
    highlight: "bg-[#FFF5F5]",
    showProcess: true,
  },
  {
    id: "#TXN-2889",
    time: "05/03 15:01",
    customer: "Hoang Van Nam",
    plan: "GV Pro",
    amount: "299,000",
    status: "success",
    statusLabel: "Thanh cong",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    payment: "Visa 9012",
    highlight: false,
  },
  {
    id: "#TXN-2888",
    time: "05/03 11:23",
    customer: "Nguyen Bao An",
    plan: "HS Basic",
    amount: "99,000",
    status: "success",
    statusLabel: "Thanh cong",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    payment: "ATM",
    highlight: false,
  },
  {
    id: "#TXN-2887",
    time: "04/03 20:45",
    customer: "Truong THPT Chu Van An",
    plan: "Truong Pro Plus",
    amount: "15,000,000",
    status: "success",
    statusLabel: "Thanh cong",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    payment: "Bank transfer",
    highlight: false,
    isSchool: true,
  },
  {
    id: "#TXN-2886",
    time: "04/03 14:12",
    customer: "Vo Thi Mai",
    plan: "GV Pro",
    amount: "299,000",
    status: "success",
    statusLabel: "Thanh cong",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    payment: "Visa 3456",
    highlight: false,
  },
  {
    id: "#TXN-2885",
    time: "04/03 09:30",
    customer: "Ly Thi Hoa",
    plan: "HS Basic",
    amount: "99,000",
    status: "refund",
    statusLabel: "Cho hoan",
    statusIcon: "refresh",
    statusBg: "bg-[#FEF3C7]",
    statusColor: "text-[#92400E]",
    payment: "—",
    highlight: "bg-[#FFFBEB]",
    showApprove: true,
  },
  {
    id: "#TXN-2884",
    time: "03/03 22:11",
    customer: "Dang Minh Quan",
    plan: "GV Pro",
    amount: "299,000",
    status: "success",
    statusLabel: "Thanh cong",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    payment: "MC 7890",
    highlight: false,
  },
  {
    id: "#TXN-2883",
    time: "03/03 16:44",
    customer: "Pham Minh Duc",
    plan: "GV Pro",
    amount: "299,000",
    status: "success",
    statusLabel: "Thanh cong",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    payment: "Visa 2345",
    highlight: false,
  },
  {
    id: "#TXN-2882",
    time: "02/03 13:20",
    customer: "Tran Minh Khoa",
    plan: "HS Basic",
    amount: "99,000",
    status: "success",
    statusLabel: "Thanh cong",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    payment: "ATM",
    highlight: false,
  },
  {
    id: "#TXN-2881",
    time: "01/03 10:05",
    customer: "THPT Le Quy Don",
    plan: "Truong Basic",
    amount: "5,000,000",
    status: "success",
    statusLabel: "Thanh cong",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    payment: "Bank transfer",
    highlight: false,
    isSchool: true,
  },
]

const pendingRefunds = [
  {
    id: "REF-089",
    customer: "Ly Thi Hoa",
    amount: "99,000",
    requestDate: "04/03",
    reason: "Mua nham goi",
  },
  {
    id: "REF-088",
    customer: "Nguyen Van A",
    amount: "299,000",
    requestDate: "02/03",
    reason: "Khong dung duoc",
  },
  {
    id: "REF-087",
    customer: "Truong THPT X",
    amount: "2,000,000",
    requestDate: "28/02",
    reason: "Doi goi",
  },
]

export default function RevenuePage() {
  const [activeFilter, setActiveFilter] = useState("Tat ca")
  const [periodTab, setPeriodTab] = useState("6T")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Doanh thu & Thanh toan</h1>
          <p className="mt-1 text-sm text-muted-text">Thang 3/2026 · Cap nhat luc 21:47 06/03</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-border-light bg-card-bg px-3 py-2 text-sm text-navy hover:bg-hover-row">
            Thang 3/2026 <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-blue px-4 py-2 text-sm font-medium text-blue hover:bg-blue/5 transition-colors">
            <Download className="h-4 w-4" />
            Xuat bao cao
          </button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {/* MRR Card */}
        <div className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="flex items-end gap-1">
            <p className="font-mono text-4xl font-bold text-navy">48.5M</p>
            <span className="mb-1 text-sm text-muted-text">VND</span>
          </div>
          <p className="text-sm text-muted-text">Monthly Recurring Revenue</p>
          <p className="mt-1 text-xs text-success">+12% vs thang 2 (43.3M)</p>
          {/* Mini Sparkline */}
          <div className="mt-2 flex items-end gap-0.5 h-6">
            {mrrData.map((d, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t ${i === mrrData.length - 1 ? 'bg-navy' : 'bg-teal'}`}
                style={{ height: `${((d.value - 35) / 15) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Revenue This Month */}
        <div className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="flex items-end gap-1">
            <p className="font-mono text-4xl font-bold text-navy">9.7M</p>
            <span className="mb-1 text-sm text-muted-text">VND</span>
          </div>
          <p className="text-sm text-muted-text">6 ngay dau thang 3</p>
          <p className="mt-1 text-xs text-muted-text">312 giao dich thanh cong</p>
        </div>

        {/* Failed Transactions */}
        <div className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <p className="font-mono text-4xl font-bold text-red">2</p>
          <p className="text-sm text-muted-text">giao dich that bai</p>
          <p className="mt-1 text-xs text-red">Chua xu ly · Tong: 398,000 VND</p>
          <button className="mt-2 rounded-lg bg-red px-3 py-1.5 text-xs font-medium text-fg-light hover:opacity-90">
            Xu ly ngay →
          </button>
        </div>

        {/* Pending Refunds */}
        <div className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <p className="font-mono text-4xl font-bold text-warning">3</p>
          <p className="text-sm text-muted-text">hoan tien dang cho</p>
          <p className="mt-1 text-xs text-muted-text">Tong: 2,398,000 VND</p>
        </div>
      </div>

      {/* MRR Chart */}
      <div className="rounded-[10px] border border-border-light bg-card-bg p-5 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy">Xu huong MRR</h2>
          <div className="flex gap-1">
            {["3T", "6T", "12T"].map((tab) => (
              <button
                key={tab}
                onClick={() => setPeriodTab(tab)}
                className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                  periodTab === tab
                    ? 'bg-navy text-fg-light'
                    : 'text-muted-text hover:bg-hover-row'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Bar Chart */}
        <div className="flex items-end justify-between gap-4 h-48 pt-6">
          {mrrData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full flex flex-col items-center">
                <span className="font-mono text-xs text-muted-text mb-1">{d.value}M</span>
                {i === mrrData.length - 1 && (
                  <span className="absolute -top-5 right-0 text-xs text-success font-medium">+12% ↑</span>
                )}
                <div
                  className={`w-full max-w-16 rounded-t ${i === mrrData.length - 1 ? 'bg-navy' : 'bg-teal'}`}
                  style={{ height: `${((d.value - 30) / 20) * 140}px` }}
                />
              </div>
              <span className="font-mono text-xs text-muted-text">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Failed Transactions Alert */}
      <div className="rounded-[10px] border border-red border-l-4 bg-[#FFF5F5] p-4">
        <div className="flex items-center gap-3 mb-3">
          <AlertCircle className="h-5 w-5 text-red" />
          <span className="font-medium text-red">2 giao dich that bai can xu ly</span>
        </div>
        <div className="space-y-2">
          {transactions.filter(t => t.status === 'failed').map((tx) => (
            <div key={tx.id} className="flex items-center justify-between rounded-lg border border-red bg-card-bg p-3">
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-navy">{tx.id}</span>
                <span className="text-sm text-navy">·</span>
                <span className="text-sm text-navy">{tx.customer}</span>
                <span className="text-sm text-navy">·</span>
                <span className="font-mono text-sm font-medium text-navy">{tx.amount} VND</span>
                <span className="text-sm text-navy">·</span>
                <span className="text-sm text-muted-text">{tx.payment}</span>
                <span className="text-sm text-navy">·</span>
                <span className="text-sm text-muted-text">{tx.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-lg border border-blue px-2.5 py-1 text-xs font-medium text-blue hover:bg-blue/5">
                  <Phone className="h-3 w-3" />
                  Lien he khach hang
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-navy px-2.5 py-1 text-xs font-medium text-fg-light hover:bg-navy-light">
                  <RefreshCw className="h-3 w-3" />
                  Thu thanh toan lai
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveFilter(tab.label)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === tab.label 
                  ? 'bg-navy text-fg-light' 
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
              placeholder="Tim theo ten, ma GD..."
              className="h-9 rounded-lg border border-border-light bg-card-bg pl-9 pr-4 text-sm placeholder:text-muted-text focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-border-light bg-card-bg px-3 py-2 text-sm text-navy hover:bg-hover-row">
            01/03 — 06/03 <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border-light bg-card-bg px-3 py-2 text-sm text-navy hover:bg-hover-row">
            Tat ca muc <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Transaction Table */}
      <div className="rounded-[10px] border border-border-light bg-card-bg shadow-[0_1px_3px_rgba(29,53,87,0.10)] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_1fr_2fr_1.5fr_1.5fr_1.2fr_1.5fr_1fr] gap-4 bg-navy px-4 py-3">
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Ma GD</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Thoi gian</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Khach hang</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Goi</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light text-right">So tien</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Trang thai</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light">PT thanh toan</span>
          <span className="font-mono text-xs font-medium uppercase text-fg-light">Hanh dong</span>
        </div>

        {/* Table Rows */}
        {transactions.map((tx, index) => (
          <div
            key={tx.id}
            className={`grid grid-cols-[1fr_1fr_2fr_1.5fr_1.5fr_1.2fr_1.5fr_1fr] gap-4 items-center px-4 py-3 border-b border-border-light ${
              tx.highlight || (index % 2 === 1 ? 'bg-card-bg' : 'bg-page-bg/30')
            }`}
          >
            <span className="font-mono text-sm text-navy">{tx.id}</span>
            <span className="font-mono text-xs text-muted-text">{tx.time}</span>
            <span className="text-sm text-navy truncate">{tx.customer}</span>
            <span className="text-sm text-muted-text">{tx.plan}</span>
            <span className={`font-mono text-sm text-right ${tx.isSchool ? 'font-bold text-navy' : 'font-medium text-navy'}`}>
              {tx.amount} VND
            </span>
            <span className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${tx.statusBg} ${tx.statusColor}`}>
              {tx.statusIcon === 'check' && <Check className="h-3 w-3" />}
              {tx.statusIcon === 'x' && <X className="h-3 w-3" />}
              {tx.statusIcon === 'refresh' && <RefreshCw className="h-3 w-3" />}
              {tx.statusLabel}
            </span>
            <span className="text-sm text-muted-text">{tx.payment}</span>
            <div>
              {tx.showProcess && (
                <button className="rounded-lg bg-red px-2 py-1 text-xs font-medium text-fg-light hover:opacity-90">
                  Xu ly
                </button>
              )}
              {tx.showApprove && (
                <button className="rounded-lg border border-blue px-2 py-1 text-xs font-medium text-blue hover:bg-blue/5">
                  Duyet hoan tien
                </button>
              )}
              {!tx.showProcess && !tx.showApprove && (
                <button className="text-xs text-blue hover:underline">Xem</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pending Refunds Section */}
      <div className="rounded-[10px] border border-border-light bg-card-bg p-5 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-navy">Hoan tien dang cho duyet</h2>
          <p className="text-xs text-muted-text">3 yeu cau · Tong 2,398,000 VND</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {pendingRefunds.map((refund) => (
            <div key={refund.id} className="rounded-[10px] border border-border-light bg-page-bg/50 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-mono text-sm font-medium text-navy">{refund.id}</p>
                  <p className="text-sm text-navy">{refund.customer}</p>
                </div>
                <p className="font-mono text-lg font-bold text-navy">{refund.amount} VND</p>
              </div>
              <p className="text-xs text-muted-text mb-3">
                Yeu cau {refund.requestDate} · Ly do: "{refund.reason}"
              </p>
              <div className="flex gap-2">
                <button className="flex-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-fg-light hover:bg-navy-light">
                  Duyet hoan tien
                </button>
                <button className="rounded-lg border border-red px-3 py-1.5 text-xs font-medium text-red hover:bg-red/5">
                  Tu choi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-text">Hien thi 1-12 / 314 giao dich</p>
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
