"use client"

import { useState } from "react"
import { Search, MessageSquare, ArrowRight, AlertTriangle, ChevronDown, ChevronUp, Sparkles, FileText, MessageCircle, ScanSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Student = {
  id: string
  name: string
  initials: string
  status: "excellent" | "good" | "needsHelp"
}

const students: Student[] = [
  { id: "1", name: "Trần Minh Khoa", initials: "TK", status: "needsHelp" },
  { id: "2", name: "Nguyễn Văn An", initials: "NA", status: "excellent" },
  { id: "3", name: "Lê Thu Hương", initials: "LH", status: "needsHelp" },
  { id: "4", name: "Phạm Bảo Long", initials: "PL", status: "good" },
  { id: "5", name: "Hoàng Minh Tuấn", initials: "HT", status: "excellent" },
  { id: "6", name: "Đỗ Thị Mai", initials: "DM", status: "excellent" },
  { id: "7", name: "Vũ Quang Huy", initials: "VH", status: "good" },
  { id: "8", name: "Ngô Thanh Tâm", initials: "NT", status: "needsHelp" },
  { id: "9", name: "Bùi Văn Đức", initials: "BD", status: "excellent" },
  { id: "10", name: "Trịnh Thị Lan", initials: "TL", status: "good" },
]

const statusLabels: Record<Student["status"], { label: string; color: string }> = {
  excellent: { label: "Tốt", color: "bg-success text-light" },
  good: { label: "Trung bình", color: "bg-blue text-light" },
  needsHelp: { label: "Cần hỗ trợ", color: "bg-red text-light" },
}

const errorTypes = [
  {
    name: "Sai tư duy không gian",
    frequency: 8,
    total: 15,
    severity: "high",
    note: "Thường hình dung sai vị trí đường cao trong 3D",
  },
  { name: "Sai công thức áp dụng", frequency: 5, total: 15, severity: "medium" },
  { name: "Sai đọc hình 2D", frequency: 4, total: 15, severity: "medium" },
  { name: "Sai tính toán thuần túy", frequency: 2, total: 15, severity: "low" },
]

type AssignmentDetail = {
  id: string
  name: string
  date: string
  submitTime: string
  duration: string
  score: number
  comprehension: number
  wrongSteps: string
  support: string
  interviewScore: { correct: number; total: number }
  submissionType: "image" | "text"
  submissionContent: string
  steps: {
    name: string
    status: "correct" | "wrong" | "partial"
    error?: string
  }[]
  interview: {
    question: string
    answer: string
    evaluation: string
    status: "correct" | "wrong" | "partial"
    relatedStep?: string
  }[]
  aiSummary: {
    text: string
    tags: { label: string; type: "error" | "success" | "info" }[]
    suggestion: string
  }
}

const assignmentHistory: AssignmentDetail[] = [
  {
    id: "1",
    name: "Hình chóp S.ABCD",
    date: "06/03/2026",
    submitTime: "21:34",
    duration: "38 phút",
    score: 6.5,
    comprehension: 40,
    wrongSteps: "Bước 3",
    support: "Gợi ý từng bước",
    interviewScore: { correct: 3, total: 4 },
    submissionType: "image",
    submissionContent: "/placeholder-submission.jpg",
    steps: [
      { name: "Xác định đáy và chiều cao", status: "correct" },
      { name: "Tính diện tích đáy ABCD = a²", status: "correct" },
      { name: "Tìm chiều cao SA", status: "wrong", error: "Tính SA = AB thay vì dùng SA ⊥ đáy" },
      { name: "Áp dụng V = 1/3 × S × h", status: "partial", error: "Công thức đúng nhưng dùng h sai từ bước 3" },
      { name: "Kết luận", status: "correct" },
    ],
    interview: [
      {
        question: "Tại sao SA lại vuông góc với mặt đáy trong bài này?",
        answer: "Vì đề bài cho SA vuông góc đáy ạ",
        evaluation: "Nắm được điều kiện đề cho, chưa giải thích được ý nghĩa hình học sâu hơn.",
        status: "correct",
      },
      {
        question: "Em tính diện tích đáy ABCD bằng cách nào?",
        answer: "Em dùng công thức cạnh nhân cạnh vì nó là hình vuông",
        evaluation: "Đúng công thức nhưng không giải thích tại sao ABCD là hình vuông.",
        status: "partial",
      },
      {
        question: "Chiều cao của hình chóp SA được tính như thế nào?",
        answer: "Em tính SA bằng cạnh đáy a ạ",
        evaluation: "Nhầm giữa chiều cao và cạnh bên — lỗi tư duy không gian điển hình.",
        status: "wrong",
        relatedStep: "Bước 3",
      },
      {
        question: "Công thức tính thể tích hình chóp là gì?",
        answer: "V = 1/3 nhân diện tích đáy nhân chiều cao ạ",
        evaluation: "Nhớ đúng công thức.",
        status: "correct",
      },
    ],
    aiSummary: {
      text: "Khoa làm đúng quy trình nhưng mắc lỗi không gian tại bước xác định chiều cao. Kết hợp interview, học sinh hiểu đề nhưng chưa hình dung được quan hệ vuông góc trong không gian 3D.",
      tags: [
        { label: "Sai tư duy không gian", type: "error" },
        { label: "Hiểu công thức", type: "success" },
        { label: "Cần luyện hình 3D", type: "info" },
      ],
      suggestion: "Giao thêm bài về quan hệ vuông góc trong hình chóp, yêu cầu vẽ lại hình 3D trước khi giải.",
    },
  },
  {
    id: "2",
    name: "Góc và khoảng cách",
    date: "02/03/2026",
    submitTime: "19:12",
    duration: "42 phút",
    score: 7.0,
    comprehension: 50,
    wrongSteps: "Bước 2,4",
    support: "Xem lời giải",
    interviewScore: { correct: 2, total: 4 },
    submissionType: "text",
    submissionContent: "Bước 1: Xác định hai mặt phẳng (P) và (Q)\nBước 2: Tìm giao tuyến d = (P) ∩ (Q)\nBước 3: Lấy điểm A trên d\nBước 4: Dựng đường thẳng vuông góc với d trong mỗi mặt phẳng\nBước 5: Tính góc giữa hai đường thẳng đó",
    steps: [
      { name: "Xác định hai mặt phẳng", status: "correct" },
      { name: "Tìm giao tuyến", status: "wrong", error: "Xác định sai giao tuyến, nhầm với đường song song" },
      { name: "Lấy điểm trên giao tuyến", status: "correct" },
      { name: "Dựng đường vuông góc", status: "wrong", error: "Dựng sai hướng đường vuông góc" },
      { name: "Tính góc", status: "correct" },
    ],
    interview: [
      {
        question: "Giao tuyến của hai mặt phẳng là gì?",
        answer: "Là đường thẳng chung của hai mặt phẳng ạ",
        evaluation: "Hiểu đúng khái niệm.",
        status: "correct",
      },
      {
        question: "Làm sao để tìm giao tuyến trong bài này?",
        answer: "Em tìm hai điểm chung rồi nối lại ạ",
        evaluation: "Phương pháp đúng nhưng thực hiện sai trong bài làm.",
        status: "partial",
      },
      {
        question: "Tại sao cần dựng đường vuông góc với giao tuyến?",
        answer: "Em không biết ạ",
        evaluation: "Chưa hiểu bản chất định nghĩa góc giữa hai mặt phẳng.",
        status: "wrong",
        relatedStep: "Bước 4",
      },
      {
        question: "Góc giữa hai mặt phẳng nằm trong khoảng nào?",
        answer: "Từ 0 đến 90 độ ạ",
        evaluation: "Đúng.",
        status: "correct",
      },
    ],
    aiSummary: {
      text: "Học sinh nắm được quy trình tổng quát nhưng thiếu hiểu biết sâu về bản chất hình học của góc giữa hai mặt phẳng.",
      tags: [
        { label: "Thiếu hiểu bản chất", type: "error" },
        { label: "Nhớ quy trình", type: "success" },
        { label: "Cần ôn lý thuyết", type: "info" },
      ],
      suggestion: "Cho xem video minh họa 3D về góc giữa hai mặt phẳng trước khi làm bài tương tự.",
    },
  },
  {
    id: "3",
    name: "Hình lăng trụ",
    date: "26/02/2026",
    submitTime: "20:45",
    duration: "35 phút",
    score: 5.5,
    comprehension: 35,
    wrongSteps: "Bước 3,5",
    support: "Gợi ý từng bước",
    interviewScore: { correct: 1, total: 4 },
    submissionType: "image",
    submissionContent: "/placeholder-submission-2.jpg",
    steps: [
      { name: "Nhận dạng hình lăng trụ", status: "correct" },
      { name: "Xác định đáy và cạnh bên", status: "correct" },
      { name: "Tính diện tích đáy", status: "wrong", error: "Dùng công thức sai cho tam giác" },
      { name: "Tính chiều cao lăng trụ", status: "correct" },
      { name: "Áp dụng công thức thể tích", status: "wrong", error: "Nhầm công thức lăng trụ với hình chóp" },
    ],
    interview: [
      {
        question: "Hình lăng trụ khác hình chóp như thế nào?",
        answer: "Lăng trụ có hai đáy, chóp có một đáy ạ",
        evaluation: "Đúng nhưng chưa đủ chi tiết.",
        status: "partial",
      },
      {
        question: "Công thức thể tích lăng trụ là gì?",
        answer: "V = 1/3 × S × h ạ",
        evaluation: "Sai - đây là công thức hình chóp.",
        status: "wrong",
        relatedStep: "Bước 5",
      },
      {
        question: "Diện tích tam giác tính như thế nào?",
        answer: "Cạnh nhân cạnh ạ",
        evaluation: "Sai hoàn toàn - nhầm với hình vuông.",
        status: "wrong",
        relatedStep: "Bước 3",
      },
      {
        question: "Chiều cao của lăng trụ là gì?",
        answer: "Là khoảng cách giữa hai đáy ạ",
        evaluation: "Đúng.",
        status: "correct",
      },
    ],
    aiSummary: {
      text: "Học sinh nhầm lẫn nghiêm trọng giữa các công thức cơ bản. Cần ôn lại kiến thức nền tảng.",
      tags: [
        { label: "Nhầm công thức", type: "error" },
        { label: "Kiến thức nền yếu", type: "error" },
        { label: "Cần ôn cơ bản", type: "info" },
      ],
      suggestion: "Giao bài ôn tập công thức diện tích và thể tích các hình cơ bản trước khi tiếp tục.",
    },
  },
  {
    id: "4",
    name: "Giao tuyến hai mặt phẳng",
    date: "20/02/2026",
    submitTime: "18:20",
    duration: "28 phút",
    score: 6.0,
    comprehension: 45,
    wrongSteps: "Bước 2",
    support: "Tự làm",
    interviewScore: { correct: 3, total: 4 },
    submissionType: "text",
    submissionContent: "Bước 1: Xác định mp (ABC) và mp (SBD)\nBước 2: Tìm điểm chung thứ nhất: B\nBước 3: Tìm điểm chung thứ hai: giao của AC và SD = M\nBước 4: Giao tuyến là BM",
    steps: [
      { name: "Xác định hai mặt phẳng", status: "correct" },
      { name: "Tìm điểm chung thứ nhất", status: "wrong", error: "Đúng điểm nhưng không giải thích tại sao B thuộc cả hai mp" },
      { name: "Tìm điểm chung thứ hai", status: "correct" },
      { name: "Xác định giao tuyến", status: "correct" },
    ],
    interview: [
      {
        question: "Tại sao B là điểm chung của hai mặt phẳng?",
        answer: "Vì B nằm trên cả ABC và SBD ạ",
        evaluation: "Đúng nhưng cần giải thích rõ hơn.",
        status: "correct",
      },
      {
        question: "Làm sao tìm điểm M?",
        answer: "Tìm giao của AC và SD trong không gian ạ",
        evaluation: "Hiểu phương pháp.",
        status: "correct",
      },
      {
        question: "Nếu hai đường thẳng không cắt nhau thì sao?",
        answer: "Thì chúng song song hoặc chéo nhau ạ",
        evaluation: "Đúng.",
        status: "correct",
      },
      {
        question: "Giao tuyến có thể là đường cong không?",
        answer: "Có thể ạ",
        evaluation: "Sai - giao tuyến của hai mặt phẳng luôn là đường thẳng.",
        status: "wrong",
      },
    ],
    aiSummary: {
      text: "Bài làm tương đối tốt, chỉ thiếu giải thích. Học sinh cần rèn luyện kỹ năng trình bày.",
      tags: [
        { label: "Làm đúng", type: "success" },
        { label: "Thiếu giải thích", type: "info" },
        { label: "Cần rèn trình bày", type: "info" },
      ],
      suggestion: "Yêu cầu viết lời giải chi tiết hơn trong các bài sau.",
    },
  },
  {
    id: "5",
    name: "Khoảng cách điểm đến mp",
    date: "14/02/2026",
    submitTime: "17:55",
    duration: "32 phút",
    score: 7.5,
    comprehension: 55,
    wrongSteps: "Bước 4",
    support: "Xem lời giải",
    interviewScore: { correct: 3, total: 4 },
    submissionType: "image",
    submissionContent: "/placeholder-submission-3.jpg",
    steps: [
      { name: "Xác định điểm và mặt phẳng", status: "correct" },
      { name: "Dựng đường vuông góc từ điểm đến mp", status: "correct" },
      { name: "Xác định chân đường vuông góc", status: "correct" },
      { name: "Tính độ dài đường vuông góc", status: "wrong", error: "Sai phép tính căn bậc hai" },
      { name: "Kết luận", status: "correct" },
    ],
    interview: [
      {
        question: "Khoảng cách từ điểm đến mặt phẳng là gì?",
        answer: "Là độ dài đường vuông góc từ điểm đó đến mặt phẳng ạ",
        evaluation: "Đúng.",
        status: "correct",
      },
      {
        question: "Làm sao dựng đường vuông góc?",
        answer: "Từ điểm kẻ đường thẳng vuông góc với mp ạ",
        evaluation: "Đúng về nguyên tắc.",
        status: "correct",
      },
      {
        question: "Chân đường vuông góc luôn nằm trong mp?",
        answer: "Dạ đúng ạ",
        evaluation: "Chính xác.",
        status: "correct",
      },
      {
        question: "√50 bằng bao nhiêu?",
        answer: "Bằng 25 ạ",
        evaluation: "Sai - √50 = 5√2 ≈ 7.07",
        status: "wrong",
        relatedStep: "Bước 4",
      },
    ],
    aiSummary: {
      text: "Hiểu bài tốt, chỉ sai tính toán căn bậc hai. Đây là lỗi kỹ năng, không phải lỗi tư duy.",
      tags: [
        { label: "Hiểu bài", type: "success" },
        { label: "Sai tính toán", type: "error" },
        { label: "Cần luyện căn", type: "info" },
      ],
      suggestion: "Cho làm thêm bài tập tính toán với căn bậc hai.",
    },
  },
]

// Expanded row tab type
type ExpandedTab = "bailam" | "interview" | "phantich"

export default function BaoCaoCaNhanPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0])
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<ExpandedTab>("bailam")

  const handleRowClick = (id: string) => {
    if (expandedRowId === id) {
      setExpandedRowId(null)
    } else {
      setExpandedRowId(id)
      setActiveTab("bailam")
    }
  }

  const getInterviewBadgeColor = (correct: number, total: number) => {
    const percentage = (correct / total) * 100
    if (percentage >= 75) return "text-success"
    if (percentage >= 50) return "text-[#F59E0B]"
    return "text-red"
  }

  const getStatusDotColor = (status: "correct" | "wrong" | "partial") => {
    if (status === "correct") return "bg-success"
    if (status === "wrong") return "bg-red"
    return "bg-[#F59E0B]"
  }

  const getStatusBadge = (status: "correct" | "wrong" | "partial") => {
    if (status === "correct") return { label: "Đúng", bg: "bg-[#D1FAE5]", text: "text-[#065F46]" }
    if (status === "wrong") return { label: "Sai", bg: "bg-[#FEE2E2]", text: "text-[#991B1B]" }
    return { label: "Một phần", bg: "bg-[#FEF3C7]", text: "text-[#92400E]" }
  }

  const getInterviewStatusBadge = (status: "correct" | "wrong" | "partial") => {
    if (status === "correct") return { label: "Hiểu đúng", bg: "bg-[#D1FAE5]", text: "text-[#065F46]" }
    if (status === "wrong") return { label: "Chưa hiểu", bg: "bg-[#FEE2E2]", text: "text-[#991B1B]" }
    return { label: "Hiểu một phần", bg: "bg-[#FEF3C7]", text: "text-[#92400E]" }
  }

  const getEvalBorderStyle = (status: "correct" | "wrong" | "partial") => {
    if (status === "correct") return "border-l-[3px] border-l-success bg-[#F0FDF4]"
    if (status === "wrong") return "border-l-[3px] border-l-red bg-[#FFF5F5]"
    return "border-l-[3px] border-l-[#F59E0B] bg-[#FFFBEB]"
  }

  return (
    <div className="flex gap-6">
      {/* Left Panel - Student List */}
      <div className="w-72 shrink-0">
        <div className="rounded-[10px] border border-border-color bg-card-bg shadow-sm">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
              <input
                type="text"
                placeholder="Tìm học sinh..."
                className="w-full rounded-lg border border-border-color bg-card-bg py-2 pl-10 pr-4 text-sm outline-none focus:border-blue focus:ring-1 focus:ring-blue"
              />
            </div>
          </div>

          <div className="max-h-[500px] divide-y divide-border-color overflow-y-auto">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                  selectedStudent.id === student.id
                    ? "border-l-[3px] border-l-teal bg-navy text-light"
                    : "border-l-[3px] border-l-transparent hover:bg-hover-row"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                    selectedStudent.id === student.id
                      ? "bg-teal text-navy"
                      : "bg-teal text-navy"
                  }`}
                >
                  {student.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm font-medium ${
                      selectedStudent.id === student.id
                        ? "text-light"
                        : "text-navy"
                    }`}
                  >
                    {student.name}
                  </p>
                  <span
                    className={`text-xs ${statusLabels[student.status].color} rounded-full px-1.5 py-0.5`}
                  >
                    {statusLabels[student.status].label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-border-color p-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-page-bg px-2 py-1 text-navy">
                35 học sinh
              </span>
              <span className="rounded-full bg-error-bg px-2 py-1 text-red">
                4 cần hỗ trợ
              </span>
              <span className="rounded-full bg-insight-bg px-2 py-1 text-success">
                8 xuất sắc
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Student Detail */}
      <div className="flex-1 space-y-6">
        {/* Student Header Card */}
        <div className="rounded-[10px] border border-border-color bg-card-bg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-xl font-semibold text-light">
                {selectedStudent.initials}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-navy">
                  {selectedStudent.name}
                </h2>
                <p className="mt-1 text-sm text-muted-text">
                  Lớp 11A1 · 15 bài đã làm · Thành viên từ 01/09/2025
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="rounded-full bg-red px-2.5 py-0.5 text-xs font-medium text-light">
                    Phụ thuộc gợi ý cao
                  </span>
                  <span className="rounded-full bg-red px-2.5 py-0.5 text-xs font-medium text-light">
                    Sai tư duy không gian
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-blue text-blue hover:bg-blue hover:text-light"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Nhắn tin học sinh
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-[10px] border border-border-color bg-card-bg p-4 shadow-sm">
            <p className="text-xs uppercase text-muted-text">Điểm TB</p>
            <p className="mt-1 font-mono text-2xl font-bold text-navy">
              6.8 / 10
            </p>
          </div>
          <div className="rounded-[10px] border border-border-color bg-card-bg p-4 shadow-sm">
            <p className="text-xs uppercase text-muted-text">
              Tỉ lệ hiểu thực
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-red">44%</p>
            <p className="text-xs text-muted-text">Dưới TB lớp (62%)</p>
          </div>
          <div className="rounded-[10px] border border-border-color bg-card-bg p-4 shadow-sm">
            <p className="text-xs uppercase text-muted-text">
              Mức dùng gợi ý
            </p>
            <span className="mt-1 inline-block rounded-full bg-red px-2 py-0.5 text-sm font-medium text-light">
              Cao
            </span>
          </div>
          <div className="rounded-[10px] border border-border-color bg-card-bg p-4 shadow-sm">
            <p className="text-xs uppercase text-muted-text">Cải thiện</p>
            <p className="mt-1 font-mono text-2xl font-bold text-success">
              +0.8
            </p>
            <p className="text-xs text-muted-text">vs tháng trước</p>
          </div>
        </div>

        {/* Main Content - 2 Columns */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left - Trend Over Time */}
          <div className="rounded-[10px] border border-border-color bg-card-bg shadow-sm">
            <div className="border-b border-border-color px-5 py-4">
              <h3 className="font-semibold text-navy">
                Kết quả 5 bài gần nhất
              </h3>
            </div>
            <div className="p-5">
              {/* Simple Line Chart Illustration */}
              <div className="relative h-40">
                <svg
                  viewBox="0 0 200 100"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                >
                  {/* Grid lines */}
                  <line
                    x1="0"
                    y1="25"
                    x2="200"
                    y2="25"
                    stroke="#B8DDE0"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="0"
                    y1="50"
                    x2="200"
                    y2="50"
                    stroke="#B8DDE0"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="0"
                    y1="75"
                    x2="200"
                    y2="75"
                    stroke="#B8DDE0"
                    strokeWidth="0.5"
                  />

                  {/* Score line (solid) */}
                  <polyline
                    points="10,45 50,50 90,55 130,40 170,35"
                    fill="none"
                    stroke="#1D3557"
                    strokeWidth="2"
                  />
                  {/* Comprehension line (dashed) */}
                  <polyline
                    points="10,55 50,50 90,65 130,55 170,60"
                    fill="none"
                    stroke="#A8DADC"
                    strokeWidth="2"
                    strokeDasharray="4"
                  />

                  {/* Data points - Score */}
                  <circle cx="10" cy="45" r="4" fill="#1D3557" />
                  <circle cx="50" cy="50" r="4" fill="#1D3557" />
                  <circle cx="90" cy="55" r="4" fill="#1D3557" />
                  <circle cx="130" cy="40" r="4" fill="#1D3557" />
                  <circle cx="170" cy="35" r="4" fill="#1D3557" />

                  {/* Data points - Comprehension */}
                  <circle cx="10" cy="55" r="4" fill="#A8DADC" />
                  <circle cx="50" cy="50" r="4" fill="#A8DADC" />
                  <circle cx="90" cy="65" r="4" fill="#A8DADC" />
                  <circle cx="130" cy="55" r="4" fill="#A8DADC" />
                  <circle cx="170" cy="60" r="4" fill="#A8DADC" />
                </svg>
              </div>
              <div className="mt-4 flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-4 bg-navy" />
                  <span className="text-xs text-muted-text">Điểm số</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-4 border-t-2 border-dashed border-teal" />
                  <span className="text-xs text-muted-text">
                    Mức hiểu thực
                  </span>
                </div>
              </div>

              {/* Insight Box */}
              <div className="mt-4 rounded-lg border-l-4 border-l-teal bg-insight-bg p-3">
                <p className="text-sm text-muted-text">
                  Điểm số cải thiện nhưng tỉ lệ hiểu thực còn thấp — học sinh
                  có thể đang học thuộc quy trình mà chưa hiểu bản chất.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Error Profile */}
          <div className="rounded-[10px] border border-border-color bg-card-bg shadow-sm">
            <div className="border-b border-border-color px-5 py-4">
              <h3 className="font-semibold text-navy">Lỗi tư duy đặc trưng</h3>
            </div>
            <div className="divide-y divide-border-color p-5">
              {errorTypes.map((error, index) => (
                <div key={index} className="py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-navy">
                      {error.name}
                    </span>
                    <span className="font-mono text-xs text-muted-text">
                      {error.frequency}/{error.total} bài
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-border-color">
                    <div
                      className={`h-full rounded-full ${
                        error.severity === "high"
                          ? "bg-red"
                          : error.severity === "medium"
                            ? "bg-blue"
                            : "bg-teal"
                      }`}
                      style={{
                        width: `${(error.frequency / error.total) * 100}%`,
                      }}
                    />
                  </div>
                  {error.note && (
                    <p className="mt-1 text-xs text-muted-text">{error.note}</p>
                  )}
                </div>
              ))}

              {/* AI Insight */}
              <div className="mt-4 rounded-lg border-l-4 border-l-red bg-error-bg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-red" />
                  <div>
                    <p className="text-sm font-medium text-navy">
                      Nhận xét AI:
                    </p>
                    <p className="mt-1 text-sm text-muted-text">
                      Khoa thường xuyên chọn &apos;Gợi ý từng bước&apos; và ít khi tự
                      giải. Đây là dấu hiệu phụ thuộc gợi ý. Gợi ý: thử giao
                      bài yêu cầu tự giải không có hint.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom - Assignment History with Expandable Rows */}
        <div className="rounded-[10px] border border-border-color bg-card-bg shadow-sm">
          <div className="border-b border-border-color px-5 py-4">
            <h3 className="font-semibold text-navy">Chi tiết các bài đã làm</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-color bg-page-bg text-left">
                  <th className="w-8 px-3 py-3"></th>
                  <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-muted-text">
                    Tên bài
                  </th>
                  <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-muted-text">
                    Ngày nộp
                  </th>
                  <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-muted-text">
                    Điểm
                  </th>
                  <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-muted-text">
                    Mức hiểu
                  </th>
                  <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-muted-text">
                    Bước sai
                  </th>
                  <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-muted-text">
                    Mức hỗ trợ
                  </th>
                  <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-muted-text">
                    Interview
                  </th>
                  <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-muted-text">
                    Chi tiết
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignmentHistory.map((assignment) => (
                  <>
                    <tr
                      key={assignment.id}
                      onClick={() => handleRowClick(assignment.id)}
                      className={`cursor-pointer border-b border-border-color transition-colors hover:bg-hover-row ${
                        expandedRowId === assignment.id ? "bg-hover-row" : ""
                      }`}
                    >
                      <td className="px-3 py-4">
                        {expandedRowId === assignment.id ? (
                          <ChevronUp className="h-4 w-4 text-muted-text" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-text" />
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-navy">
                        {assignment.name}
                      </td>
                      <td className="px-5 py-4 font-mono text-sm text-muted-text">
                        {assignment.date.substring(0, 5)}
                      </td>
                      <td className="px-5 py-4 font-mono text-sm text-navy">
                        {assignment.score}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`font-mono text-sm ${
                            assignment.comprehension < 50
                              ? "text-red"
                              : "text-navy"
                          }`}
                        >
                          {assignment.comprehension}%
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono text-sm text-muted-text">
                        {assignment.wrongSteps}
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-text">
                        {assignment.support}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`font-mono text-xs ${getInterviewBadgeColor(assignment.interviewScore.correct, assignment.interviewScore.total)}`}>
                          {assignment.interviewScore.correct}/{assignment.interviewScore.total} ✓
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1 text-sm text-blue">
                          Chi tiết
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </td>
                    </tr>

                    {/* Expanded Row Panel */}
                    <tr>
                      <td colSpan={9} className="p-0">
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedRowId === assignment.id
                              ? "max-h-[2000px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="border-t-2 border-t-teal border-b border-b-border-color bg-card-bg px-8 py-6">
                            {/* Panel Header */}
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-semibold text-navy">{assignment.name}</span>
                                <span className="ml-2 font-mono text-xs text-muted-text">
                                  — Tính thể tích · Nộp lúc {assignment.submitTime} · {assignment.date} · Thời gian làm: {assignment.duration}
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setExpandedRowId(null)
                                }}
                                className="text-xs text-muted-text hover:text-navy"
                              >
                                Thu gọn <ChevronUp className="inline h-3 w-3" />
                              </button>
                            </div>

                            {/* Tab Bar */}
                            <div className="mt-4 inline-flex rounded-[10px] bg-page-bg p-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveTab("bailam")
                                }}
                                className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm transition-colors ${
                                  activeTab === "bailam"
                                    ? "bg-navy text-light"
                                    : "text-muted-text hover:text-navy"
                                }`}
                              >
                                <FileText className="h-4 w-4" />
                                Bài làm
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveTab("interview")
                                }}
                                className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm transition-colors ${
                                  activeTab === "interview"
                                    ? "bg-navy text-light"
                                    : "text-muted-text hover:text-navy"
                                }`}
                              >
                                <MessageCircle className="h-4 w-4" />
                                Interview
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveTab("phantich")
                                }}
                                className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm transition-colors ${
                                  activeTab === "phantich"
                                    ? "bg-navy text-light"
                                    : "text-muted-text hover:text-navy"
                                }`}
                              >
                                <ScanSearch className="h-4 w-4" />
                                Phân tích AI
                              </button>
                            </div>

                            {/* Tab Content */}
                            <div className="mt-6">
                              {/* TAB 1 - Bài làm */}
                              {activeTab === "bailam" && (
                                <div className="grid grid-cols-[45%_55%] gap-6">
                                  {/* Left Column - Bài làm gốc */}
                                  <div className="rounded-[10px] border border-border-color bg-white p-4">
                                    <p className="font-mono text-xs uppercase text-muted-text">
                                      BÀI LÀM CỦA HỌC SINH
                                    </p>
                                    {assignment.submissionType === "image" ? (
                                      <div className="mt-3">
                                        <div className="flex h-60 items-center justify-center rounded-lg border border-border-color bg-page-bg">
                                          <div className="text-center">
                                            <FileText className="mx-auto h-12 w-12 text-muted-text" />
                                            <p className="mt-2 text-sm text-muted-text">Ảnh bài làm gốc</p>
                                          </div>
                                        </div>
                                        <div className="mt-3 flex items-center gap-4">
                                          <button className="text-sm text-blue hover:underline">
                                            Xem đầy đủ ↗
                                          </button>
                                          <Button variant="outline" size="sm" className="h-7 text-xs">
                                            Tải về
                                          </Button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="mt-3 max-h-60 overflow-y-auto rounded-lg border border-border-color bg-card-bg p-3">
                                        <pre className="whitespace-pre-wrap font-mono text-sm text-navy">
                                          {assignment.submissionContent}
                                        </pre>
                                      </div>
                                    )}
                                  </div>

                                  {/* Right Column - Phân tích từng bước */}
                                  <div className="rounded-[10px] border border-border-color bg-white p-4">
                                    <p className="font-mono text-xs uppercase text-muted-text">
                                      PHÂN TÍCH TỪNG BƯỚC
                                    </p>
                                    <p className="mt-0.5 text-xs text-muted-text">
                                      AI đối chiếu với đáp án chuẩn
                                    </p>

                                    <div className="mt-4 divide-y divide-page-bg">
                                      {assignment.steps.map((step, index) => {
                                        const badge = getStatusBadge(step.status)
                                        return (
                                          <div key={index} className="py-2.5">
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-3">
                                                <div className={`h-3 w-3 rounded-full ${getStatusDotColor(step.status)}`} />
                                                <span className="font-mono text-xs text-muted-text">
                                                  Bước {index + 1}
                                                </span>
                                                <span className="text-sm text-navy">{step.name}</span>
                                              </div>
                                              <span className={`rounded-full px-2 py-0.5 text-xs ${badge.bg} ${badge.text}`}>
                                                {badge.label}
                                              </span>
                                            </div>
                                            {step.error && (
                                              <p className="mt-1.5 pl-10 text-xs italic text-red">
                                                Lỗi: {step.error}
                                              </p>
                                            )}
                                          </div>
                                        )
                                      })}
                                    </div>

                                    {/* Summary strip */}
                                    <div className="mt-4 rounded-lg bg-page-bg px-3 py-2">
                                      <p className="font-mono text-xs text-muted-text">
                                        {assignment.steps.filter(s => s.status === "correct").length}/{assignment.steps.length} bước đúng · Lỗi từ {assignment.wrongSteps} · Loại lỗi: Sai tư duy không gian
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* TAB 2 - Interview */}
                              {activeTab === "interview" && (
                                <div>
                                  {/* Summary Strip */}
                                  <div className="mb-4 flex items-center justify-between rounded-lg border border-teal bg-insight-bg px-4 py-3">
                                    <span className="text-sm text-muted-text">
                                      {assignment.interview.length} câu hỏi · {assignment.interview.filter(q => q.status === "correct").length} câu đúng · Thời gian TB: 45 giây/câu
                                    </span>
                                    <span className="rounded-md bg-teal px-2.5 py-1 font-mono text-sm font-semibold text-navy">
                                      Hiểu: {Math.round((assignment.interview.filter(q => q.status === "correct").length / assignment.interview.length) * 100)}%
                                    </span>
                                  </div>

                                  {/* Q&A Grid */}
                                  <div className="grid grid-cols-2 gap-4">
                                    {assignment.interview.map((qa, index) => {
                                      const badge = getInterviewStatusBadge(qa.status)
                                      return (
                                        <div key={index} className="rounded-[10px] border border-border-color bg-white p-4">
                                          {/* Top row */}
                                          <div className="flex items-center justify-between">
                                            <span className="rounded-full bg-navy px-2.5 py-0.5 font-mono text-xs text-light">
                                              Câu {index + 1}
                                            </span>
                                            <span className={`rounded-full px-2 py-0.5 text-xs ${badge.bg} ${badge.text}`}>
                                              {badge.label}
                                            </span>
                                          </div>

                                          {/* AI Question */}
                                          <div className="mt-3 rounded-md bg-page-bg p-2.5">
                                            <p className="font-mono text-xs text-muted-text">AI HỎI</p>
                                            <p className="mt-1 text-sm italic text-navy">{qa.question}</p>
                                          </div>

                                          {/* Student Answer */}
                                          <div className="mt-2 rounded-md border border-border-color bg-white p-2.5">
                                            <p className="font-mono text-xs text-muted-text">HỌC SINH TRẢ LỜI</p>
                                            <p className="mt-1 text-sm text-navy">{qa.answer}</p>
                                          </div>

                                          {/* AI Evaluation */}
                                          <div className={`mt-2 rounded-md p-2 ${getEvalBorderStyle(qa.status)}`}>
                                            <p className="text-xs italic text-muted-text">{qa.evaluation}</p>
                                            {qa.relatedStep && (
                                              <span className="mt-1.5 inline-block text-xs text-red">
                                                → Liên quan: {qa.relatedStep}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>

                                  {/* Footer Note */}
                                  <div className="mt-4 rounded-lg bg-page-bg px-3.5 py-2.5">
                                    <p className="text-xs italic text-muted-text">
                                      💡 Câu trả lời interview không ảnh hưởng điểm bài tập. Chỉ phục vụ chẩn đoán tư duy.
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* TAB 3 - Phân tích AI */}
                              {activeTab === "phantich" && (
                                <div>
                                  {/* AI Summary Card */}
                                  <div className="rounded-[10px] border border-teal bg-insight-bg p-4">
                                    <div className="flex items-center gap-2">
                                      <Sparkles className="h-4 w-4 text-blue" />
                                      <span className="font-semibold text-navy">Nhận xét tổng hợp</span>
                                    </div>
                                    <p className="mt-3 text-sm text-muted-text">
                                      {assignment.aiSummary.text}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {assignment.aiSummary.tags.map((tag, index) => (
                                        <span
                                          key={index}
                                          className={`rounded-full px-2.5 py-0.5 text-xs ${
                                            tag.type === "error"
                                              ? "bg-light text-red"
                                              : tag.type === "success"
                                                ? "bg-[#D1FAE5] text-[#065F46]"
                                                : "bg-insight-bg text-blue border border-teal"
                                          }`}
                                        >
                                          {tag.label}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Action Card */}
                                  <div className="mt-3 rounded-[10px] border-l-[3px] border-l-navy bg-card-bg p-3.5">
                                    <p className="text-sm text-muted-text">
                                      <span className="font-medium text-navy">Gợi ý:</span> {assignment.aiSummary.suggestion}
                                    </p>
                                    <Button className="mt-3 bg-navy text-light hover:bg-sidebar-hover">
                                      Giao bài liên quan →
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border-color px-5 py-3">
            <Link
              href="#"
              className="flex items-center gap-1 text-sm text-blue hover:underline"
            >
              Xem toàn bộ lịch sử
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
