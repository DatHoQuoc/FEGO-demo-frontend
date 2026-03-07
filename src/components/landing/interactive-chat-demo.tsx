"use client"

import { useState, useRef, useCallback } from "react"
import { Send, Sparkles, RotateCcw, Eye } from "lucide-react"
import { useGSAP } from "@/hooks/use-gsap"
import gsap from "gsap"
import { useRouter } from "next/navigation"

interface ChatMessage {
  role: "user" | "ai"
  content: string
  hasPreview?: boolean
}

const examplePrompts = [
  {
    label: "Bai 1: Tinh khoang cach tu diem den mat phang",
    prompt: "Cho hinh chop S.ABCD co day ABCD la hinh vuong canh a, SA vuong goc voi day. Tinh khoang cach tu A den mat phang (SBC).",
  },
  {
    label: "Bai 2: Tinh goc giua hai mat phang",
    prompt: "Cho hinh chop S.ABC co SA = SB = SC = a, day ABC la tam giac deu canh a. Tinh goc giua mat phang (SAB) va mat phang (ABC).",
  },
  {
    label: "Bai 3: Chung minh hai duong thang song song",
    prompt: "Cho hinh hop ABCD.A'B'C'D'. Goi M, N lan luot la trung diem cua AB va CD. Chung minh MN song song voi mat phang (ADD'A').",
  },
]

const aiResponses: Record<string, ChatMessage[]> = {
  default: [
    {
      role: "ai",
      content: "Toi da phan tich de bai cua ban. Day la hinh chop S.ABCD voi day ABCD la hinh vuong canh a, SA vuong goc voi day.",
    },
    {
      role: "ai",
      content: "Buoc 1: Xac dinh he truc toa do.\nBuoc 2: Tim phuong trinh mat phang (SBC).\nBuoc 3: Ap dung cong thuc tinh khoang cach.\n\nKet qua: d(A, (SBC)) = a*sqrt(2)/sqrt(3)",
      hasPreview: true,
    },
  ],
}

export function InteractiveChatDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const containerRef = useGSAP(() => {
  gsap.from(".demo-container", {
    opacity: 0,
    scale: 0.95,
    y: 50,
    duration: 1,
    ease: "power3.out",
    clearProps: "opacity,scale,y", // ← fix
    scrollTrigger: {
      trigger: ".demo-section",
      start: "top 80%",
      end: "top 50%",
      toggleActions: "play none none none",
    },
  })

  gsap.from(".demo-title-text", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    clearProps: "opacity,y", // ← fix
    scrollTrigger: {
      trigger: ".demo-section",
      start: "top 85%",
    },
  })

  gsap.from(".example-btn", {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.6,
    clearProps: "opacity,y", // ← fix
    scrollTrigger: {
      trigger: ".example-buttons",
      start: "top 90%",
    },
  })
}, [])

 const animateNewMessage = useCallback(() => {
  requestAnimationFrame(() => {
    const bubbles = document.querySelectorAll(".chat-bubble")
    const lastBubble = bubbles[bubbles.length - 1] // chỉ lấy bubble cuối
    if (lastBubble) {
      gsap.fromTo(  // ← đổi sang fromTo thay vì from
        lastBubble,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.2)",
          clearProps: "opacity,y,scale", // ← fix
        }
      )
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  })
}, [])

  const handleSend = useCallback(
    (text?: string) => {
      const message = text || input
      if (!message.trim() || isTyping) return

      const userMsg: ChatMessage = { role: "user", content: message }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setIsTyping(true)

      setTimeout(() => animateNewMessage(), 50)

      // Simulate AI response
      setTimeout(() => {
        const responses = aiResponses.default
        setIsTyping(false)
        setMessages((prev) => [...prev, responses[0]])
        setTimeout(() => animateNewMessage(), 50)

        setTimeout(() => {
          setMessages((prev) => [...prev, responses[1]])
          setTimeout(() => animateNewMessage(), 50)
        }, 1200)
      }, 1500)
    },
    [input, isTyping, animateNewMessage]
  )

  const handleReset = () => {
    setMessages([])
    setInput("")
    setIsTyping(false)
  }

  return (
    <section
      ref={containerRef}
      id="demo"
      className="demo-section relative w-full py-20 bg-gradient-to-br from-[#F1FAEE] to-[#A8DADC]/30"
    >
      {/* Section Title */}
      <div className="mx-auto max-w-4xl px-4 text-center mb-12">
        <h2 className="demo-title-text text-3xl font-bold text-[#1D3557] md:text-4xl lg:text-5xl">
          Thu ngay -{" "}
          <span className="bg-gradient-to-r from-[#457B9D] to-[#1D3557] bg-clip-text text-transparent">
            Khong can dang ky
          </span>
        </h2>
        <p className="demo-title-text mt-4 text-lg text-[#457B9D]">
          Nhap de bai hinh hoc cua ban va xem AI giai quyet nhu the nao
        </p>
      </div>

      {/* Chat Container */}
      <div className="demo-container mx-auto max-w-4xl px-4">
        <div className="relative overflow-hidden rounded-3xl border-2 border-[#A8DADC] bg-white shadow-2xl shadow-[#1D3557]/10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#A8DADC] bg-gradient-to-r from-[#F1FAEE] to-[#A8DADC]/30 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D3557]">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1D3557]">
                  VisualEdu AI
                </p>
                <p className="text-xs text-[#457B9D]">Online - San sang ho tro</p>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#457B9D] transition-colors hover:bg-[#F1FAEE] hover:text-[#1D3557]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Lam moi
              </button>
            )}
          </div>

          {/* Chat Messages */}
          <div className="h-[380px] overflow-y-auto px-6 py-6">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A8DADC]/30 to-[#F1FAEE]">
                  <Sparkles className="h-8 w-8 text-[#1D3557]" />
                </div>
                <p className="text-lg font-semibold text-[#1D3557]">
                  Chao ban! Toi la VisualEdu AI
                </p>
                <p className="mt-1 max-w-sm text-sm text-[#457B9D]">
                  Nhap de bai hinh hoc khong gian cua ban, toi se giup ban giai
                  va truc quan hoa 3D.
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble mb-4 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#1D3557] text-white"
                      : "bg-[#F1FAEE] text-[#1D3557] border border-[#A8DADC]"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  {msg.hasPreview && (
                    <div className="mt-3">
                      {/* 3D Preview Placeholder */}
                      <div className="overflow-hidden rounded-xl border border-[#A8DADC] bg-gradient-to-br from-[#F1FAEE] to-[#A8DADC]/20 p-4">
                        <div className="flex items-center justify-center">
                          <svg
                            width="200"
                            height="140"
                            viewBox="0 0 200 140"
                            fill="none"
                            className="drop-shadow-sm"
                          >
                            {/* Base square */}
                            <polygon
                              points="40,110 100,130 160,110 100,90"
                              stroke="#1D3557"
                              strokeWidth="2"
                              fill="#1D355720"
                            />
                            {/* Apex */}
                            <line
                              x1="100"
                              y1="20"
                              x2="40"
                              y2="110"
                              stroke="#457B9D"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="100"
                              y1="20"
                              x2="100"
                              y2="130"
                              stroke="#457B9D"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="100"
                              y1="20"
                              x2="160"
                              y2="110"
                              stroke="#457B9D"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="100"
                              y1="20"
                              x2="100"
                              y2="90"
                              stroke="#457B9D"
                              strokeWidth="1.5"
                            />
                            {/* Labels */}
                            <text
                              x="95"
                              y="15"
                              fill="#1D3557"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              S
                            </text>
                            <text
                              x="25"
                              y="115"
                              fill="#1D3557"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              A
                            </text>
                            <text
                              x="95"
                              y="85"
                              fill="#1D3557"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              B
                            </text>
                            <text
                              x="163"
                              y="115"
                              fill="#1D3557"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              C
                            </text>
                            <text
                              x="95"
                              y="138"
                              fill="#1D3557"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              D
                            </text>
                            {/* Height line dashed */}
                            <line
                              x1="100"
                              y1="20"
                              x2="100"
                              y2="110"
                              stroke="#457B9D"
                              strokeWidth="1.5"
                              strokeDasharray="4 3"
                            />
                          </svg>
                        </div>
                        <p className="mt-2 text-center text-xs text-[#457B9D]">
                          Hinh chop S.ABCD - Xoay 3D de xem chi tiet
                        </p>
                      </div>
                      <button
                        onClick={() => router.push("/chat")}
                      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#1D3557] py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#457B9D] hover:shadow-lg">
                        <Eye className="h-3.5 w-3.5" />
                        Xem day du loi giai
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-bubble mb-4 flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl border border-[#A8DADC] bg-[#F1FAEE] px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#1D3557] [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#457B9D] [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#A8DADC] [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-[#A8DADC] bg-white px-4 py-4">
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Nhap de bai hinh hoc cua ban..."
                rows={2}
                className="flex-1 resize-none rounded-2xl border border-[#A8DADC] bg-[#F1FAEE] px-4 py-3 text-sm text-[#1D3557] placeholder:text-[#457B9D]/60 focus:border-[#457B9D] focus:outline-none focus:ring-2 focus:ring-[#457B9D]/20"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1D3557] text-white shadow-lg shadow-[#1D3557]/25 transition-all hover:bg-[#457B9D] hover:shadow-xl disabled:opacity-50 disabled:shadow-none"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Example Buttons */}
        <div className="example-buttons mt-8 text-center">
          <p className="mb-4 text-sm font-medium text-[#457B9D]">
            Hoac thu cac vi du:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {examplePrompts.map((ex, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(ex.prompt)
                  handleSend(ex.prompt)
                }}
                className="example-btn rounded-full border border-[#A8DADC] bg-white px-4 py-2.5 text-xs font-medium text-[#457B9D] transition-all hover:border-[#1D3557] hover:bg-[#F1FAEE] hover:text-[#1D3557] md:text-sm"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
