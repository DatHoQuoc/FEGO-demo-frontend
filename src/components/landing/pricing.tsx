"use client"

import { Check, Zap } from "lucide-react"
import { useGSAP } from "@/hooks/use-gsap"
import gsap from "gsap"

const plans = [
  {
    name: "Mien phi",
    price: "0",
    description: "Bat dau khám pha hinh hoc 3D",
    features: [
      "5 bai giai moi ngay",
      "Truc quan hoa 3D co ban",
      "Chat AI gioi han",
      "Quang cao",
    ],
    cta: "Bat dau ngay",
    popular: false,
    gradient: "from-[#457B9D] to-[#A8DADC]",
  },
  {
    name: "Hoc sinh Pro",
    price: "99.000",
    period: "/thang",
    description: "Day du tinh nang cho hoc sinh",
    features: [
      "Khong gioi han bai giai",
      "Truc quan hoa 3D nang cao",
      "Chat AI khong gioi han",
      "Khong quang cao",
      "Luu lich su bai giai",
      "Ho tro uu tien",
    ],
    cta: "Dung thu 7 ngay",
    popular: true,
    gradient: "from-[#457B9D] to-[#1D3557]",
  },
  {
    name: "Truong hoc",
    price: "Lien he",
    description: "Giai phap cho truong hoc va giao vien",
    features: [
      "Tat ca tinh nang Pro",
      "Quan ly lop hoc",
      "Bao cao tien trinh",
      "API tich hop",
      "Dao tao giao vien",
      "Ho tro 24/7",
    ],
    cta: "Lien he tu van",
    popular: false,
    gradient: "from-[#1D3557] to-[#457B9D]",
  },
]

export function Pricing() {
  const containerRef = useGSAP(() => {
    gsap.from(".pricing-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".pricing-section",
        start: "top 85%",
      },
    })

    gsap.from(".pricing-card", {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".pricing-grid",
        start: "top 75%",
      },
    })

    gsap.to(".popular-badge", {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    // Hover scale up + glow effect
    const cards = document.querySelectorAll(".pricing-card")
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.03,
          boxShadow: "0 25px 50px -12px rgba(69, 123, 157, 0.25)",
          duration: 0.3,
          ease: "power2.out",
        })
      })
      card.addEventListener("mouseleave", () => {
        const isPopular = card.classList.contains("popular-card")
        gsap.to(card, {
          scale: isPopular ? 1.05 : 1,
          boxShadow: isPopular
            ? "0 25px 50px -12px rgba(69, 123, 157, 0.1)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })
  }, [])

  return (
    <section
      ref={containerRef}
      id="pricing"
      className="pricing-section relative bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Title */}
        <div className="pricing-title mb-16 text-center">
          <h2 className="text-3xl font-bold text-[#1D3557] md:text-4xl lg:text-5xl">
            Gia ca{" "}
            <span className="bg-gradient-to-r from-[#457B9D] to-[#1D3557] bg-clip-text text-transparent">
              phu hop
            </span>
          </h2>
          <p className="mt-4 text-lg text-[#457B9D]">
            Chon goi phu hop voi nhu cau hoc tap cua ban
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card relative overflow-hidden rounded-2xl border-2 p-8 transition-colors ${
                plan.popular
                  ? "popular-card border-[#457B9D] bg-white shadow-2xl shadow-[#457B9D]/10 lg:scale-105"
                  : "border-[#A8DADC] bg-white shadow-lg"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="popular-badge absolute -right-1 top-6">
                  <div className="flex items-center gap-1 rounded-l-full bg-[#457B9D] px-4 py-1 text-xs font-bold text-white shadow-lg">
                    <Zap className="h-3 w-3" fill="white" />
                    Pho bien nhat
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="mb-1 text-lg font-bold text-[#1D3557]">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#457B9D]">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-[#1D3557]">
                  {plan.price === "Lien he" ? "" : ""}
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-[#457B9D]">
                    {"d"}{plan.period}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="mb-8 flex flex-col gap-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        plan.popular ? "bg-[#457B9D]/10" : "bg-[#A8DADC]/30"
                      }`}
                    >
                      <Check
                        className={`h-3 w-3 ${
                          plan.popular ? "text-[#457B9D]" : "text-[#1D3557]"
                        }`}
                      />
                    </div>
                    <span className="text-sm text-[#457B9D]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-[#1D3557] text-white shadow-lg shadow-[#1D3557]/25 hover:bg-[#457B9D] hover:shadow-xl hover:shadow-[#457B9D]/30"
                    : "border-2 border-[#A8DADC] bg-white text-[#1D3557] hover:border-[#1D3557] hover:bg-[#1D3557] hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
