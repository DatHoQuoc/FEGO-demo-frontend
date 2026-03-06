"use client"

import { Check } from "lucide-react"
import { useGSAP } from "@/hooks/use-gsap"
import gsap from "gsap"

const benefits = [
  {
    title: "Hieu bai nhanh hon 3 lan",
    description:
      "Truc quan hoa 3D giup hoc sinh nam bat hinh hoc khong gian truc quan, khong con phai tuong tuong truu tuong.",
    points: [
      "Xoay hinh 360 do tu moi goc nhin",
      "Cat mat phang de thay thiet dien",
      "Danh dau diem, duong, mat phang",
    ],
    image: (
      <div className="flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#A8DADC]/30 to-[#F1FAEE] p-8">
        <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
          <polygon
            points="120,20 200,160 40,160"
            stroke="#1D3557"
            strokeWidth="2.5"
            fill="#1D355720"
          />
          <polygon
            points="120,20 180,100 60,100"
            stroke="#457B9D"
            strokeWidth="1.5"
            fill="#457B9D10"
            strokeDasharray="6 3"
          />
          <line
            x1="120"
            y1="20"
            x2="120"
            y2="160"
            stroke="#457B9D"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle cx="120" cy="20" r="5" fill="#1D3557" />
          <circle cx="200" cy="160" r="5" fill="#1D3557" />
          <circle cx="40" cy="160" r="5" fill="#1D3557" />
          <circle cx="120" cy="160" r="4" fill="#457B9D" />
          <text x="110" y="14" fill="#1D3557" fontSize="14" fontWeight="bold">
            S
          </text>
          <text x="205" y="165" fill="#1D3557" fontSize="14" fontWeight="bold">
            B
          </text>
          <text x="22" y="165" fill="#1D3557" fontSize="14" fontWeight="bold">
            A
          </text>
          <text x="110" y="178" fill="#457B9D" fontSize="14" fontWeight="bold">
            H
          </text>
        </svg>
      </div>
    ),
  },
  {
    title: "Loi giai chi tiet tung buoc",
    description:
      "Khong chi cho dap an - AI giai thich ly do va phuong phap de ban thuc su hieu bai.",
    points: [
      "Phan tich de bai tu dong",
      "Huong dan tung buoc mot",
      "Goi y phuong phap giai thay the",
    ],
    image: (
      <div className="flex h-full flex-col items-start justify-center gap-3 rounded-2xl bg-gradient-to-br from-[#F1FAEE] to-[#A8DADC]/20 p-8">
        <div className="w-full rounded-xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#1D3557]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1D3557] text-[10px] text-white">
              1
            </span>
            Buoc 1
          </div>
          <p className="text-xs text-[#457B9D]">
            Xac dinh he truc toa do Oxyz voi A la goc toa do...
          </p>
        </div>
        <div className="w-full rounded-xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#1D3557]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1D3557] text-[10px] text-white">
              2
            </span>
            Buoc 2
          </div>
          <p className="text-xs text-[#457B9D]">
            Tim phuong trinh mat phang (SBC)...
          </p>
        </div>
        <div className="w-full rounded-xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#457B9D]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D] text-[10px] text-white">
              3
            </span>
            Buoc 3
          </div>
          <p className="text-xs text-[#457B9D]">
            Ap dung cong thuc khoang cach: d = |ax + by + cz + d| / sqrt(...)
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Hoc moi luc, moi noi",
    description:
      "Tuong thich tren moi thiet bi - dien thoai, may tinh bang, laptop. Hoc bat cu khi nao ban muon.",
    points: [
      "Tuong thich moi thiet bi",
      "Luu tien trinh tu dong",
      "Hoc offline voi bai da tai",
    ],
    image: (
      <div className="flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#A8DADC]/30 to-[#F1FAEE] p-8">
        <div className="relative">
          {/* Phone mockup */}
          <div className="h-48 w-24 rounded-2xl border-2 border-[#1D3557] bg-white p-2 shadow-xl">
            <div className="h-full rounded-xl bg-gradient-to-b from-[#F1FAEE] to-[#A8DADC]/20 p-2">
              <div className="mb-2 h-2 w-12 rounded-full bg-[#1D3557]/30" />
              <div className="mb-1 h-1.5 w-full rounded-full bg-[#457B9D]/20" />
              <div className="mb-1 h-1.5 w-3/4 rounded-full bg-[#457B9D]/20" />
              <div className="mt-3 h-16 rounded-lg bg-gradient-to-br from-[#A8DADC]/50 to-[#F1FAEE]" />
            </div>
          </div>
          {/* Tablet mockup offset */}
          <div className="absolute -right-16 top-4 h-36 w-48 rounded-xl border-2 border-[#457B9D] bg-white p-2 shadow-xl">
            <div className="h-full rounded-lg bg-gradient-to-b from-[#F1FAEE] to-[#A8DADC]/20 p-2">
              <div className="mb-2 h-2 w-20 rounded-full bg-[#1D3557]/30" />
              <div className="flex gap-2">
                <div className="h-20 flex-1 rounded-lg bg-gradient-to-br from-[#A8DADC]/40 to-[#F1FAEE]" />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="h-1.5 w-full rounded-full bg-[#457B9D]/20" />
                  <div className="h-1.5 w-3/4 rounded-full bg-[#457B9D]/20" />
                  <div className="h-1.5 w-5/6 rounded-full bg-[#457B9D]/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

export function BenefitsShowcase() {
  const containerRef = useGSAP(() => {
    gsap.from(".benefits-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".benefits-section",
        start: "top 85%",
      },
    })

    document.querySelectorAll(".benefit-row").forEach((row, i) => {
      const direction = i % 2 === 0 ? -50 : 50

      gsap.from(row.querySelector(".benefit-text"), {
        opacity: 0,
        x: direction,
        duration: 1,
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
        },
      })

      gsap.from(row.querySelector(".benefit-image"), {
        opacity: 0,
        x: -direction,
        duration: 1,
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
        },
      })
    })
  }, [])

  return (
    <section
      ref={containerRef}
      className="benefits-section relative bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Title */}
        <div className="benefits-title mb-20 text-center">
          <h2 className="text-3xl font-bold text-[#1D3557] md:text-4xl lg:text-5xl">
            Loi ich{" "}
            <span className="bg-gradient-to-r from-[#457B9D] to-[#1D3557] bg-clip-text text-transparent">
              vuot troi
            </span>
          </h2>
          <p className="mt-4 text-lg text-[#457B9D]">
            Nhung gi khien VisualEdu khac biet hoan toan
          </p>
        </div>

        {/* Benefits Rows */}
        <div className="flex flex-col gap-20">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className={`benefit-row flex flex-col items-center gap-12 lg:flex-row ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text */}
              <div className="benefit-text flex-1">
                <h3 className="mb-4 text-2xl font-bold text-[#1D3557] md:text-3xl">
                  {benefit.title}
                </h3>
                <p className="mb-6 text-base leading-relaxed text-[#457B9D]">
                  {benefit.description}
                </p>
                <ul className="flex flex-col gap-3">
                  {benefit.points.map((point, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A8DADC]/30">
                        <Check className="h-3.5 w-3.5 text-[#1D3557]" />
                      </div>
                      <span className="text-sm text-[#1D3557]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="benefit-image h-[300px] w-full flex-1 lg:h-[350px]">
                {benefit.image}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
