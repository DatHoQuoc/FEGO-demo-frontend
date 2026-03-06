"use client"

import { useState, useRef, useCallback } from "react"
import { ChevronDown } from "lucide-react"
import { useGSAP } from "@/hooks/use-gsap"
import gsap from "gsap"

const faqItems = [
  {
    question: "VisualEdu co phu hop voi chuong trinh hoc lop 11 khong?",
    answer:
      "Co, VisualEdu duoc thiet ke dac biet cho chuong trinh Hinh hoc Khong gian lop 11 theo chuan cua Bo Giao duc va Dao tao Viet Nam. Tat ca bai tap va ly thuyet deu theo sat sach giao khoa.",
  },
  {
    question: "AI co the giai dung bai toan hinh hoc khong?",
    answer:
      "AI cua chung toi duoc huan luyen tren hang ngan bai toan hinh hoc khong gian voi do chinh xac tren 95%. Ngoai ra, moi loi giai deu co giai thich chi tiet de ban kiem tra va hieu ro.",
  },
  {
    question: "Toi co can tai ung dung khong?",
    answer:
      "Khong, VisualEdu hoat dong hoan toan tren trinh duyet web. Ban co the truy cap tu dien thoai, may tinh bang hoac laptop ma khong can cai dat gi.",
  },
  {
    question: "Du lieu hoc tap cua toi co duoc bao mat khong?",
    answer:
      "Tuyet doi! Chung toi su dung ma hoa SSL va tuan thu cac tieu chuan bao mat quoc te. Du lieu hoc tap chi co ban moi co the truy cap.",
  },
  {
    question: "Toi co the huy goi Pro bat cu luc nao khong?",
    answer:
      "Co, ban co the huy goi bat cu luc nao. Sau khi huy, ban van duoc su dung tinh nang Pro den het chu ky thanh toan hien tai.",
  },
  {
    question: "VisualEdu co ho tro cac mon hoc khac khong?",
    answer:
      "Hien tai chung toi tap trung vao Hinh hoc Khong gian lop 11. Trong tuong lai, chung toi se mo rong sang Dai so, Giai tich va cac mon STEM khac.",
  },
]

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof faqItems)[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<SVGSVGElement>(null)

  const toggle = useCallback(() => {
    const content = contentRef.current
    const chevron = chevronRef.current
    if (!content || !chevron) return

    if (!isOpen) {
      gsap.set(content, { height: "auto" })
      const autoHeight = content.offsetHeight
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        { height: autoHeight, opacity: 1, duration: 0.4, ease: "power2.out" }
      )
      gsap.to(chevron, { rotation: 180, duration: 0.3 })
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      gsap.to(chevron, { rotation: 0, duration: 0.3 })
    }

    onToggle()
  }, [isOpen, onToggle])

  return (
    <div className="faq-item overflow-hidden rounded-2xl border border-[#A8DADC] bg-white transition-all hover:border-[#457B9D]">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-base font-semibold text-[#1D3557]">
          {item.question}
        </span>
        <ChevronDown ref={chevronRef} className="h-5 w-5 shrink-0 text-[#457B9D]" />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="px-6 pb-5 text-sm leading-relaxed text-[#457B9D]">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const containerRef = useGSAP(() => {
    gsap.fromTo(
      ".faq-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 85%",
        },
      }
    )

    gsap.fromTo(
      ".faq-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".faq-list",
          start: "top 85%",
        },
      }
    )
  }, [])

  return (
    <section
      ref={containerRef}
      id="faq"
      className="faq-section relative bg-gradient-to-br from-[#F1FAEE] to-[#A8DADC]/20 py-24"
    >
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        {/* Title */}
        <div className="faq-title mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1D3557] md:text-4xl lg:text-5xl">
            Cau hoi{" "}
            <span className="bg-gradient-to-r from-[#457B9D] to-[#1D3557] bg-clip-text text-transparent">
              thuong gap
            </span>
          </h2>
          <p className="mt-4 text-lg text-[#457B9D]">
            Nhung thac mac pho bien ve VisualEdu
          </p>
        </div>

        {/* FAQ List */}
        <div className="faq-list flex flex-col gap-3">
          {faqItems.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
