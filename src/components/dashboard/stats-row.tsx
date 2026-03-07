import { ClipboardList, Users, Brain, School } from "lucide-react"

const stats = [
  {
    icon: ClipboardList,
    iconBg: "bg-teal",
    iconColor: "text-navy",
    value: "3",
    label: "bài đang giao",
    subtext: "2 sắp đến hạn",
    subtextColor: "text-red",
  },
  {
    icon: Users,
    iconBg: "bg-blue",
    iconColor: "text-light",
    value: "12",
    label: "học sinh chưa nộp",
    subtext: "Trong tổng số 35 học sinh",
    subtextColor: "text-muted-text",
  },
  {
    icon: Brain,
    iconBg: "bg-teal",
    iconColor: "text-navy",
    value: "68%",
    label: "hiểu đúng bản chất",
    subtext: "+5% so với tuần trước",
    subtextColor: "text-success",
    showBars: true,
  },
  {
    icon: School,
    iconBg: "bg-navy",
    iconColor: "text-light",
    value: "11A1",
    label: "lớp hiện tại",
    subtext: "35 học sinh",
    subtextColor: "text-muted-text",
  },
]

export function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="rounded-[10px] border border-border-color bg-card-bg p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.iconBg}`}
              >
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              {stat.showBars && (
                <div className="flex items-end gap-1">
                  <div className="h-4 w-2 rounded-sm bg-teal" />
                  <div className="h-6 w-2 rounded-sm bg-teal" />
                  <div className="h-8 w-2 rounded-sm bg-teal" />
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="font-mono text-3xl font-bold text-navy">
                {stat.value}
              </p>
              <p className="text-sm text-muted-text">{stat.label}</p>
              <p className={`mt-1 text-sm ${stat.subtextColor}`}>
                {stat.subtext}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
