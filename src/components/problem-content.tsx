"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Camera, Pencil, Info, Upload, X } from "lucide-react"

// Mock data
const assignment = {
  id: 1,
  title: "Hình chóp S.ABCD — Tính thể tích",
  className: "11A1",
  teacher: "Nguyễn Thị Lan",
  assignedDate: "04/03/2026",
  dueDate: "08/03/2026",
  timeLeft: "2 ngày 4 giờ",
  type: "Hình chóp",
  difficulty: "Nâng cao",
  estimatedTime: "~25 phút",
  problem: `Cho hình chóp S.ABCD có đáy là hình vuông cạnh a, SA vuông góc với mặt đáy và SA = a√2.

a) Tính thể tích khối chóp S.ABCD.
b) Tính góc giữa đường thẳng SB và mặt phẳng đáy ABCD.
c) Tính khoảng cách từ điểm A đến mặt phẳng (SBC).`,
}

export function ProblemContent({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState<"upload" | "text">("upload")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [textAnswer, setTextAnswer] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const canSubmit = uploadedImage || textAnswer.trim().length > 0

  return (
    <div className="min-h-screen bg-[#F4F8FA]">
      {/* Top Bar */}
      <header className="sticky top-0 bg-[#1D3557] px-8 py-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <Link
            href="/student"
            className="flex items-center gap-2 text-sm text-[#A8DADC] hover:text-[#F1FAEE] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Bài tập
          </Link>
        </div>
        <h1 className="text-[#F1FAEE] font-semibold">{assignment.title}</h1>
        <div className="flex items-center gap-4">
          <span className="bg-[#A8DADC] text-[#1D3557] text-xs font-mono px-2.5 py-1 rounded-full">
            {assignment.className}
          </span>
          <span className="text-sm text-[#A8DADC]">GV: {assignment.teacher}</span>
          <span className="bg-[#FEF3C7] text-[#92400E] text-xs font-mono px-2.5 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Còn {assignment.timeLeft}
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[800px] mx-auto py-10 px-8">
        {/* Problem Card */}
        <div className="bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-8 shadow-[0_1px_3px_rgba(29,53,87,0.10)] mb-6">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#A8DADC] text-[#1D3557] text-xs px-2.5 py-1 rounded-full">
                {assignment.type}
              </span>
              <span className="bg-[#E63946] text-[#F1FAEE] text-xs px-2.5 py-1 rounded-full">
                {assignment.difficulty}
              </span>
              <span className="border border-[#B8DDE0] text-[#6C7A89] text-xs px-2.5 py-1 rounded-full">
                {assignment.estimatedTime}
              </span>
            </div>
            <span className="text-xs font-mono text-[#6C7A89]">
              Giao ngày {assignment.assignedDate}
            </span>
          </div>

          {/* Problem Title */}
          <h2 className="text-lg font-semibold text-[#1D3557] mb-4">Đề bài</h2>

          {/* Problem Text */}
          <div className="text-[#1D3557] leading-[1.8] whitespace-pre-line mb-6">
            {assignment.problem}
          </div>

          {/* 2D Diagram */}
          <div className="bg-[#F0F6F8] border border-[#B8DDE0] rounded-lg p-6 text-center">
            <Pyramid2D />
            <p className="text-xs font-mono text-[#6C7A89] mt-4">Hình minh hoạ 2D</p>
          </div>
        </div>

        {/* Instruction Banner */}
        <div className="bg-[#EBF7F8] border-l-4 border-l-[#A8DADC] rounded-[10px] p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#457B9D] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[#1D3557]">
                Làm bài trên giấy hoặc vở, sau đó chụp ảnh hoặc nhập lời giải để nộp.
              </p>
              <p className="text-sm text-[#6C7A89] mt-1">
                Lưu ý: Bài này không có gợi ý AI — đây là bài kiểm tra năng lực thực.
              </p>
            </div>
          </div>
        </div>

        {/* Submission Card */}
        <div className="bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-6 shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
          <h2 className="font-semibold text-[#1D3557] mb-4">Nộp bài</h2>

          {/* Tab Bar */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "upload"
                  ? "bg-[#1D3557] text-[#F1FAEE]"
                  : "text-[#6C7A89] hover:bg-[#F0F6F8]"
              }`}
            >
              <Camera className="w-4 h-4" />
              Chụp ảnh bài làm
            </button>
            <button
              onClick={() => setActiveTab("text")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "text"
                  ? "bg-[#1D3557] text-[#F1FAEE]"
                  : "text-[#6C7A89] hover:bg-[#F0F6F8]"
              }`}
            >
              <Pencil className="w-4 h-4" />
              Nhập lời giải
            </button>
          </div>

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <div>
              {!uploadedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#B8DDE0] rounded-[10px] p-8 text-center cursor-pointer hover:border-[#A8DADC] hover:bg-[#F0F6F8] transition-colors"
                >
                  <Upload className="w-8 h-8 text-[#457B9D] mx-auto mb-3" />
                  <p className="font-medium text-[#1D3557] mb-1">Chụp ảnh bài làm của bạn</p>
                  <p className="text-sm text-[#6C7A89] mb-3">hoặc</p>
                  <button className="border border-[#457B9D] text-[#457B9D] text-sm px-4 py-2 rounded-lg hover:bg-[#EBF7F8] transition-colors">
                    Chọn ảnh từ thư viện
                  </button>
                  <p className="text-xs font-mono text-[#6C7A89] mt-3">
                    JPG, PNG · Tối đa 10MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded solution"
                    className="w-full max-h-[200px] object-contain rounded-lg border border-[#B8DDE0]"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white border border-[#B8DDE0] rounded-full flex items-center justify-center hover:bg-[#FEE2E2] transition-colors"
                  >
                    <X className="w-4 h-4 text-[#6C7A89]" />
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm text-[#457B9D] mt-3 hover:underline"
                  >
                    Đổi ảnh
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          )}

          {/* Text Tab */}
          {activeTab === "text" && (
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Nhập lời giải của bạn..."
              className="w-full min-h-[160px] border border-[#B8DDE0] rounded-lg p-4 text-[#1D3557] placeholder-[#6C7A89] focus:outline-none focus:ring-2 focus:ring-[#A8DADC] focus:border-[#A8DADC] transition-all resize-none"
            />
          )}

          {/* Bottom Row */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#B8DDE0]">
            <span className="text-sm text-[#6C7A89]">0/3 câu đã trả lời</span>
            <Link
              href={canSubmit ? "/student/phong-van" : "#"}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                canSubmit
                  ? "bg-[#1D3557] text-[#F1FAEE] hover:bg-[#457B9D]"
                  : "bg-[#B8DDE0] text-[#6C7A89] cursor-not-allowed"
              }`}
            >
              Nộp bài
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

function Pyramid2D() {
  return (
    <svg
      viewBox="0 0 200 150"
      className="w-full max-w-[300px] mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base square ABCD */}
      <path
        d="M40 120 L160 120 L180 90 L60 90 Z"
        stroke="#457B9D"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Hidden edge */}
      <path
        d="M40 120 L60 90"
        stroke="#457B9D"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />
      {/* Apex S */}
      <path d="M100 20 L40 120" stroke="#457B9D" strokeWidth="1.5" fill="none" />
      <path d="M100 20 L160 120" stroke="#457B9D" strokeWidth="1.5" fill="none" />
      <path d="M100 20 L180 90" stroke="#457B9D" strokeWidth="1.5" fill="none" />
      <path
        d="M100 20 L60 90"
        stroke="#457B9D"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />
      {/* SA edge - highlighted */}
      <path d="M100 20 L100 105" stroke="#A8DADC" strokeWidth="2.5" fill="none" />
      {/* Right angle at A */}
      <rect x="100" y="97" width="8" height="8" stroke="#A8DADC" strokeWidth="1" fill="none" />
      {/* Labels */}
      <text x="32" y="130" className="text-[10px] font-mono fill-[#1D3557]">A</text>
      <text x="162" y="130" className="text-[10px] font-mono fill-[#1D3557]">B</text>
      <text x="182" y="88" className="text-[10px] font-mono fill-[#1D3557]">C</text>
      <text x="52" y="88" className="text-[10px] font-mono fill-[#1D3557]">D</text>
      <text x="96" y="14" className="text-[10px] font-mono fill-[#1D3557]">S</text>
    </svg>
  )
}
