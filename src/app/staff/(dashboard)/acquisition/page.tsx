import { Download, ChevronDown, Users, TrendingUp, UserPlus, Star, Sparkles, ArrowRight } from "lucide-react"

const channelData = [
  { name: "Referral tu GV", count: 61, percentage: 43, fill: "bg-navy", isTop: true },
  { name: "Organic search", count: 47, percentage: 33, fill: "bg-teal" },
  { name: "Facebook Ads", count: 23, percentage: 16, fill: "bg-blue" },
  { name: "Direct/khac", count: 12, percentage: 8, fill: "bg-border-light" },
]

const conversionData = [
  { month: "T10/25", value: 28 },
  { month: "T11/25", value: 29 },
  { month: "T12/25", value: 31 },
  { month: "T1/26", value: 30 },
  { month: "T2/26", value: 32 },
  { month: "T3/26", value: 34 },
]

const ambassadorTeachers = [
  {
    id: 1,
    name: "Nguyen Thi Lan",
    initials: "NTL",
    school: "THPT Nguyen Du",
    sessions: 47,
    classes: 3,
    students: 89,
    referrals: 12,
    tag: "Ambassador",
    isAmbassador: true,
  },
  {
    id: 2,
    name: "Pham Quoc Bao",
    initials: "PQB",
    school: "THPT Chu Van An",
    sessions: 38,
    classes: 4,
    students: 112,
    referrals: 23,
    tag: "Ambassador",
    isAmbassador: true,
    topReferral: true,
  },
  {
    id: 3,
    name: "Tran Thi Kim",
    initials: "TTK",
    school: "THPT Le Hong Phong",
    sessions: 31,
    classes: 2,
    students: 54,
    referrals: 8,
    tag: "Theo doi",
    isAmbassador: false,
  },
  {
    id: 4,
    name: "Hoang Minh Son",
    initials: "HMS",
    school: "THPT Tran Phu",
    sessions: 28,
    classes: 3,
    students: 78,
    referrals: 15,
    tag: "Ambassador",
    isAmbassador: true,
  },
  {
    id: 5,
    name: "Le Van Duc",
    initials: "LVD",
    school: "THPT Nguyen Hue",
    sessions: 19,
    classes: 1,
    students: 32,
    referrals: 4,
    tag: null,
    isAmbassador: false,
  },
]

const referralNetworks = [
  {
    teacher: "GV Nguyen Thi Lan",
    newStudents: 12,
    conversionRate: 75,
  },
  {
    teacher: "GV Pham Quoc Bao",
    newStudents: 23,
    conversionRate: 82,
  },
]

export default function AcquisitionPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Acquisition & Tang truong</h1>
          <p className="mt-1 text-sm text-muted-text">Thang 3/2026 · 143 user moi trong 6 ngay dau</p>
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

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal">
            <Users className="h-5 w-5 text-navy" />
          </div>
          <p className="font-mono text-3xl font-bold text-navy">143</p>
          <p className="text-sm text-muted-text">User moi</p>
          <p className="mt-1 text-xs text-success">+8% vs thang 2</p>
        </div>
        <div className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue">
            <TrendingUp className="h-5 w-5 text-fg-light" />
          </div>
          <p className="font-mono text-3xl font-bold text-navy">34%</p>
          <p className="text-sm text-muted-text">Trial → Paid</p>
          <p className="mt-1 text-xs text-success">+2% vs thang 2</p>
        </div>
        <div className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal">
            <UserPlus className="h-5 w-5 text-navy" />
          </div>
          <p className="font-mono text-3xl font-bold text-navy">61</p>
          <p className="text-sm text-muted-text">Tu referral GV</p>
          <p className="mt-1 text-xs text-teal">Kenh tot nhat thang nay</p>
        </div>
        <div className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FEF3C7]">
            <Star className="h-5 w-5 text-warning" />
          </div>
          <p className="font-mono text-3xl font-bold text-navy">3</p>
          <p className="text-sm text-muted-text">Ambassador tiem nang</p>
          <p className="mt-1 text-xs text-muted-text">Usage cao + referral network</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-[11fr_9fr] gap-6">
        {/* Left - Channel Analysis */}
        <div className="rounded-[10px] border border-border-light bg-card-bg p-5 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-navy">User moi theo kenh</h2>
            <p className="text-xs text-muted-text">Thang 3/2026 · 143 tong</p>
          </div>

          {/* Horizontal Bar Chart */}
          <div className="space-y-4">
            {channelData.map((channel, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className={`${channel.isTop ? 'font-medium text-navy' : 'text-muted-text'}`}>
                    {channel.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium text-navy">{channel.count}</span>
                    <span className="font-mono text-xs text-muted-text">({channel.percentage}%)</span>
                  </div>
                </div>
                <div className="h-3 w-full rounded-full bg-border-light overflow-hidden">
                  <div
                    className={`h-full rounded-full ${channel.fill}`}
                    style={{ width: `${channel.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Insight Card */}
          <div className="mt-5 rounded-lg border border-teal bg-[#EBF7F8] p-3">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 flex-shrink-0 text-blue mt-0.5" />
              <p className="text-xs text-navy">
                <span className="font-medium">Referral tu Giao vien</span> la kenh hieu qua nhat — chi phi gan nhu bang 0 va ti le retention cao hon 40% so voi paid ads.
              </p>
            </div>
          </div>
        </div>

        {/* Right - Conversion Trend */}
        <div className="rounded-[10px] border border-border-light bg-card-bg p-5 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <h2 className="text-lg font-semibold text-navy mb-4">Ti le chuyen doi Trial → Paid</h2>

          {/* Line Chart Visualization */}
          <div className="relative h-40 mb-4">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-text font-mono">
              <span>40%</span>
              <span>30%</span>
              <span>20%</span>
              <span>10%</span>
              <span>0%</span>
            </div>
            
            {/* Chart Area */}
            <div className="ml-8 h-full flex items-end justify-between gap-2 border-b border-l border-border-light pl-2 pb-1">
              {conversionData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="relative w-full flex justify-center">
                    {/* Point */}
                    <div
                      className="absolute w-3 h-3 rounded-full bg-navy border-2 border-fg-light"
                      style={{ bottom: `${(d.value / 40) * 130}px` }}
                    />
                    {/* Value Label */}
                    <span
                      className={`absolute font-mono text-xs ${i === conversionData.length - 1 ? 'text-success font-bold' : 'text-muted-text'}`}
                      style={{ bottom: `${(d.value / 40) * 130 + 16}px` }}
                    >
                      {d.value}%
                    </span>
                    {/* Vertical line to point */}
                    <div
                      className="w-0.5 bg-teal/30"
                      style={{ height: `${(d.value / 40) * 130}px` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="ml-8 flex justify-between text-xs text-muted-text font-mono">
            {conversionData.map((d, i) => (
              <span key={i} className="flex-1 text-center">{d.month}</span>
            ))}
          </div>

          <p className="mt-4 text-xs text-muted-text italic">
            Xu huong tang deu qua 6 thang. Muc tieu Q2: 38%
          </p>
        </div>
      </div>

      {/* Ambassador & Referral Network */}
      <div className="rounded-[10px] border border-border-light bg-card-bg p-5 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-navy">Giao vien tiem nang Ambassador</h2>
          <p className="text-xs text-muted-text">Dua tren usage cao + referral network tu nhien</p>
        </div>

        {/* Ambassador Table */}
        <div className="rounded-lg border border-border-light overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1.2fr_1fr_1.2fr_1fr] gap-4 bg-navy px-4 py-3">
            <span className="font-mono text-xs font-medium uppercase text-fg-light">Giao vien</span>
            <span className="font-mono text-xs font-medium uppercase text-fg-light">Truong</span>
            <span className="font-mono text-xs font-medium uppercase text-fg-light">Phien/tuan</span>
            <span className="font-mono text-xs font-medium uppercase text-fg-light">Hoc sinh</span>
            <span className="font-mono text-xs font-medium uppercase text-fg-light">Referrals</span>
            <span className="font-mono text-xs font-medium uppercase text-fg-light">Tag</span>
            <span className="font-mono text-xs font-medium uppercase text-fg-light">Hanh dong</span>
          </div>

          {/* Table Rows */}
          {ambassadorTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className={`grid grid-cols-[2fr_1.5fr_1fr_1.2fr_1fr_1.2fr_1fr] gap-4 items-center px-4 py-3 border-b border-border-light hover:bg-hover-row ${
                teacher.isAmbassador ? 'border-l-4 border-l-teal' : ''
              }`}
            >
              {/* Teacher */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-navy text-xs font-semibold">
                  {teacher.initials}
                </div>
                <span className="text-sm font-medium text-navy">{teacher.name}</span>
              </div>

              {/* School */}
              <span className="text-sm text-muted-text">{teacher.school}</span>

              {/* Sessions */}
              <span className="font-mono text-sm text-navy">{teacher.sessions} phien</span>

              {/* Students */}
              <span className="text-sm text-muted-text">{teacher.classes} lop · {teacher.students} HS</span>

              {/* Referrals */}
              <span className={`font-mono text-sm ${teacher.topReferral ? 'font-bold text-success' : 'text-success'}`}>
                {teacher.referrals} HS moi
              </span>

              {/* Tag */}
              <div>
                {teacher.tag === 'Ambassador' && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-teal bg-[#EBF7F8] px-2.5 py-0.5 text-xs font-medium text-blue">
                    Ambassador <Star className="h-3 w-3" />
                  </span>
                )}
                {teacher.tag === 'Theo doi' && (
                  <span className="rounded-full bg-hover-row px-2.5 py-0.5 text-xs text-muted-text">
                    {teacher.tag}
                  </span>
                )}
                {!teacher.tag && <span className="text-xs text-muted-text">—</span>}
              </div>

              {/* Action */}
              <button className="rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-fg-light hover:bg-navy-light">
                Lien he
              </button>
            </div>
          ))}
        </div>

        {/* Referral Network Detection */}
        <div className="mt-5 rounded-[10px] border border-teal bg-[#EBF7F8] p-4">
          <h3 className="text-base font-semibold text-navy mb-3">Referral Networks phat hien</h3>
          <div className="grid grid-cols-2 gap-4">
            {referralNetworks.map((network, index) => (
              <div key={index} className="rounded-lg border border-border-light bg-card-bg p-4">
                <p className="text-sm font-medium text-navy mb-2">
                  {network.teacher} → {network.newStudents} HS moi trong 30 ngay
                </p>
                {/* Mini Flow Diagram */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-fg-light text-xs">
                    GV
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-text" />
                  <div className="flex items-center gap-0.5">
                    {Array(Math.min(network.newStudents, 6)).fill(0).map((_, i) => (
                      <div key={i} className="h-6 w-6 rounded-full bg-teal flex items-center justify-center text-[10px] text-navy font-medium">
                        HS
                      </div>
                    ))}
                    {network.newStudents > 6 && (
                      <span className="text-xs text-muted-text ml-1">+{network.newStudents - 6}</span>
                    )}
                  </div>
                </div>
                <p className="font-mono text-xs text-success mb-3">Ti le convert: {network.conversionRate}%</p>
                <button className="rounded-lg border border-blue px-3 py-1.5 text-xs font-medium text-blue hover:bg-blue/5">
                  Xay dung quan he →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
