"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useGSAP } from "@/hooks/use-gsap"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"

const testimonials = [
  {
    name: "Nguyen Minh Anh",
    role: "Hoc sinh lop 11, THPT Chu Van An",
    avatar: "MA",
    content:
      "Truoc day minh rat so hinh hoc khong gian vi khong tuong tuong duoc. Voi VisualEdu, minh co the xoay hinh 3D va hieu bai toan ngay lap tuc. Diem hinh hoc cua minh tang tu 5 len 8!",
    rating: 5,
    color: "from-[#1D3557] to-[#457B9D]",
  },
  {
    name: "Tran Duc Thanh",
    role: "Hoc sinh lop 11, THPT Le Hong Phong",
    avatar: "DT",
    content:
      "AI giai thich tung buoc mot, rat de hieu. Minh thich nhat la tinh nang hoi dap - bat cu cau hoi nao cung duoc tra loi ngay. Nhu co gia su rieng vay!",
    rating: 5,
    color: "from-[#457B9D] to-[#A8DADC]",
  },
  {
    name: "Co Pham Thu Ha",
    role: "Giao vien Toan, THPT Nguyen Trai",
    avatar: "TH",
    content:
      "Toi su dung VisualEdu trong gio day va thay hoc sinh hao hung hon nhieu. Cong cu truc quan hoa 3D giup cac em hieu duoc nhung khai niem truong tuong tu duoc.",
    rating: 5,
    color: "from-[#A8DADC] to-[#1D3557]",
  },
  {
    name: "Le Hoang Nam",
    role: "Hoc sinh lop 11, THPT Kim Lien",
    avatar: "HN",
    content:
      "Ung dung rat de su dung, giao dien dep. Minh hoc moi ngay tren dien thoai, rat tien loi. Da gioi thieu cho ca lop cung dung!",
    rating: 5,
    color: "from-[#A8DADC] to-[#1D3557]",
  },
  {
    name: "Pham Quynh Trang",
    role: "Hoc sinh lop 11, THPT Amsterdam",
    avatar: "QT",
    content:
      "Minh da thu nhieu app hoc toan nhung VisualEdu la tot nhat. Hinh 3D rat muot, AI tra loi nhanh va chinh xac. Rat dang dong tien!",
    rating: 5,
    color: "from-[#1D3557] to-[#A8DADC]",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<gsap.core.Timeline | null>(null)
  const draggableRef = useRef<Draggable[] | null>(null)

  const containerRef = useGSAP(() => {
    gsap.fromTo(
      ".testimonials-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 85%",
        },
      }
    )

    // Animate the entire carousel container instead of individual cards
    gsap.fromTo(
      ".testimonials-carousel-container",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".testimonials-carousel-container",
          start: "top 85%",
        },
      }
    )
  }, [])

  const goToSlide = useCallback((index: number) => {
    if (!carouselRef.current) return
    const cardWidth = carouselRef.current.offsetWidth
    gsap.to(carouselRef.current, {
      x: -index * cardWidth,
      duration: 0.6,
      ease: "power2.inOut",
    })
    setCurrent(index)
  }, [])

  const prev = useCallback(() => {
    const newIndex = current === 0 ? testimonials.length - 1 : current - 1
    goToSlide(newIndex)
  }, [current, goToSlide])

  const next = useCallback(() => {
    const newIndex = current === testimonials.length - 1 ? 0 : current + 1
    goToSlide(newIndex)
  }, [current, goToSlide])

  // Autoplay
  useEffect(() => {
    if (isDragging) return

    const interval = setInterval(() => {
      setCurrent((prev) => {
        const newIndex = prev === testimonials.length - 1 ? 0 : prev + 1
        if (carouselRef.current) {
          const cardWidth = carouselRef.current.offsetWidth
          gsap.to(carouselRef.current, {
            x: -newIndex * cardWidth,
            duration: 0.6,
            ease: "power2.inOut",
          })
        }
        return newIndex
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [isDragging])

  // Draggable setup
  useEffect(() => {
    if (typeof window === "undefined" || !carouselRef.current) return

    gsap.registerPlugin(Draggable)

    const carousel = carouselRef.current
    const cardWidth = carousel.offsetWidth

    draggableRef.current = Draggable.create(carousel, {
      type: "x",
      bounds: {
        minX: -(testimonials.length - 1) * cardWidth,
        maxX: 0,
      },
      inertia: true,
      onDragStart: () => {
        setIsDragging(true)
      },
      onDragEnd: function () {
        const x = this.endX
        const newIndex = Math.round(-x / cardWidth)
        const clampedIndex = Math.max(
          0,
          Math.min(newIndex, testimonials.length - 1)
        )
        goToSlide(clampedIndex)
        setTimeout(() => setIsDragging(false), 100)
      },
    })

    return () => {
      if (draggableRef.current) {
        draggableRef.current.forEach((d) => d.kill())
      }
    }
  }, [goToSlide])

  return (
    <section
      ref={containerRef}
      className="testimonials-section relative bg-gradient-to-br from-[#F1FAEE] to-[#A8DADC]/20 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Title */}
        <div className="testimonials-title mb-16 text-center">
          <h2 className="text-3xl font-bold text-[#1D3557] md:text-4xl lg:text-5xl">
            Hoc sinh va giao vien{" "}
            <span className="bg-gradient-to-r from-[#457B9D] to-[#1D3557] bg-clip-text text-transparent">
              noi gi
            </span>
          </h2>
          <p className="mt-4 text-lg text-[#457B9D]">
            Hang nghin nguoi da tin tuong su dung VisualEdu
          </p>
        </div>

        {/* Carousel Container */}
        <div className="testimonials-carousel-container relative overflow-hidden">
          {/* Navigation Buttons - Desktop */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#A8DADC] bg-white/90 p-3 text-[#457B9D] shadow-lg backdrop-blur-sm transition-all hover:bg-[#F1FAEE] hover:text-[#1D3557] md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#A8DADC] bg-white/90 p-3 text-[#457B9D] shadow-lg backdrop-blur-sm transition-all hover:bg-[#F1FAEE] hover:text-[#1D3557] md:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="testimonial-carousel flex cursor-grab active:cursor-grabbing"
            style={{ width: `${testimonials.length * 100}%` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card w-full shrink-0 px-4 md:px-12"
                style={{ width: `${100 / testimonials.length}%` }}
              >
                <div className="mx-auto max-w-2xl rounded-3xl border border-[#A8DADC] bg-white p-8 shadow-xl transition-all md:p-10">
                  <Quote className="mb-6 h-10 w-10 text-[#A8DADC]" />
                  <p className="mb-8 text-lg leading-relaxed text-[#457B9D] md:text-xl">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-lg font-bold text-white shadow-lg`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[#1D3557]">
                        {t.name}
                      </p>
                      <p className="text-sm text-[#457B9D]">{t.role}</p>
                      <div className="mt-1.5 flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star
                            key={j}
                            className="h-4 w-4 text-[#457B9D]"
                            fill="#457B9D"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-[#1D3557]"
                  : "w-2.5 bg-[#A8DADC] hover:bg-[#457B9D]"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
          <button
            onClick={prev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#A8DADC] bg-white text-[#457B9D] shadow-md transition-colors hover:bg-[#F1FAEE] hover:text-[#1D3557]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#A8DADC] bg-white text-[#457B9D] shadow-md transition-colors hover:bg-[#F1FAEE] hover:text-[#1D3557]"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
