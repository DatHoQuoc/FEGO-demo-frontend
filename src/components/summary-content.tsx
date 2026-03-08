"use client"

import Link from "next/link"
import { CheckCircle, X, Check, AlertTriangle, Sparkles, ChevronRight } from "lucide-react"

// Mock data
const result = {
  title: "Hình chóp S.ABCD — Tính thể tích",
  className: "11A1",
  teacher: "Nguyễn Thị Lan",
  submittedAt: "06/03/2026 lúc 21:47",
  score: 7.5,
  maxScore: 10,
  comprehension: 68,
  steps: [
    { id: 1, name: "Xác định đáy và chiều cao", correct: true },
    { id: 2, name: "Tính diện tích đáy ABCD = a²", correct: true },
    { id: 3, name: "Tìm chiều cao SA", correct: false, error: "Sai tư duy không gian" },
    { id: 4, name: "Áp dụng V = 1/3 × S × h", correct: true },
    { id: 5, name: "Kết luận", correct: true },
  ],
  interview: {
    overall: "Hiểu khá tốt",
    turns: [
      { id: 1, question: "Giải thích SA ⊥ đáy", result: "correct", label: "Hiểu đúng" },
      { id: 2, question: "SA nghiêng → thể tích thay đổi?", result: "partial", label: "Hiểu một phần" },
      { id: 3, question: "Công thức V = 1/3 × S × h", result: "correct", label: "Hiểu đúng" },
    ],
  },
  feedback:
    "Bạn hiểu đúng công thức và quy trình chung, nhưng còn lúng túng khi SA không vuông góc với đáy — phần này liên quan đến tư duy không gian 3D cần luyện thêm.",
  tags: [
    { text: "Sai tư duy không gian", type: "error" },
    { text: "Hiểu công thức tốt", type: "success" },
    { text: "Cần luyện hình 3D", type: "outlined" },
  ],
  recommended: [
    { id: 1, title: "Hình chóp nghiêng — Tính thể tích", difficulty: "Trung bình", difficultyColor: "warning" },
    { id: 2, title: "Quan hệ vuông góc trong không gian", difficulty: "Cơ bản", difficultyColor: "success" },
  ],
}

export function SummaryContent() {
  return (
    <div className="min-h-screen bg-[#F4F8FA]">
      {/* Top Bar */}
      <header className="bg-[#1D3557] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#F1FAEE]">VisualEdu</span>
        </div>
        <span className="font-medium text-[#F1FAEE]">Kết quả bài nộp</span>
        <span className="text-sm text-[#A8DADC]">{result.className} · {result.teacher}</span>
      </header>

      {/* Content */}
      <main className="max-w-[700px] mx-auto py-8 px-4">
        {/* Hero Result Card */}
        <div className="bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-8 text-center mb-6 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="w-14 h-14 bg-[#10B981] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#1D3557] mt-3">Đã nộp thành công!</h1>
          <p className="text-sm text-[#6C7A89] mt-1">
            {result.title} · {result.submittedAt}
          </p>

          {/* Score Row */}
          <div className="flex justify-center items-center gap-8 mt-5">
            <div className="text-center">
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-mono font-bold text-[#1D3557]">{result.score}</span>
                <span className="text-lg text-[#6C7A89] ml-1">/ {result.maxScore} điểm</span>
              </div>
              <p className="text-xs font-mono uppercase text-[#6C7A89] mt-1">Điểm bài làm</p>
            </div>
            <div className="w-px h-15 bg-[#B8DDE0]" />
            <div className="text-center">
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-mono font-bold text-[#457B9D]">{result.comprehension}%</span>
                <span className="text-lg text-[#6C7A89] ml-1">hiểu thực</span>
              </div>
              <p className="text-xs font-mono uppercase text-[#6C7A89] mt-1">Concept Check</p>
            </div>
          </div>
        </div>

        {/* Two Column */}
        <div className="grid grid-cols-[55%_45%] gap-5 mb-6">
          {/* Left - Chi tiết bài làm */}
          <div className="bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
            <h2 className="font-semibold text-[#1D3557] mb-4">Chi tiết bài làm</h2>
            <div className="space-y-0">
              {result.steps.map((step, i) => (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 py-2.5 ${
                    i < result.steps.length - 1 ? "border-b border-[#F0F6F8]" : ""
                  }`}
                >
                  {step.correct ? (
                    <Check className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-[#E63946] mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${step.correct ? "text-[#1D3557]" : "text-[#E63946] font-medium"}`}>
                        Bước {step.id}: {step.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          step.correct
                            ? "bg-[#D1FAE5] text-[#065F46]"
                            : "bg-[#FEE2E2] text-[#991B1B]"
                        }`}
                      >
                        {step.correct ? "Đúng" : "Sai"}
                      </span>
                    </div>
                    {step.error && (
                      <p className="text-xs text-[#E63946] italic pl-4 mt-1">{step.error}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Concept Check */}
          <div className="bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
            <h2 className="font-semibold text-[#1D3557] mb-4">Concept Check</h2>
            <div className="text-center mb-4">
              <span className="inline-block bg-[#EBF7F8] border border-[#A8DADC] text-[#1D3557] font-semibold rounded-lg px-4 py-2">
                {result.interview.overall}
              </span>
            </div>
            <div className="space-y-2">
              {result.interview.turns.map((turn) => (
                <div
                  key={turn.id}
                  className={`rounded-lg p-2.5 flex items-center gap-3 ${
                    turn.result === "correct"
                      ? "bg-[#F0FDF4]"
                      : turn.result === "partial"
                      ? "bg-[#FFFBEB]"
                      : "bg-[#FEF2F2]"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono text-white ${
                      turn.result === "correct"
                        ? "bg-[#10B981]"
                        : turn.result === "partial"
                        ? "bg-[#F59E0B]"
                        : "bg-[#E63946]"
                    }`}
                  >
                    L{turn.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#1D3557]">{turn.question}</p>
                  </div>
                  <span
                    className={`text-xs font-medium flex items-center gap-1 ${
                      turn.result === "correct"
                        ? "text-[#10B981]"
                        : turn.result === "partial"
                        ? "text-[#F59E0B]"
                        : "text-[#E63946]"
                    }`}
                  >
                    {turn.label}
                    {turn.result === "correct" && <Check className="w-3.5 h-3.5" />}
                    {turn.result === "partial" && <AlertTriangle className="w-3.5 h-3.5" />}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Feedback Card */}
        <div className="bg-[#EBF7F8] border border-[#A8DADC] border-l-4 border-l-[#457B9D] rounded-[10px] p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#457B9D]" />
            <span className="font-semibold text-[#1D3557]">Nhận xét từ AI Mentor</span>
          </div>
          <p className="text-sm text-[#1D3557] leading-relaxed">{result.feedback}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {result.tags.map((tag, i) => (
              <span
                key={i}
                className={`text-xs px-3 py-1 rounded-full ${
                  tag.type === "error"
                    ? "bg-[#FEE2E2] text-[#991B1B]"
                    : tag.type === "success"
                    ? "bg-[#D1FAE5] text-[#065F46]"
                    : "border border-[#A8DADC] text-[#457B9D]"
                }`}
              >
                {tag.text}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Practice */}
        <div className="bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-5 mb-6 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <div className="mb-4">
            <h2 className="font-semibold text-[#1D3557]">Bài luyện tập gợi ý</h2>
            <p className="text-xs text-[#6C7A89]">Dựa trên lỗi phát hiện trong phiên này</p>
          </div>
          <div className="flex gap-3">
            {result.recommended.map((item) => (
              <div
                key={item.id}
                className="flex-1 bg-white border border-[#B8DDE0] rounded-lg p-4"
              >
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    item.difficultyColor === "warning"
                      ? "bg-[#FEF3C7] text-[#92400E]"
                      : "bg-[#D1FAE5] text-[#065F46]"
                  }`}
                >
                  {item.difficulty}
                </span>
                <p className="text-sm font-medium text-[#1D3557] mt-2">{item.title}</p>
                <p className="text-xs text-[#6C7A89] mt-1">Tự học · Không hạn nộp</p>
                <button className="mt-3 bg-[#1D3557] text-[#F1FAEE] text-xs px-3 py-1.5 rounded-md hover:bg-[#457B9D] transition-colors flex items-center gap-1">
                  Làm ngay <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="sticky bottom-0 bg-white border-t border-[#B8DDE0] px-8 py-4">
        <div className="max-w-[700px] mx-auto flex items-center justify-between">
          <p className="text-sm italic text-[#6C7A89]">
            Bài tập đã được ghi nhận — GV {result.teacher} sẽ xem kết quả.
          </p>
          <div className="flex gap-3">
            <Link
              href="/student"
              className="border border-[#457B9D] text-[#457B9D] px-4 py-2 rounded-lg text-sm hover:bg-[#EBF7F8] transition-colors flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Về trang bài tập
            </Link>
            <button className="bg-[#1D3557] text-[#F1FAEE] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#457B9D] transition-colors flex items-center gap-1">
              Làm bài luyện tập <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
