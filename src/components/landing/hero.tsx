"use client"

import { ArrowRight, Play, ChevronDown } from "lucide-react"
import { useGSAP } from "@/hooks/use-gsap"
import gsap from "gsap"

function FloatingShape({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`absolute select-none pointer-events-none ${className}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  )
}

export function Hero() {
  const containerRef = useGSAP(() => {
    // Floating shapes
    gsap.to(".floating-shape-1", {
      y: -50,
      x: 30,
      rotation: 360,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "none",
    })

    gsap.to(".floating-shape-2", {
      y: -80,
      x: -40,
      rotation: -360,
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: "none",
    })

    gsap.to(".floating-shape-3", {
      y: 40,
      x: 50,
      rotation: 180,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "none",
    })

    gsap.to(".floating-shape-4", {
      y: -30,
      x: -60,
      rotation: -180,
      duration: 22,
      repeat: -1,
      yoyo: true,
      ease: "none",
    })

    // Words stagger animation
    gsap.from(".hero-word", {
      opacity: 0,
      y: 30,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
    })

    // Subheading fade in
    gsap.from(".hero-subheading", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.8,
      ease: "power2.out",
    })

    // Badge
    gsap.from(".hero-badge", {
      opacity: 0, scale: 0.8, y: 20,
      duration: 0.8, delay: 1.0,
      ease: "back.out(1.4)",
      clearProps: "all",  // ← quan trọng!
    })

    // Buttons
    gsap.from(".hero-btn-primary, .hero-btn-secondary", {
      opacity: 0, scale: 0.8, y: 20,
      stagger: 0.15,
      duration: 0.8, delay: 1.2,
      ease: "back.out(1.4)",
      clearProps: "all",  // ← quan trọng!
    })

    // Stats
    gsap.from(".hero-stats", {
      opacity: 0, y: 20,
      duration: 0.8, delay: 1.5,
      ease: "power2.out",
      clearProps: "all",
    })

    // Scroll indicator bounce
    gsap.to(".scroll-indicator", {
      y: 10,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })
  }, [])

  const headlineWords = [
    "Hoc",
    "Hinh",
    "Hoc",
    "Khong",
    "Gian",
    "Thong",
    "Minh",
    "Hon",
    "voi",
    "AI",
  ]

  return (
    <section
      ref={containerRef}
      className="hero relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#F1FAEE] via-[#A8DADC]/20 to-[#F1FAEE]"
    >
      {/* Floating geometric shapes */}
      <FloatingShape className="floating-shape-1 left-[10%] top-[15%] opacity-20">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect
            x="10"
            y="10"
            width="100"
            height="100"
            rx="8"
            stroke="#1D3557"
            strokeWidth="2"
            transform="rotate(15 60 60)"
          />
        </svg>
      </FloatingShape>

      <FloatingShape className="floating-shape-2 right-[15%] top-[20%] opacity-15">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <polygon
            points="50,5 95,75 5,75"
            stroke="#457B9D"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </FloatingShape>

      <FloatingShape className="floating-shape-3 left-[5%] bottom-[25%] opacity-15">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="35" stroke="#A8DADC" strokeWidth="2" />
          <circle cx="40" cy="40" r="20" stroke="#A8DADC" strokeWidth="1.5" />
        </svg>
      </FloatingShape>

      <FloatingShape className="floating-shape-4 right-[8%] bottom-[30%] opacity-20">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <path
            d="M45 5L85 45L45 85L5 45Z"
            stroke="#457B9D"
            strokeWidth="2"
          />
        </svg>
      </FloatingShape>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Badge */}
        <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-[#A8DADC] bg-white/80 px-4 py-1.5 text-sm font-medium text-[#1D3557] backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#457B9D] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#457B9D]" />
          </span>
          Nen tang AI moi cho hoc sinh Viet Nam
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className={`hero-word inline-block ${word === "AI"
                  ? "bg-gradient-to-r from-[#457B9D] to-[#1D3557] bg-clip-text text-transparent"
                  : "text-[#1D3557]"
                }`}
            >
              {word}
              {i < headlineWords.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </h1>

        {/* Subheading */}
        <p className="hero-subheading mx-auto mb-10 max-w-2xl text-lg text-[#457B9D] md:text-xl">
          Truc quan hoa 3D, giai thich tung buoc, hieu sau hon - khong chi hoc thuoc long
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => {
              const el = document.querySelector("#demo")
              el?.scrollIntoView({ behavior: "smooth" })
            }}
            className="hero-btn-primary group flex items-center gap-2 rounded-full bg-[#1D3557] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#1D3557]/25 transition-all hover:bg-[#457B9D] hover:shadow-2xl hover:shadow-[#457B9D]/30"
          >
            Dung thu mien phi
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => {
              const el = document.querySelector("#demo")
              el?.scrollIntoView({ behavior: "smooth" })
            }}
            className="hero-btn-secondary flex items-center gap-2 rounded-full border-2 border-[#A8DADC] bg-white px-8 py-4 text-base font-semibold text-[#1D3557] transition-all hover:border-[#457B9D] hover:text-[#457B9D]"
          >
            <Play className="h-5 w-5" fill="currentColor" />
            Xem demo
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats mt-14 flex items-center justify-center gap-8 text-sm text-[#457B9D] md:gap-12">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[#1D3557]">10,000+</span>
            <span>Hoc sinh</span>
          </div>
          <div className="h-8 w-px bg-[#A8DADC]" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[#1D3557]">500+</span>
            <span>Bai tap</span>
          </div>
          <div className="h-8 w-px bg-[#A8DADC]" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[#1D3557]">98%</span>
            <span>Hai long</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="h-6 w-6 text-[#457B9D]" />
      </div>
    </section>
  )
}
