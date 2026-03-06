"use client"

import { PenLine, Cpu, GraduationCap } from "lucide-react"
import { useGSAP } from "@/hooks/use-gsap"
import gsap from "gsap"

const steps = [
  {
    number: "1",
    icon: PenLine,
    title: "Nhap de bai",
    description:
      "Chup anh hoac go de bai hinh hoc khong gian cua ban. AI se tu dong nhan dien va phan tich.",
    gradient: "from-[#1D3557] to-[#457B9D]",
  },
  {
    number: "2",
    icon: Cpu,
    title: "AI phan tich",
    description:
      "Tri tue nhan tao xu ly bai toan, xay dung mo hinh 3D va tim loi giai toi uu.",
    gradient: "from-[#457B9D] to-[#A8DADC]",
  },
  {
    number: "3",
    icon: GraduationCap,
    title: "Hoc tuong tac",
    description:
      "Xem loi giai chi tiet, tuong tac 3D, dat cau hoi va luyen tap cung AI.",
    gradient: "from-[#A8DADC] to-[#1D3557]",
  },
]

export function HowItWorks() {
  const containerRef = useGSAP(() => {
    gsap.from(".hiw-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".how-it-works",
        start: "top 85%",
      },
    })

    gsap.from(".step-number", {
      scale: 0,
      rotation: -180,
      stagger: 0.25,
      duration: 0.8,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: ".hiw-steps",
        start: "top 75%",
      },
    })

    gsap.from(".step-card", {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".hiw-steps",
        start: "top 75%",
      },
    })

    // Timeline connector animation
    gsap.from(".timeline-connector", {
      scaleX: 0,
      stagger: 0.3,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".hiw-steps",
        start: "top 75%",
      },
    })
  }, [])

  return (
    <section
      ref={containerRef}
      className="how-it-works relative overflow-hidden bg-gradient-to-br from-[#A8DADC]/20 to-[#F1FAEE] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Title */}
        <div className="hiw-title mb-20 text-center">
          <h2 className="text-3xl font-bold text-[#1D3557] md:text-4xl lg:text-5xl">
            Cach hoat dong{" "}
            <span className="bg-gradient-to-r from-[#457B9D] to-[#1D3557] bg-clip-text text-transparent">
              don gian
            </span>
          </h2>
          <p className="mt-4 text-lg text-[#457B9D]">
            Chi 3 buoc de bat dau hoc hinh hoc thong minh hon
          </p>
        </div>

        {/* Steps */}
        <div className="hiw-steps relative grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="step-card relative text-center">
                {/* Number Badge */}
                <div className="relative mx-auto mb-6">
                  <div
                    className={`step-number mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${step.gradient} text-3xl font-bold text-white shadow-xl`}
                  >
                    {step.number}
                  </div>
                  {/* Connector line (hidden on last) */}
                  {i < steps.length - 1 && (
                    <div className="timeline-connector absolute left-[calc(50%+48px)] top-10 hidden h-0.5 w-[calc(100%-48px)] origin-left bg-gradient-to-r from-[#A8DADC] to-[#A8DADC] md:block" />
                  )}
                </div>

                {/* Icon */}
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md">
                  <Icon className="h-6 w-6 text-[#1D3557]" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-[#1D3557]">
                  {step.title}
                </h3>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-[#457B9D]">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
