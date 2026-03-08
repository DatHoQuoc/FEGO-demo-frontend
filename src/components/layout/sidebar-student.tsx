"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClipboardList, BookOpen, Users, BarChart2, LogOut, Box } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  { href: "/student", label: "Bài tập", icon: ClipboardList },
  { href: "/student/tu-hoc", label: "Tự học", icon: BookOpen },
  { href: "/student/lop-hoc", label: "Lớp học", icon: Users },
  { href: "/student/ket-qua", label: "Kết quả", icon: BarChart2 },
]

interface SidebarProps {
  activeItem?: string
}

export function Sidebar({ activeItem }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter();
  const isActive = (href: string, label: string) => {
    if (activeItem) {
      return label === activeItem
    }
    if (href === "/student") {
      return pathname === "/student"
    }
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#1D3557] flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6"
        onClick={() => router.push('/navigation')}
      >
        <Image
          src="/images/logo.svg"
          alt="VisualEdu Logo"
          width={32}
          height={32}
          className="h-10 w-10"
        />
        <span className="text-[#F1FAEE] text-lg font-semibold tracking-tight">VisualEdu</span>
      </div>

      {/* Profile */}
      <div className="px-6 py-4 border-b border-[#2E5270]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#A8DADC] flex items-center justify-center">
            <span className="text-[#1D3557] font-semibold text-sm font-mono">NBA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#F1FAEE] font-medium text-sm">Nguyễn Bảo An</span>
            <span className="text-[#A8DADC] text-xs border border-[#A8DADC] rounded-full px-2 py-0.5 mt-1 w-fit">
              Học sinh
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href, item.label)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-[#A8DADC] text-[#1D3557]"
                      : "text-[#F1FAEE] hover:bg-[#2E5270]"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-[#2E5270]">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#F1FAEE] hover:bg-[#2E5270] w-full transition-colors">
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}
