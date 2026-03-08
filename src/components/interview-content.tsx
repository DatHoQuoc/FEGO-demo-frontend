"use client"

import { useState } from "react"
import { Clock, Lock, Mic, Play, RotateCcw, ZoomIn, ZoomOut, Maximize2, Bot, Check } from "lucide-react"

// Mock data
const interview = {
  title: "Hình chóp S.ABCD — Tính thể tích",
  submittedAt: "21:47 · 06/03/2026",
  currentTurn: 2,
  totalTurns: 3,
  timeElapsed: "01:23",
  turns: [
    {
      id: 1,
      question: "Em hãy giải thích tại sao SA lại vuông góc với mặt đáy trong bài toán vừa rồi?",
      answer: "Vì đề bài cho SA vuông góc với đáy ạ, và em dùng điều đó để tính chiều cao.",
      result: "correct",
      feedback: "Hiểu đúng — nắm được điều kiện đề cho",
    },
    {
      id: 2,
      question: "Tốt! Vậy nếu SA không vuông góc với đáy mà nghiêng một góc, thì công thức tính thể tích có thay đổi không? Tại sao?",
      answer: null,
      result: null,
    },
  ],
}

type VoiceState = "idle" | "recording" | "recorded"

export function InterviewContent() {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle")
  const [recordedText] = useState(
    "Dạ có thay đổi ạ, vì chiều cao hình chóp sẽ không còn bằng SA nữa mà phải tính bằng SA nhân sin góc đó..."
  )

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Progress Bar */}
      <header className="bg-[#1D3557] h-14 px-8 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#F1FAEE]">Kiểm chứng hiểu bài</span>
          <span className="text-xs text-[#A8DADC]">{interview.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i <= interview.currentTurn ? "bg-[#A8DADC]" : "border-2 border-[#A8DADC]"
                }`}
              />
            ))}
            <span className="text-xs font-mono text-[#A8DADC] ml-2">
              Lượt {interview.currentTurn} / {interview.totalTurns}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#A8DADC]" />
          <span className="text-lg font-mono font-bold text-[#F1FAEE]">{interview.timeElapsed}</span>
          <span className="text-xs text-[#A8DADC]">thời gian đã dùng</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - 3D Viewer */}
        <div className="w-[45%] bg-[#0F1F33] p-6 flex flex-col">
          <div className="mb-4">
            <p className="text-sm font-medium text-[#F1FAEE]">Mô hình 3D — Hình chóp S.ABCD</p>
            <p className="text-xs text-[#A8DADC]">SA đang được highlight</p>
          </div>

          {/* 3D Canvas */}
          <div className="flex-1 bg-[#0F1F33] rounded-[10px] border border-[#2E5270] flex items-center justify-center relative">
            <Pyramid3D />
            
            {/* Highlight Badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[rgba(168,218,220,0.15)] border border-[#A8DADC] rounded-lg px-3.5 py-2">
              <span className="text-xs font-mono text-[#A8DADC]">SA — Chiều cao hình chóp</span>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex justify-center mt-4">
            <div className="flex gap-1 bg-[rgba(255,255,255,0.05)] rounded-lg p-2">
              {[RotateCcw, ZoomIn, ZoomOut, Maximize2].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 flex items-center justify-center text-[#6C7A89] hover:text-[#A8DADC] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Interview */}
        <div className="w-[55%] bg-[#F4F8FA] p-7 overflow-y-auto">
          {/* Context Card */}
          <div className="bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-4 mb-4 flex justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-[#6C7A89] mb-1">Bài vừa nộp</p>
              <p className="font-semibold text-[#1D3557]">{interview.title}</p>
              <p className="text-xs font-mono text-[#6C7A89] mt-1">Đã nộp lúc {interview.submittedAt}</p>
            </div>
            <div className="w-24 h-16 bg-[#F0F6F8] rounded-lg flex items-center justify-center">
              <p className="text-xs font-mono text-[#6C7A89]">Hình minh hoạ</p>
            </div>
          </div>

          {/* Turn 1 - Completed */}
          <div className="bg-white border border-[#B8DDE0] border-l-[3px] border-l-[#10B981] rounded-[10px] p-4 mb-3 opacity-75">
            <div className="bg-[#F0F6F8] rounded-lg p-2.5 mb-2">
              <p className="text-xs font-mono text-[#6C7A89] mb-1">Lượt 1</p>
              <p className="text-sm italic text-[#1D3557]">{interview.turns[0].question}</p>
            </div>
            <div className="bg-white border border-[#B8DDE0] rounded-lg p-2.5 mt-2">
              <p className="text-xs font-mono text-[#6C7A89] mb-1">Nguyễn Bảo An</p>
              <p className="text-sm text-[#1D3557]">{interview.turns[0].answer}</p>
              <WaveformBars className="mt-2" muted />
            </div>
            <div className="bg-[#F0FDF4] border-l-[3px] border-l-[#10B981] rounded-md p-2 mt-2">
              <p className="text-xs text-[#065F46] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {interview.turns[0].feedback}
              </p>
            </div>
          </div>

          {/* Turn 2 - Active */}
          <div className="bg-[#F8FBFC] border-2 border-[#A8DADC] rounded-[10px] p-5 shadow-[0_4px_16px_rgba(168,218,220,0.25)]">
            {/* AI Question */}
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-5 h-5 text-[#457B9D]" />
              <span className="text-xs font-mono text-[#6C7A89]">AI Mentor · Lượt 2</span>
            </div>
            <p className="text-base font-medium text-[#1D3557] leading-relaxed mb-3">
              {interview.turns[1].question}
            </p>
            <div className="bg-[#EBF7F8] rounded-md p-2 mb-3">
              <p className="text-xs italic text-[#457B9D]">
                Quan sát SA được highlight trong hình 3D bên trái
              </p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-[#A8DADC] rounded-full animate-pulse" />
              <span className="text-sm italic text-[#6C7A89]">Đang chờ câu trả lời...</span>
            </div>

            <div className="border-t border-[#B8DDE0] my-4" />

            {/* Voice Input States */}
            {voiceState === "idle" && (
              <div className="text-center">
                <button
                  onClick={() => setVoiceState("recording")}
                  className="w-20 h-20 rounded-full bg-[#1D3557] shadow-[0_4px_20px_rgba(29,53,87,0.4)] flex items-center justify-center mx-auto hover:bg-[#457B9D] transition-colors"
                >
                  <Mic className="w-8 h-8 text-[#F1FAEE]" />
                </button>
                <p className="text-sm font-medium text-[#1D3557] mt-3">Giữ để ghi âm</p>
                <p className="text-xs text-[#6C7A89]">Thả ra để gửi</p>
              </div>
            )}

            {voiceState === "recording" && (
              <div className="text-center">
                <button
                  onClick={() => setVoiceState("recorded")}
                  className="w-20 h-20 rounded-full bg-[#E63946] ring-4 ring-[rgba(230,57,70,0.2)] flex items-center justify-center mx-auto animate-pulse"
                >
                  <Mic className="w-8 h-8 text-[#F1FAEE]" />
                </button>
                <WaveformBars className="mt-4 mx-auto max-w-[260px]" recording />
                <p className="text-lg font-mono font-bold text-[#E63946] mt-2">00:08</p>
                <p className="text-sm text-[#E63946]">Đang ghi âm...</p>
              </div>
            )}

            {voiceState === "recorded" && (
              <div>
                <div className="bg-[#F0F6F8] rounded-lg p-2.5 flex items-center gap-3">
                  <button className="w-8 h-8 rounded-full bg-[#1D3557] flex items-center justify-center">
                    <Play className="w-4 h-4 text-[#F1FAEE]" />
                  </button>
                  <WaveformBars className="flex-1" />
                  <span className="text-xs font-mono text-[#6C7A89]">00:12</span>
                </div>
                <div className="bg-[#EBF7F8] border border-[#A8DADC] rounded-lg p-3 mt-2">
                  <p className="text-xs font-mono uppercase text-[#6C7A89] mb-1">Nội dung ghi âm:</p>
                  <p className="text-sm italic text-[#1D3557]">{recordedText}</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setVoiceState("idle")}
                    className="flex-1 border border-[#457B9D] text-[#457B9D] text-sm py-2 rounded-lg hover:bg-[#EBF7F8] transition-colors"
                  >
                    Ghi lại
                  </button>
                  <a
                    href="/ket-qua"
                    className="flex-1 bg-[#1D3557] text-[#F1FAEE] text-sm py-2 rounded-lg font-semibold text-center hover:bg-[#457B9D] transition-colors"
                  >
                    Gửi
                  </a>
                </div>
              </div>
            )}

            {/* Lock Notice */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <Lock className="w-3.5 h-3.5 text-[#6C7A89]" />
              <span className="text-xs italic text-[#6C7A89]">
                Bắt buộc trả lời bằng giọng nói — không có tùy chọn nhập text
              </span>
            </div>
          </div>

          {/* Cannot Skip Banner */}
          <div className="bg-[#FFF5F5] border border-[#E63946] rounded-lg p-3 mt-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#E63946]" />
            <span className="text-xs text-[#6C7A89]">
              Bạn cần hoàn thành phỏng vấn trước khi xem kết quả bài nộp.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Pyramid3D() {
  return (
    <svg
      viewBox="0 0 240 200"
      className="w-[80%] max-w-[280px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base square ABCD */}
      <path
        d="M40 160 L200 160 L220 130 L60 130 Z"
        stroke="#457B9D"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Hidden edge */}
      <path
        d="M40 160 L60 130"
        stroke="#457B9D"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        fill="none"
      />
      {/* Edges to apex */}
      <path d="M120 30 L40 160" stroke="#2E5270" strokeWidth="1" fill="none" />
      <path d="M120 30 L200 160" stroke="#2E5270" strokeWidth="1" fill="none" />
      <path d="M120 30 L220 130" stroke="#2E5270" strokeWidth="1" fill="none" />
      <path
        d="M120 30 L60 130"
        stroke="#2E5270"
        strokeWidth="1"
        strokeDasharray="5 5"
        fill="none"
      />
      {/* SA edge - highlighted with glow */}
      <path
        d="M120 30 L120 145"
        stroke="#A8DADC"
        strokeWidth="3"
        fill="none"
        filter="drop-shadow(0 0 8px #A8DADC)"
      />
      {/* Right angle at A */}
      <rect
        x="120"
        y="135"
        width="10"
        height="10"
        stroke="#A8DADC"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Vertices */}
      {[
        { x: 32, y: 170, label: "A" },
        { x: 202, y: 170, label: "B" },
        { x: 224, y: 128, label: "C" },
        { x: 52, y: 128, label: "D" },
        { x: 116, y: 20, label: "S" },
      ].map((v) => (
        <text
          key={v.label}
          x={v.x}
          y={v.y}
          className="text-[11px] font-mono fill-[#F1FAEE]"
        >
          {v.label}
        </text>
      ))}
    </svg>
  )
}

function WaveformBars({ className = "", muted = false, recording = false }: { className?: string; muted?: boolean; recording?: boolean }) {
  const bars = [3, 5, 8, 4, 6, 9, 5, 7, 4, 8, 6, 3, 5, 7, 4, 6, 8, 5, 3, 6]
  const color = recording ? "#E63946" : muted ? "#B8DDE0" : "#A8DADC"
  
  return (
    <div className={`flex items-center justify-center gap-0.5 h-5 ${className}`}>
      {bars.map((height, i) => (
        <div
          key={i}
          className={`w-1 rounded-full ${recording ? "animate-pulse" : ""}`}
          style={{
            height: `${height * 2}px`,
            backgroundColor: color,
            animationDelay: recording ? `${i * 50}ms` : undefined,
          }}
        />
      ))}
    </div>
  )
}
