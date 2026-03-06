"use client"

import {
  Box,
  Brain,
  Layout,
  Bot,
  SlidersHorizontal,
  GitBranch,
} from "lucide-react"
import { useGSAP } from "@/hooks/use-gsap"
import gsap from "gsap"
import { useRef, useEffect } from "react"

const features = [
  {
    icon: Box,
    title: "Truc quan hoa 3D tuong tac",
    description:
      "Xoay, phong to, quan sat hinh hoc khong gian tu moi goc do. Hieu bai toan truc quan hon.",
    gradient: "from-[#1D3557] to-[#457B9D]",
  },
  {
    icon: Brain,
    title: "AI giai thich tung buoc",
    description:
      "Tri tue nhan tao phan tich de bai va huong dan giai chi tiet tung buoc mot.",
    gradient: "from-[#457B9D] to-[#A8DADC]",
  },
  {
    icon: Layout,
    title: "Hinh chieu 2D thoi gian thuc",
    description:
      "Tu dong tao hinh chieu tu cac goc nhin khac nhau, ho tro ve hinh chinh xac.",
    gradient: "from-[#A8DADC] to-[#457B9D]",
  },
  {
    icon: Bot,
    title: "Mentor thong minh",
    description:
      "Chat voi AI de hoi bat ky cau hoi nao ve hinh hoc. Nhan phan hoi tuc thi.",
    gradient: "from-[#457B9D] to-[#1D3557]",
  },
  {
    icon: SlidersHorizontal,
    title: "Tuy chinh va thu nghiem",
    description:
      "Thay doi kich thuoc, vi tri cac diem de hieu ro ban chat cua dinh ly.",
    gradient: "from-[#1D3557] to-[#457B9D]",
  },
  {
    icon: GitBranch,
    title: "Lich su phien ban",
    description:
      "Luu lai tat ca bai giai, so sanh cac phuong phap va theo doi tien trinh hoc tap.",
    gradient: "from-[#457B9D] to-[#1D3557]",
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    const card = cardRef.current
    const hoverTl = gsap.timeline({ paused: true })
    hoverTl.to(card, {
      scale: 1.03,
      boxShadow: "0 25px 50px -12px rgba(29,53,87,0.15)",
      duration: 0.3,
      ease: "power2.out",
    })

    const enter = () => hoverTl.play()
    const leave = () => hoverTl.reverse()

    card.addEventListener("mouseenter", enter)
    card.addEventListener("mouseleave", leave)
    return () => {
      card.removeEventListener("mouseenter", enter)
      card.removeEventListener("mouseleave", leave)
    }
  }, [])

  const Icon = feature.icon

  return (
    <div
      ref={cardRef}
      className="feature-card group relative overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-br from-[#F1FAEE] to-[#A8DADC]/20 p-8 shadow-lg transition-colors hover:border-[#A8DADC]"
      style={{ willChange: "transform" }}
    >
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} feature-icon shadow-lg`}
      >
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="mb-3 text-xl font-semibold text-[#1D3557]">
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed text-[#457B9D]">
        {feature.description}
      </p>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1D3557]/0 to-[#457B9D]/0 transition-all group-hover:from-[#1D3557]/[0.02] group-hover:to-[#457B9D]/[0.04]" />
    </div>
  )
}

export function Features() {
  const containerRef = useGSAP(() => {
    gsap.from(".features-title", {
      opacity: 0,
      scale: 0.95,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".features-title",
        start: "top 85%",
      },
    })

    gsap.from(".feature-card", {
      opacity: 0,
      y: 50,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 78%",
      },
    })

    gsap.from(".feature-icon", {
      rotation: -180,
      scale: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 78%",
      },
    })
  }, [])

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="features-title mb-16 text-center">
          <h2 className="text-3xl font-bold text-[#1D3557] md:text-4xl lg:text-5xl">
            Tai sao chon{" "}
            <span className="bg-gradient-to-r from-[#457B9D] to-[#1D3557] bg-clip-text text-transparent">
              VisualEdu?
            </span>
          </h2>
          <p className="mt-4 text-lg text-[#457B9D]">
            Moi thu ban can de chinh phuc hinh hoc khong gian lop 11
          </p>
        </div>

        <div className="features-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
