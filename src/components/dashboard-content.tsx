"use client"

import Link from "next/link"
import { AlertCircle, Bell, Plus, Clock, ChevronRight } from "lucide-react"

// Mock data
const assignments = {
  pending: [
    {
      id: 1,
      title: "Hình chóp S.ABCD — Tính thể tích",
      className: "11A1",
      teacher: "Nguyễn Thị Lan",
      assignedDate: "04/03",
      dueDate: "08/03/2026",
      daysLeft: 2,
      status: "pending",
    },
    {
      id: 2,
      title: "Góc giữa đường thẳng và mặt phẳng",
      className: "11A1",
      teacher: "Nguyễn Thị Lan",
      assignedDate: "05/03",
      dueDate: "10/03/2026",
      daysLeft: 4,
      status: "pending",
    },
    {
      id: 3,
      title: "Giao tuyến hai mặt phẳng — Cơ bản",
      className: "11 Toán",
      teacher: "Trần Văn Hùng",
      assignedDate: "01/03",
      dueDate: "05/03/2026",
      daysOverdue: 1,
      status: "overdue",
    },
  ],
  completed: [
    {
      id: 4,
      title: "Hình lăng trụ — Diện tích xung quanh",
      className: "11A1",
      teacher: "Nguyễn Thị Lan",
      submittedAt: "21:34",
      submittedDate: "28/02/2026",
      score: 7.5,
      maxScore: 10,
      comprehension: 62,
    },
  ],
}

const classes = [
  {
    id: 1,
    code: "11A1",
    name: "Hình học không gian",
    teacher: "Nguyễn Thị Lan",
    students: 35,
    pendingCount: 2,
    pendingType: "warning",
  },
  {
    id: 2,
    code: "11T",
    name: "Toán nâng cao",
    teacher: "Trần Văn Hùng",
    students: 28,
    pendingCount: 1,
    pendingType: "overdue",
  },
]

export function DashboardContent() {
  const hasOverdue = assignments.pending.some((a) => a.status === "overdue")

  return (
    <div className="max-w-8xl">
      {/* Top Bar */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#1D3557]">Bài tập của tôi</h1>
          <p className="text-sm text-[#6C7A89] mt-1">
            Thứ Sáu, 06/03/2026 · 2 lớp đang tham gia
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/student/lop-hoc"
            className="flex items-center gap-2 bg-[#1D3557] text-[#F1FAEE] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#457B9D] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tham gia lớp mới
          </Link>
          <button className="w-10 h-10 rounded-lg bg-[#F8FBFC] border border-[#B8DDE0] flex items-center justify-center hover:bg-[#F0F6F8] transition-colors">
            <Bell className="w-5 h-5 text-[#6C7A89]" />
          </button>
        </div>
      </div>

      {/* Overdue Alert */}
      {hasOverdue && (
        <div className="bg-[#FFF5F5] border-l-4 border-[#E63946] rounded-[10px] px-4 py-3.5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#E63946]" />
            <span className="text-sm text-[#1D3557]">
              Bạn có 1 bài tập quá hạn chưa nộp
            </span>
          </div>
          <Link
            href="/student/bai-tap/3"
            className="text-sm text-[#E63946] font-medium hover:underline flex items-center gap-1"
          >
            Xem ngay <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Pending Assignments */}
      <section className="mb-8">
        <h2 className="text-xs font-mono uppercase text-[#6C7A89] tracking-wide mb-3">
          Cần làm sớm
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {assignments.pending.slice(0, 2).map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
        {assignments.pending.filter((a) => a.status === "overdue").map((assignment) => (
          <OverdueCard key={assignment.id} assignment={assignment} />
        ))}
      </section>

      {/* Completed Assignments */}
      <section className="mb-8">
        <h2 className="text-xs font-mono uppercase text-[#6C7A89] tracking-wide mb-3">
          Đã hoàn thành
        </h2>
        {assignments.completed.map((assignment) => (
          <CompletedCard key={assignment.id} assignment={assignment} />
        ))}
      </section>

      {/* Classes */}
      <section>
        <h2 className="text-xs font-mono uppercase text-[#6C7A89] tracking-wide mb-3">
          Lớp đang tham gia
        </h2>
        <div className="flex gap-3">
          {classes.map((cls) => (
            <ClassCard key={cls.id} classInfo={cls} />
          ))}
        </div>
      </section>
    </div>
  )
}

function AssignmentCard({ assignment }: { assignment: typeof assignments.pending[0] }) {
  const isUrgent = assignment.daysLeft !== undefined && assignment.daysLeft <= 2;

  return (
    <div className="bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-[#1D3557] text-[#F1FAEE] text-xs font-mono px-2 py-1 rounded-full">
          {assignment.className}
        </span>
        <span
          className={`text-xs font-mono px-2 py-1 rounded-full flex items-center gap-1 ${
            isUrgent
              ? "bg-[#FEF3C7] text-[#92400E]"
              : "bg-[#EBF7F8] text-[#1D3557]"
          }`}
        >
          <Clock className="w-3 h-3" />
          Còn {assignment.daysLeft} ngày
        </span>
      </div>
      <h3 className="font-semibold text-[#1D3557] mb-1">{assignment.title}</h3>
      <p className="text-sm text-[#6C7A89] mb-4">
        GV: {assignment.teacher} · Giao {assignment.assignedDate}
      </p>
      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2.5 py-1 rounded-full ${
            isUrgent
              ? "bg-[#FEF3C7] text-[#92400E]"
              : "bg-[#A8DADC] text-[#1D3557]"
          }`}
        >
          Chưa nộp
        </span>
        <Link
          href={`/student/bai-tap/${assignment.id}`}
          className="bg-[#1D3557] text-[#F1FAEE] text-sm px-4 py-2 rounded-lg font-medium hover:bg-[#457B9D] transition-colors flex items-center gap-1"
        >
          Làm bài <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

function OverdueCard({ assignment }: { assignment: typeof assignments.pending[0] }) {
  return (
    <div className="bg-[#F8FBFC] border border-[#B8DDE0] border-l-[3px] border-l-[#E63946] rounded-[10px] p-4 mt-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#457B9D] text-[#F1FAEE] text-xs font-mono px-2 py-1 rounded-full">
              {assignment.className}
            </span>
            <span className="bg-[#FEE2E2] text-[#991B1B] text-xs font-mono px-2 py-1 rounded-full">
              Quá hạn {assignment.daysOverdue} ngày
            </span>
          </div>
          <h3 className="font-semibold text-[#1D3557] mb-1">{assignment.title}</h3>
          <p className="text-sm text-[#6C7A89]">
            GV: {assignment.teacher} · Hạn: {assignment.dueDate}
          </p>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <span className="bg-[#E63946] text-[#F1FAEE] text-xs px-2.5 py-1 rounded-full">
            Quá hạn
          </span>
          <Link
            href={`/student/bai-tap/${assignment.id}`}
            className="border border-[#E63946] text-[#E63946] text-sm px-4 py-2 rounded-lg font-medium hover:bg-[#FEE2E2] transition-colors flex items-center gap-1"
          >
            Nộp muộn <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function CompletedCard({ assignment }: { assignment: typeof assignments.completed[0] }) {
  return (
    <div className="bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="bg-[#1D3557] text-[#F1FAEE] text-xs font-mono px-2 py-1 rounded-full">
            {assignment.className}
          </span>
          <div>
            <h3 className="font-medium text-[#1D3557]">{assignment.title}</h3>
            <p className="text-xs font-mono text-[#6C7A89]">
              Đã nộp lúc {assignment.submittedAt} · {assignment.submittedDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="font-mono font-bold text-[#1D3557]">
              {assignment.score} / {assignment.maxScore}
            </span>
          </div>
          <span className="bg-[#A8DADC] text-[#1D3557] text-xs px-2.5 py-1 rounded-full">
            Hiểu thực: {assignment.comprehension}%
          </span>
          <Link
            href={`/student/ket-qua/${assignment.id}`}
            className="text-sm text-[#457B9D] font-medium hover:underline flex items-center gap-1"
          >
            Xem kết quả <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function ClassCard({ classInfo }: { classInfo: typeof classes[0] }) {
  return (
    <div className="bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-4 flex-1 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#1D3557] flex items-center justify-center">
          <span className="text-[#F1FAEE] font-semibold text-sm font-mono">
            {classInfo.code.substring(0, 3)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-[#1D3557]">{classInfo.name}</h3>
          <p className="text-sm text-[#6C7A89]">
            GV: {classInfo.teacher} · {classInfo.students} HS
          </p>
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full ${
            classInfo.pendingType === "overdue"
              ? "bg-[#FEE2E2] text-[#991B1B]"
              : "bg-[#FEF3C7] text-[#92400E]"
          }`}
        >
          {classInfo.pendingCount}{" "}
          {classInfo.pendingType === "overdue" ? "quá hạn" : "bài chờ"}
        </span>
      </div>
    </div>
  )
}
