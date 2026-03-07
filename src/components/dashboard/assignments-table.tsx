import Link from "next/link"
import { ArrowRight } from "lucide-react"

const assignments = [
  {
    name: "Hình chóp S.ABCD — Tính thể tích",
    deadline: "08/03",
    progress: { current: 18, total: 25 },
    status: "Đang làm",
    statusColor: "bg-blue text-light",
  },
  {
    name: "Góc giữa đường thẳng và mp",
    deadline: "10/03",
    progress: { current: 5, total: 25 },
    status: "Mới giao",
    statusColor: "bg-teal text-navy",
  },
  {
    name: "Giao tuyến hai mặt phẳng",
    deadline: "06/03",
    progress: { current: 25, total: 25 },
    status: "Đã nộp đủ",
    statusColor: "bg-success text-light",
  },
]

export function AssignmentsTable() {
  return (
    <div className="rounded-[10px] border border-border-color bg-card-bg shadow-sm">
      <div className="flex items-center justify-between border-b border-border-color px-5 py-4">
        <h2 className="font-semibold text-navy">Bài đang giao</h2>
        <Link
          href="/danh-sach-bai"
          className="flex items-center gap-1 text-sm text-blue hover:underline"
        >
          Xem tất cả
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-color bg-page-bg text-left text-xs uppercase text-muted-text">
              <th className="px-5 py-3 font-mono font-medium">Tên bài</th>
              <th className="px-5 py-3 font-mono font-medium">Hạn nộp</th>
              <th className="px-5 py-3 font-mono font-medium">Tiến độ</th>
              <th className="px-5 py-3 font-mono font-medium">Trạng thái</th>
              <th className="px-5 py-3 font-mono font-medium">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr
                key={index}
                className="border-b border-border-color last:border-0 hover:bg-hover-row"
              >
                <td className="px-5 py-4 text-sm font-medium text-navy">
                  {assignment.name}
                </td>
                <td className="px-5 py-4 font-mono text-sm text-muted-text">
                  {assignment.deadline}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 overflow-hidden rounded-full bg-border-color">
                      <div
                        className="h-full rounded-full bg-teal"
                        style={{
                          width: `${(assignment.progress.current / assignment.progress.total) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="font-mono text-xs text-muted-text">
                      {assignment.progress.current}/{assignment.progress.total}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${assignment.statusColor}`}
                  >
                    {assignment.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <Link
                    href="/bao-cao"
                    className="text-sm text-blue hover:underline"
                  >
                    Xem báo cáo
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
