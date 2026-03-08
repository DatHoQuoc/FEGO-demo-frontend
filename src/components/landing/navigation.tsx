"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowRight, Triangle } from "lucide-react"
import { useGSAP } from "@/hooks/use-gsap"
import gsap from "gsap"
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: "Tinh nang", href: "#features" },
  { label: "Demo truc tiep", href: "#demo" },
  { label: "Gia ca", href: "#pricing" },
  { label: "Cau hoi", href: "#faq" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter();

  const containerRef = useGSAP(() => {
    gsap.from(".nav-link", {
      opacity: 0,
      y: -10,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    })

    gsap.from(".nav-cta", {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      delay: 0.4,
      ease: "back.out(1.4)",
    })
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav
      ref={containerRef}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-[#A8DADC]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1D3557]">
            <Triangle className="h-4 w-4 text-white" fill="white" />
          </div>
          <span className="text-xl font-bold text-[#1D3557]">VisualEdu</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="nav-link text-sm font-medium text-[#457B9D] transition-colors hover:text-[#1D3557]"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <button 
            onClick={() => router.push('/signin')}
            className="nav-cta text-sm font-medium text-[#457B9D] transition-colors hover:text-[#1D3557]">
            Dang nhap
          </button>
          <button
            onClick={() => scrollTo("#demo")}
            className="nav-cta flex items-center gap-1.5 rounded-full bg-[#1D3557] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#1D3557]/25 transition-all hover:bg-[#457B9D] hover:shadow-xl hover:shadow-[#457B9D]/30"
          >
            Dung thu mien phi
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-[#1D3557]" />
          ) : (
            <Menu className="h-6 w-6 text-[#1D3557]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[#A8DADC] bg-white/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-[#457B9D] transition-colors hover:bg-[#A8DADC]/20 hover:text-[#1D3557]"
              >
                {link.label}
              </button>
            ))}
            <hr className="my-2 border-[#A8DADC]" />
            <button 
              onClick={() => router.push('/signin')}
              className="rounded-lg px-4 py-3 text-left text-sm font-medium text-[#457B9D]">
              Dang nhap
            </button>
            <button
              onClick={() => scrollTo("#demo")}
              className="mt-1 flex items-center justify-center gap-1.5 rounded-full bg-[#1D3557] px-5 py-3 text-sm font-semibold text-white"
            >
              Dung thu mien phi
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
