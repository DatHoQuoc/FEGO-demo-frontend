const activities = [
  {
    name: "Trần Minh Khoa",
    action: "đã nộp bài",
    time: "5 phút trước",
    initials: "TK",
    initialsColor: "bg-teal text-navy",
  },
  {
    name: "Lê Thu Hương",
    action: "cần hỗ trợ tại bước 3",
    time: "12 phút trước",
    initials: "LH",
    initialsColor: "bg-red text-light",
    isAlert: true,
  },
  {
    name: "Nguyễn Bảo An",
    action: "hoàn thành với 5/5 bước đúng",
    time: "1 giờ trước",
    initials: "NA",
    initialsColor: "bg-success text-light",
  },
  {
    name: "Phạm Việt Đức",
    action: "bắt đầu làm bài",
    time: "2 giờ trước",
    initials: "PD",
    initialsColor: "bg-blue text-light",
  },
]

export function RecentActivity() {
  return (
    <div className="rounded-[10px] border border-border-color bg-card-bg shadow-sm">
      <div className="border-b border-border-color px-5 py-4">
        <h2 className="font-semibold text-navy">Hoạt động gần đây</h2>
      </div>
      <div className="divide-y divide-border-color">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-5 py-4 hover:bg-hover-row"
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-medium ${activity.initialsColor}`}
            >
              {activity.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">
                <span className="font-medium text-navy">{activity.name}</span>{" "}
                <span className={activity.isAlert ? "text-red" : "text-muted-text"}>
                  {activity.action}
                </span>
              </p>
              <p className="font-mono text-xs text-muted-text">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
