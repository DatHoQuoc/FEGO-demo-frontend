import {
  ChevronDown,
  Download,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const reasoningSteps = [
  { step: 1, name: "Xác định đáy và chiều cao", errorRate: 11, severity: "low" },
  { step: 2, name: "Tính diện tích đáy ABCD", errorRate: 22, severity: "low" },
  {
    step: 3,
    name: "Tìm chiều cao hình chóp SA",
    errorRate: 61,
    severity: "high",
    isBottleneck: true,
  },
  {
    step: 4,
    name: "Áp dụng công thức V = 1/3 × S × h",
    errorRate: 28,
    severity: "medium",
  },
  { step: 5, name: "Tính toán và kết luận", errorRate: 17, severity: "low" },
]

const scoreDistribution = [
  { score: 1, count: 0 },
  { score: 2, count: 0 },
  { score: 3, count: 1 },
  { score: 4, count: 2 },
  { score: 5, count: 3 },
  { score: 6, count: 4 },
  { score: 7, count: 5 },
  { score: 8, count: 6 },
  { score: 9, count: 2 },
  { score: 10, count: 2 },
]

const maxCount = Math.max(...scoreDistribution.map((d) => d.count))

const studentCategories = [
  {
    title: "Hiểu sâu",
    count: 8,
    bg: "bg-insight-bg",
    indicator: "text-success",
    students: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D"],
  },
  {
    title: "Làm đúng, chưa hiểu sâu",
    count: 6,
    bg: "bg-blue/10",
    indicator: "text-blue",
    students: ["Hoàng Văn E", "Đỗ Thị F", "Vũ Văn G", "Ngô Thị H"],
  },
  {
    title: "Cần hỗ trợ thêm",
    count: 4,
    bg: "bg-error-bg",
    indicator: "text-red",
    students: ["Trần Minh Khoa", "Lê Thu Hương", "Nguyễn Bảo K", "Phạm Việt L"],
    showAction: true,
  },
]

export default function BaoCaoLopPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">
            Báo cáo lớp 11A1
          </h1>
          <p className="mt-1 text-sm text-muted-text">
            Bài: Hình chóp S.ABCD — Tính thể tích · Hạn 08/03/2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-border-color bg-card-bg px-4 py-2 text-sm text-navy hover:bg-hover-row">
            Hình chóp S.ABCD
            <ChevronDown className="h-4 w-4" />
          </button>
          <Button
            variant="outline"
            className="border-blue text-blue hover:bg-blue hover:text-light"
          >
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Card 1 - Submission Rate */}
        <div className="rounded-[10px] border border-border-color bg-card-bg p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-4xl font-bold text-navy">18/25</p>
              <p className="mt-1 text-sm text-muted-text">học sinh đã nộp</p>
            </div>
            <div className="relative h-20 w-20">
              <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#B8DDE0"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#A8DADC"
                  strokeWidth="3"
                  strokeDasharray={`${72} ${100 - 72}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-medium text-navy">
                72%
              </span>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-text">
            7 học sinh chưa nộp · Hạn còn 2 ngày
          </p>
        </div>

        {/* Card 2 - Comprehension Rate */}
        <div className="rounded-[10px] border border-border-color bg-card-bg p-5 shadow-sm">
          <p className="font-mono text-4xl font-bold text-navy">62%</p>
          <p className="mt-1 text-sm text-muted-text">hiểu đúng bản chất</p>
          <p className="mt-1 text-sm text-muted-text">
            vs. 38% làm theo quy trình, chưa hiểu sâu
          </p>
          <div className="mt-4 flex h-2 overflow-hidden rounded-full">
            <div className="w-[62%] bg-teal" />
            <div className="w-[38%] bg-border-color" />
          </div>
          <p className="mt-2 text-sm text-success">+5% so với bài trước</p>
        </div>

        {/* Card 3 - Average Score */}
        <div className="rounded-[10px] border border-border-color bg-card-bg p-5 shadow-sm">
          <p className="font-mono text-4xl font-bold text-navy">7.4 / 10</p>
          <p className="mt-1 text-sm text-muted-text">điểm trung bình lớp</p>
          <div className="mt-4 flex items-end gap-1">
            <div className="h-4 w-4 rounded-sm bg-teal/50" />
            <div className="h-5 w-4 rounded-sm bg-teal/60" />
            <div className="h-6 w-4 rounded-sm bg-teal/70" />
            <div className="h-8 w-4 rounded-sm bg-teal" />
          </div>
          <p className="mt-3 text-sm text-success">
            Bài trước: 6.9 · Cải thiện +0.5
          </p>
        </div>
      </div>

      {/* Main Content - 2 Columns */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left - Reasoning Bottlenecks */}
        <div className="col-span-3">
          <div className="rounded-[10px] border border-border-color bg-card-bg shadow-sm">
            <div className="border-b border-border-color px-5 py-4">
              <h2 className="font-semibold text-navy">
                Điểm nghẽn tư duy — Các bước học sinh hay sai
              </h2>
              <p className="mt-1 text-sm text-muted-text">
                Phân tích từ 18 bài nộp
              </p>
            </div>
            <div className="divide-y divide-border-color p-5">
              {reasoningSteps.map((step) => (
                <div key={step.step} className="flex items-center gap-4 py-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-medium text-light">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-navy">
                        {step.name}
                      </span>
                      {step.isBottleneck && (
                        <span className="rounded-full bg-red px-2 py-0.5 text-xs font-medium text-light">
                          Điểm nghẽn chính
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-border-color">
                        <div
                          className={`h-full rounded-full ${
                            step.severity === "high"
                              ? "bg-red"
                              : step.severity === "medium"
                                ? "bg-blue"
                                : "bg-teal"
                          }`}
                          style={{ width: `${step.errorRate}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-muted-text">
                        {step.errorRate}% lỗi
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Insight Box */}
              <div className="mt-4 rounded-lg border-l-4 border-l-teal bg-insight-bg p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="mt-0.5 h-5 w-5 text-blue" />
                  <div>
                    <p className="text-sm font-medium text-navy">
                      Gợi ý can thiệp:
                    </p>
                    <p className="mt-1 text-sm text-muted-text">
                      Bước 3 cần được giảng lại trong tiết tới. Lỗi phổ biến:
                      học sinh không xác định được vị trí chân đường cao SA
                      trong không gian 3D.
                    </p>
                    <button className="mt-2 flex items-center gap-1 text-sm text-blue hover:underline">
                      Xem chi tiết lỗi
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Score Distribution */}
        <div className="col-span-2">
          <div className="rounded-[10px] border border-border-color bg-card-bg shadow-sm">
            <div className="border-b border-border-color px-5 py-4">
              <h2 className="font-semibold text-navy">Phân phối điểm số</h2>
            </div>
            <div className="p-5">
              <div className="flex items-end justify-between gap-1">
                {scoreDistribution.map((item) => (
                  <div key={item.score} className="flex flex-col items-center">
                    <span className="mb-1 font-mono text-xs text-muted-text">
                      {item.count > 0 ? item.count : ""}
                    </span>
                    <div
                      className={`w-7 rounded-t ${
                        item.score >= 7 && item.score <= 8
                          ? "bg-navy"
                          : "bg-teal"
                      }`}
                      style={{
                        height: `${item.count > 0 ? (item.count / maxCount) * 100 : 4}px`,
                        minHeight: "4px",
                      }}
                    />
                    <span className="mt-2 font-mono text-xs text-muted-text">
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-muted-text">
                Điểm cao nhất: <span className="font-mono">10</span> · Thấp
                nhất: <span className="font-mono">3</span> · Trung vị:{" "}
                <span className="font-mono">7.5</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - Student Classification */}
      <div className="rounded-[10px] border border-border-color bg-card-bg shadow-sm">
        <div className="border-b border-border-color px-5 py-4">
          <h2 className="font-semibold text-navy">
            Phân loại học sinh theo mức độ hiểu
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4 p-5">
          {studentCategories.map((category) => (
            <div
              key={category.title}
              className={`rounded-lg ${category.bg} p-4`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-navy">{category.title}</h3>
                <span className="rounded-full bg-card-bg px-2 py-0.5 font-mono text-xs text-navy">
                  {category.count} học sinh
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {category.students.map((student) => (
                  <li key={student} className="flex items-center gap-2 text-sm">
                    {category.indicator === "text-success" && (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                    {category.indicator === "text-blue" && (
                      <AlertCircle className="h-4 w-4 text-blue" />
                    )}
                    {category.indicator === "text-red" && (
                      <XCircle className="h-4 w-4 text-red" />
                    )}
                    <span className="text-navy">{student}</span>
                  </li>
                ))}
              </ul>
              {category.showAction && (
                <button className="mt-3 flex items-center gap-1 text-sm text-blue hover:underline">
                  Nhắc nhở học sinh này
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
