import { Bell, Download, Users, Building2, DollarSign, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react"

const alertChips = [
  {
    type: "critical",
    icon: "red",
    title: "2 giao dich that bai",
    sub: "Chua xu ly · Xem ngay",
    bgColor: "bg-[#FFF5F5]",
    borderColor: "border-red",
    textColor: "text-red",
  },
  {
    type: "warning",
    icon: "yellow",
    title: "1 truong giam engagement 40%",
    sub: "Nguy co khong gia han · Xem",
    bgColor: "bg-[#FFFBEB]",
    borderColor: "border-warning",
    textColor: "text-warning",
  },
  {
    type: "warning",
    icon: "yellow",
    title: "3 giao vien het han trong 3 ngay",
    sub: "Can follow-up · Xem",
    bgColor: "bg-[#FFFBEB]",
    borderColor: "border-warning",
    textColor: "text-warning",
  },
  {
    type: "info",
    icon: "orange",
    title: "Bai cho Moderator: 31 gio",
    sub: "Gan nguong 48h · Xem",
    bgColor: "bg-[#EBF7F8]",
    borderColor: "border-teal",
    textColor: "text-blue",
  },
]

const statsCards = [
  {
    icon: Users,
    iconBg: "bg-teal",
    iconColor: "text-navy",
    value: "1,240",
    label: "tong tai khoan",
    sub: "1,087 active · 89 trial · 64 het han",
    link: "Quan ly users",
    subColor: "text-muted-text",
  },
  {
    icon: Building2,
    iconBg: "bg-blue",
    iconColor: "text-fg-light",
    value: "8",
    label: "truong hop tac",
    sub: "2 hop dong het han trong 30 ngay",
    link: "Xem truong",
    subColor: "text-red",
  },
  {
    icon: DollarSign,
    iconBg: "bg-navy",
    iconColor: "text-fg-light",
    value: "48.5M",
    label: "MRR thang nay (VND)",
    sub: "+12% so voi thang truoc",
    link: "Chi tiet doanh thu",
    subColor: "text-success",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-teal",
    iconColor: "text-navy",
    value: "143",
    label: "user moi thang 3",
    sub: "Trial → Paid: 34%",
    link: "Xem tang truong",
    subColor: "text-navy",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-warning",
    value: "12",
    label: "bai cho duyet",
    sub: "Cho lau nhat: 31 gio",
    link: "Xem hang doi",
    subColor: "text-warning",
  },
]

const actionItems = [
  {
    priority: "urgent",
    dotColor: "bg-red",
    title: "Giao dich #TXN-2891 that bai — Le Thu Huong",
    sub: "That bai luc 23:14 · 05/03 · Visa ending 4242",
    buttonText: "Xu ly ngay",
    buttonStyle: "bg-red text-fg-light",
  },
  {
    priority: "urgent",
    dotColor: "bg-red",
    title: "Giao dich #TXN-2887 that bai — Tran Van Binh",
    sub: "That bai luc 18:32 · 05/03 · Mastercard ending 5678",
    buttonText: "Xu ly ngay",
    buttonStyle: "bg-red text-fg-light",
  },
  {
    priority: "warning",
    dotColor: "bg-warning",
    title: "GV Pham Minh Duc — subscription het han 09/03",
    sub: "Su dung cao trong 30 ngay qua — nen follow-up",
    buttonText: "Lien he",
    buttonStyle: "border border-blue text-blue",
  },
  {
    priority: "warning",
    dotColor: "bg-warning",
    title: "Truong THPT Le Quy Don — engagement giam 40%",
    sub: "HD het han 15/04 · Can check-in som",
    buttonText: "Xem account",
    buttonStyle: "border border-blue text-blue",
  },
  {
    priority: "info",
    dotColor: "bg-teal",
    title: "Bai 'Giao tuyen mat phang nang cao' cho 31h",
    sub: "Chua co Moderator nhan — bao Admin neu can",
    buttonText: "Xem hang doi",
    buttonStyle: "border border-blue text-blue",
  },
]

const snapshotStats = [
  { label: "User moi", value: "143", color: "text-navy" },
  { label: "Gia han thanh cong", value: "28", color: "text-success" },
  { label: "Huy subscription", value: "5", color: "text-red" },
  { label: "Giao dich thanh cong", value: "312", color: "text-success" },
  { label: "Giao dich that bai", value: "2", color: "text-red" },
  { label: "Bai duoc duyet", value: "47", color: "text-navy" },
  { label: "Trial convert", value: "34%", color: "text-navy" },
]

const mrrData = [
  { month: "T10", value: 38, height: 52 },
  { month: "T11", value: 40, height: 55 },
  { month: "T12", value: 42, height: 58 },
  { month: "T1", value: 43, height: 60 },
  { month: "T2", value: 45, height: 62 },
  { month: "T3", value: 48.5, height: 68 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Dashboard Van hanh</h1>
          <p className="mt-1 text-sm text-muted-text">
            Thu Sau, 06/03/2026 · Tong quan suc khoe nen tang
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative rounded-lg bg-card-bg p-2.5 border border-border-light hover:bg-hover-row transition-colors">
            <Bell className="h-5 w-5 text-navy" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red text-xs font-medium text-fg-light">
              4
            </span>
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-blue px-4 py-2 text-sm font-medium text-blue hover:bg-blue/5 transition-colors">
            <Download className="h-4 w-4" />
            Xuat bao cao
          </button>
        </div>
      </div>

      {/* Alert Banner Row */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {alertChips.map((chip, index) => (
          <button
            key={index}
            className={`flex-shrink-0 rounded-[10px] border-l-4 ${chip.bgColor} ${chip.borderColor} px-4 py-3 text-left transition-opacity hover:opacity-80`}
          >
            <p className={`text-sm font-medium ${chip.textColor}`}>{chip.title}</p>
            <p className={`mt-0.5 text-xs ${chip.textColor} opacity-80`}>
              {chip.sub} <ArrowRight className="inline h-3 w-3" />
            </p>
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-4">
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
            <p className={`mt-1 text-xs ${card.subColor}`}>{card.sub}</p>
            <a href="#" className="mt-2 inline-flex items-center gap-1 text-xs text-blue hover:underline">
              {card.link} <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>

      {/* Bottom Section - 2 Columns */}
      <div className="grid grid-cols-[3fr_2fr] gap-6">
        {/* Left - Actions Today */}
        <div className="rounded-[10px] border border-border-light bg-card-bg p-5 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-navy">Can xu ly hom nay</h2>
            <p className="text-xs text-muted-text">Cac tac vu uu tien cao</p>
          </div>
          <div className="space-y-3">
            {actionItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg border border-border-light bg-page-bg/50 p-4"
              >
                <div className={`h-2 w-2 flex-shrink-0 rounded-full ${item.dotColor}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy truncate">{item.title}</p>
                  <p className="text-xs text-muted-text">{item.sub}</p>
                </div>
                <button
                  className={`flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium ${item.buttonStyle} transition-colors hover:opacity-90`}
                >
                  {item.buttonText} <ArrowRight className="ml-1 inline h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Snapshot */}
        <div className="rounded-[10px] border border-border-light bg-card-bg p-5 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <h2 className="mb-4 text-lg font-semibold text-navy">Snapshot tuan nay</h2>
          
          {/* Stats List */}
          <div className="space-y-0">
            {snapshotStats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-hover-row py-2.5"
              >
                <span className="text-sm text-muted-text">{stat.label}</span>
                <span className={`font-mono font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Mini MRR Chart */}
          <div className="mt-5">
            <p className="mb-3 font-mono text-xs text-muted-text">MRR 6 thang gan nhat</p>
            <div className="flex items-end justify-between gap-2 h-20">
              {mrrData.map((bar, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-1">
                  <span className="font-mono text-[10px] text-muted-text">{bar.value}M</span>
                  <div
                    className={`w-full rounded-t ${index === mrrData.length - 1 ? 'bg-navy' : 'bg-teal'}`}
                    style={{ height: `${bar.height}px` }}
                  />
                  <span className="font-mono text-[10px] text-muted-text">{bar.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
