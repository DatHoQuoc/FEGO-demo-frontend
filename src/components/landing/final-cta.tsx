"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { useGSAP } from "@/hooks/use-gsap"
import gsap from "gsap"
import { useRef, useEffect } from "react"

export function FinalCTA() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const containerRef = useGSAP(() => {
    gsap.from(".cta-content", {
      opacity: 0,
      y: 40,
      duration: 1,
      scrollTrigger: {
        trigger: ".final-cta",
        start: "top 80%",
      },
    })

    gsap.from(".cta-sparkle", {
      scale: 0,
      rotation: -180,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: ".final-cta",
        start: "top 75%",
      },
    })
  }, [])

  // Magnetic button effect
  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(button, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      })
    }

    button.addEventListener("mousemove", handleMove)
    button.addEventListener("mouseleave", handleLeave)
    return () => {
      button.removeEventListener("mousemove", handleMove)
      button.removeEventListener("mouseleave", handleLeave)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="final-cta relative overflow-hidden py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#1D3557]" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cta-sparkle absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-[#457B9D]/20 blur-3xl" />
        <div className="cta-sparkle absolute right-[15%] top-[30%] h-48 w-48 rounded-full bg-[#A8DADC]/10 blur-3xl" />
        <div className="cta-sparkle absolute bottom-[20%] left-[30%] h-40 w-40 rounded-full bg-[#A8DADC]/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="cta-content relative z-10 mx-auto max-w-3xl px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#A8DADC]/30 bg-[#457B9D]/20 px-4 py-1.5 text-sm font-medium text-[#A8DADC] backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          Bat dau hoc ngay hom nay
        </div>

        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          San sang chinh phuc Hinh hoc Khong gian?
        </h2>

        <p className="mx-auto mb-10 max-w-lg text-lg text-[#A8DADC]">
          Tham gia cung 10,000+ hoc sinh da hoc tot hon voi VisualEdu. Bat dau mien phi, nang cap bat cu luc nao.
        </p>

        <button
          ref={buttonRef}
          className="group inline-flex items-center gap-2 rounded-full bg-[#A8DADC] px-8 py-4 text-base font-bold text-[#1D3557] shadow-2xl shadow-[#A8DADC]/25 transition-all hover:bg-white hover:shadow-[#A8DADC]/40"
        >
          Dung thu mien phi ngay
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="mt-6 text-sm text-[#A8DADC]/60">
          Khong can the tin dung - Bat dau trong 30 giay
        </p>
      </div>
    </section>
  )
}
