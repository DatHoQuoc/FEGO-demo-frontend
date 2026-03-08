import { RefreshCw, AlertTriangle, FileText, Clock, CheckCircle, Users, Info } from "lucide-react"

const queueItems = [
  {
    id: 1,
    title: "Hinh chop S.ABCD nang cao",
    submittedAt: "04/03 14:32",
    waitingHours: 31,
    status: "pending",
    statusLabel: "Chua nhan",
    statusBg: "bg-[#FEE2E2]",
    statusColor: "text-[#991B1B]",
    moderator: null,
    highlight: "bg-[#FFFBEB]",
    isWarning: true,
  },
  {
    id: 2,
    title: "Giao tuyen 3 mat phang",
    submittedAt: "05/03 08:15",
    waitingHours: 13,
    status: "processing",
    statusLabel: "Dang xu ly",
    statusBg: "bg-[#EBF7F8]",
    statusColor: "text-blue",
    moderator: "Tran Van Hai",
    highlight: false,
  },
  {
    id: 3,
    title: "Hinh lang tru nghieng",
    submittedAt: "05/03 11:20",
    waitingHours: 10,
    status: "pending",
    statusLabel: "Chua nhan",
    statusBg: "bg-[#FEF3C7]",
    statusColor: "text-[#92400E]",
    moderator: null,
    highlight: false,
  },
  {
    id: 4,
    title: "Goc nhi dien",
    submittedAt: "05/03 14:45",
    waitingHours: 7,
    status: "processing",
    statusLabel: "Dang xu ly",
    statusBg: "bg-[#EBF7F8]",
    statusColor: "text-blue",
    moderator: "Le Thi Phuong",
    highlight: false,
  },
  {
    id: 5,
    title: "Khoang cach hai duong thang",
    submittedAt: "05/03 16:30",
    waitingHours: 5,
    status: "returned",
    statusLabel: "Tra ve lan 2",
    statusBg: "bg-red",
    statusColor: "text-fg-light",
    moderator: "Chua co ai nhan",
    highlight: "bg-[#FFF5F5]",
    isError: true,
  },
  {
    id: 6,
    title: "Hinh cau ngoai tiep",
    submittedAt: "05/03 19:10",
    waitingHours: 3,
    status: "pending",
    statusLabel: "Chua nhan",
    statusBg: "bg-hover-row",
    statusColor: "text-muted-text",
    moderator: null,
    highlight: false,
  },
  {
    id: 7,
    title: "Dien tich mat cau",
    submittedAt: "06/03 08:22",
    waitingHours: 13,
    status: "processing",
    statusLabel: "Dang xu ly",
    statusBg: "bg-[#EBF7F8]",
    statusColor: "text-blue",
    moderator: "Nguyen Minh Quang",
    highlight: false,
  },
  {
    id: 8,
    title: "The tich khoi da dien",
    submittedAt: "06/03 12:15",
    waitingHours: 9,
    status: "pending",
    statusLabel: "Chua nhan",
    statusBg: "bg-hover-row",
    statusColor: "text-muted-text",
    moderator: null,
    highlight: false,
  },
]

const weeklyVolume = [
  { day: "T2", count: 8 },
  { day: "T3", count: 11 },
  { day: "T4", count: 9 },
  { day: "T5", count: 14 },
  { day: "T6", count: 12 },
]

const moderators = [
  {
    id: 1,
    name: "Tran Van Hai",
    initials: "TVH",
    processing: 2,
    avgTime: 2.1,
    weeklyCount: 18,
    workloadPercent: 50,
    badge: null,
    note: null,
  },
  {
    id: 2,
    name: "Le Thi Phuong",
    initials: "LTP",
    processing: 1,
    avgTime: 1.8,
    weeklyCount: 22,
    workloadPercent: 25,
    badge: { text: "Nhanh nhat tuan", bg: "bg-[#D1FAE5]", color: "text-[#065F46]" },
    note: null,
    isFastest: true,
  },
  {
    id: 3,
    name: "Nguyen Minh Quang",
    initials: "NMQ",
    processing: 1,
    avgTime: 3.4,
    weeklyCount: 11,
    workloadPercent: 25,
    badge: null,
    note: { text: "TB xu ly cao hon team", color: "text-warning" },
    isSlow: true,
  },
  {
    id: 4,
    name: "Pham Thi Lan",
    initials: "PTL",
    processing: 0,
    avgTime: 2.2,
    weeklyCount: 15,
    workloadPercent: 0,
    badge: { text: "San sang", bg: "bg-[#EBF7F8]", color: "text-blue" },
    note: null,
    isAvailable: true,
  },
]

export default function OperationsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Van hanh Noi dung</h1>
          <p className="mt-1 text-sm text-muted-text">Giam sat hang doi Moderator · Cap nhat luc 21:47</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg bg-card-bg p-2.5 border border-border-light hover:bg-hover-row transition-colors">
            <RefreshCw className="h-5 w-5 text-navy" />
          </button>
          <button className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-fg-light hover:bg-navy-light transition-colors">
            Bao cao Admin
          </button>
        </div>
      </div>

      {/* Warning Alert Banner */}
      <div className="flex items-center gap-4 rounded-[10px] border-l-4 border-warning bg-[#FFFBEB] px-4 py-3.5">
        <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning" />
        <div className="flex-1">
          <p className="text-sm font-medium text-navy">
            Canh bao nhe: 1 bai da cho 31 gio — nguong canh bao la 48 gio
          </p>
          <p className="text-xs text-muted-text">
            Chua can hanh dong ngay nhung nen theo doi. Neu dat 48h, he thong se tu dong bao.
          </p>
        </div>
        <button className="rounded-lg border border-warning px-3 py-1.5 text-sm font-medium text-warning hover:bg-warning/10">
          Bao cao Admin ngay
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal">
            <FileText className="h-5 w-5 text-navy" />
          </div>
          <p className="font-mono text-3xl font-bold text-navy">12</p>
          <p className="text-sm text-muted-text">Tong hang doi</p>
          <p className="mt-1 text-xs text-muted-text">5 cho nhan · 4 dang xu ly · 3 tra ve</p>
        </div>

        <div className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FEF3C7]">
            <Clock className="h-5 w-5 text-warning" />
          </div>
          <p className="font-mono text-3xl font-bold text-warning">31h</p>
          <p className="text-sm text-muted-text">Cho lau nhat</p>
          <p className="mt-1 font-mono text-xs text-muted-text">Nguong canh bao: 48h</p>
          {/* Progress bar */}
          <div className="mt-2 h-2 w-full rounded-full bg-border-light overflow-hidden">
            <div className="h-full w-[65%] rounded-full bg-warning" />
          </div>
        </div>

        <div className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue">
            <Clock className="h-5 w-5 text-fg-light" />
          </div>
          <p className="font-mono text-3xl font-bold text-navy">2.4h</p>
          <p className="text-sm text-muted-text">TB xu ly/bai</p>
          <p className="mt-1 text-xs text-muted-text">Trung binh tuan nay</p>
        </div>

        <div className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#D1FAE5]">
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <p className="font-mono text-3xl font-bold text-navy">47</p>
          <p className="text-sm text-muted-text">Bai da duyet tuan nay</p>
          <p className="mt-1 text-xs text-success">4 Moderator active</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-[3fr_2fr] gap-6">
        {/* Left - Queue Details */}
        <div className="rounded-[10px] border border-border-light bg-card-bg p-5 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-navy">Hang doi hien tai</h2>
            <p className="text-xs text-muted-text">12 bai · Sap xep theo thoi gian cho</p>
          </div>

          {/* Queue Table */}
          <div className="rounded-lg border border-border-light overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[2fr_1fr_0.8fr_1.2fr_1.5fr] gap-4 bg-navy px-4 py-3">
              <span className="font-mono text-xs font-medium uppercase text-fg-light">Ten bai</span>
              <span className="font-mono text-xs font-medium uppercase text-fg-light">Gui luc</span>
              <span className="font-mono text-xs font-medium uppercase text-fg-light">Cho</span>
              <span className="font-mono text-xs font-medium uppercase text-fg-light">Trang thai</span>
              <span className="font-mono text-xs font-medium uppercase text-fg-light">Moderator</span>
            </div>

            {/* Table Rows */}
            {queueItems.map((item) => (
              <div
                key={item.id}
                className={`grid grid-cols-[2fr_1fr_0.8fr_1.2fr_1.5fr] gap-4 items-center px-4 py-3 border-b border-border-light ${item.highlight || ''}`}
              >
                <span className="text-sm text-navy truncate">{item.title}</span>
                <span className="font-mono text-xs text-muted-text">{item.submittedAt}</span>
                <span className={`font-mono text-sm font-bold ${item.isWarning ? 'text-warning' : item.isError ? 'text-red' : 'text-navy'}`}>
                  {item.waitingHours} gio
                </span>
                <span className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-medium ${item.statusBg} ${item.statusColor}`}>
                  {item.statusLabel}
                </span>
                <div className="flex items-center gap-1">
                  <span className={`text-xs ${item.isError ? 'text-red' : 'text-muted-text'}`}>
                    {item.moderator || '—'}
                  </span>
                  {item.isWarning && <AlertTriangle className="h-3 w-3 text-warning" />}
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Volume Chart */}
          <div className="mt-5">
            <p className="text-xs text-muted-text mb-3">Khoi luong hang doi trong tuan</p>
            <div className="flex items-end justify-between gap-3 h-20">
              {weeklyVolume.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="font-mono text-xs text-muted-text">{d.count}</span>
                  <div
                    className={`w-full rounded-t ${
                      d.count === 14 ? 'bg-red' : i === weeklyVolume.length - 1 ? 'bg-navy' : 'bg-teal'
                    }`}
                    style={{ height: `${(d.count / 14) * 50}px` }}
                  />
                  <span className="font-mono text-xs text-muted-text">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Moderator Workload */}
        <div className="rounded-[10px] border border-border-light bg-card-bg p-5 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-navy">Tai cong viec Moderator</h2>
            <p className="text-xs text-muted-text italic">Tuan nay · Khong phai danh gia ca nhan</p>
          </div>

          {/* Moderator List */}
          <div className="space-y-4">
            {moderators.map((mod) => (
              <div key={mod.id} className="border-b border-border-light pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal text-navy text-xs font-semibold">
                    {mod.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-navy">{mod.name}</span>
                      {mod.badge && (
                        <span className={`rounded-full px-2 py-0.5 text-xs ${mod.badge.bg} ${mod.badge.color}`}>
                          {mod.badge.text}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-text">{mod.processing} bai dang xu ly</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-text mb-2">
                  <span className={mod.isFastest ? 'text-success' : mod.isSlow ? 'text-warning' : ''}>
                    TB: {mod.avgTime}h/bai
                  </span>
                  <span>·</span>
                  <span>{mod.weeklyCount} bai tuan nay</span>
                </div>

                {mod.note && (
                  <p className={`text-xs italic ${mod.note.color}`}>{mod.note.text}</p>
                )}

                {/* Workload Bar */}
                <div className="mt-2 h-2 w-full rounded-full bg-border-light overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      mod.isSlow ? 'bg-warning' : 'bg-blue'
                    }`}
                    style={{ width: `${mod.workloadPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Note Card */}
          <div className="mt-5 rounded-lg bg-hover-row p-3">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 flex-shrink-0 text-muted-text mt-0.5" />
              <p className="text-xs text-muted-text">
                Staff khong co quyen phan cong hoac can thiep truc tiep vao hang doi. De phan cong them Moderator, bao cao Admin.
              </p>
            </div>
            <button className="mt-3 w-full rounded-lg bg-navy px-4 py-2 text-sm font-medium text-fg-light hover:bg-navy-light">
              Bao cao Admin →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
