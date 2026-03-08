"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, XCircle, User, School, Users, Info, X } from "lucide-react"

// Mock data
const validCode = "LAN11A1"
const classInfo = {
  name: "Hình học không gian — Lớp 11A1",
  teacher: "Nguyễn Thị Lan",
  school: "THPT Nguyễn Du, TP.HCM",
  students: 34,
  status: "active",
}

const joinedClasses = [
  { id: 1, code: "11A1", teacher: "Nguyễn Thị Lan" },
  { id: 2, code: "11 Toán", teacher: "Trần Văn Hùng" },
]

export function JoinClassContent() {
  const [code, setCode] = useState("LAN11A1")
  const [status, setStatus] = useState<"idle" | "success" | "error">("success")

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setCode(value)
    if (value === validCode) {
      setStatus("success")
    } else if (value.length >= 6) {
      setStatus("error")
    } else {
      setStatus("idle")
    }
  }

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[#457B9D] hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại bài tập
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1D3557]">Tham gia lớp học</h1>
        <p className="text-sm text-[#6C7A89] mt-1">
          Nhập mã lớp do giáo viên cung cấp để tham gia
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6">
        {/* Left - Main Card */}
        <div className="flex-1 bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-10 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          {/* Code Input */}
          <label className="text-xs font-mono uppercase text-[#6C7A89] tracking-wide mb-2 block">
            Mã lớp
          </label>
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            className="w-full h-16 text-center text-3xl font-mono font-bold tracking-[0.25em] border-2 border-[#A8DADC] rounded-[10px] bg-white text-[#1D3557] uppercase focus:outline-none focus:ring-2 focus:ring-[#A8DADC] focus:ring-offset-2 transition-all"
            placeholder="ABC123"
            maxLength={8}
          />
          <p className="text-xs text-[#6C7A89] text-center mt-2">
            Mã lớp thường gồm 6-8 ký tự, ví dụ: ABC123
          </p>

          {/* Success State */}
          {status === "success" && (
            <div className="mt-5 bg-[#EBF7F8] border border-[#A8DADC] border-l-4 border-l-[#10B981] rounded-[10px] p-5">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#10B981]" />
                <span className="font-semibold text-[#1D3557]">Đã tìm thấy lớp học</span>
              </div>
              <div className="mt-3 pl-9 space-y-2">
                <p className="font-semibold text-[#1D3557]">{classInfo.name}</p>
                <div className="flex items-center gap-2 text-sm text-[#6C7A89]">
                  <User className="w-4 h-4" />
                  GV: {classInfo.teacher}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6C7A89]">
                  <School className="w-4 h-4" />
                  {classInfo.school}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6C7A89]">
                  <Users className="w-4 h-4" />
                  {classInfo.students} học sinh đã tham gia
                </div>
                <span className="inline-block bg-[#D1FAE5] text-[#065F46] text-xs px-3 py-1 rounded-full mt-2">
                  Đang hoạt động
                </span>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="mt-5 bg-[#FFF5F5] border-l-4 border-l-[#E63946] rounded-[10px] p-4">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-[#E63946]" />
                <span className="font-medium text-[#1D3557]">Không tìm thấy lớp học</span>
              </div>
              <p className="text-sm text-[#6C7A89] mt-1 pl-8">
                Mã lớp không hợp lệ hoặc đã hết hạn. Kiểm tra lại mã với giáo viên của bạn.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 space-y-2">
            <button
              disabled={status !== "success"}
              className="w-full h-12 bg-[#1D3557] text-[#F1FAEE] font-semibold rounded-lg hover:bg-[#457B9D] transition-colors disabled:bg-[#B8DDE0] disabled:text-[#6C7A89] disabled:cursor-not-allowed"
            >
              Tham gia lớp {code}
            </button>
            <Link
              href="/"
              className="w-full h-11 border border-[#B8DDE0] text-[#6C7A89] rounded-lg hover:bg-[#F0F6F8] transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>
          </div>

          {/* Already Joined Classes */}
          <div className="mt-6 pt-6 border-t border-[#B8DDE0]">
            <label className="text-xs font-mono uppercase text-[#6C7A89] tracking-wide mb-3 block">
              Lớp đang tham gia
            </label>
            <div className="flex flex-wrap gap-2">
              {joinedClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-[#F0F6F8] border border-[#B8DDE0] rounded-lg px-3 py-2 flex items-center gap-2"
                >
                  <span className="text-xs text-[#1D3557]">
                    {cls.code} — {cls.teacher}
                  </span>
                  <button className="text-[#6C7A89] hover:text-[#E63946] transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Hint Panel */}
        <div className="w-[220px] bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-5 h-fit shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <h2 className="font-semibold text-[#1D3557] text-sm mb-3">Hướng dẫn</h2>
          <ol className="text-sm text-[#6C7A89] space-y-2 list-decimal list-inside">
            <li>Nhận mã lớp từ giáo viên</li>
            <li>Nhập mã vào ô bên trên</li>
            <li>{"Nhấn \"Tham gia lớp\""}</li>
            <li>Bài tập sẽ xuất hiện tự động</li>
          </ol>
          <div className="mt-4 bg-[#EBF7F8] rounded-lg p-3 flex gap-2">
            <Info className="w-4 h-4 text-[#457B9D] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#6C7A89]">
              Bạn có thể tham gia nhiều lớp cùng lúc.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
