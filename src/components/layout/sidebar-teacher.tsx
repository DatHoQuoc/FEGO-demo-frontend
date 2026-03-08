"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  BarChart2,
  Settings,
  LogOut,
  Box,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useSidebar } from "./sidebar-context"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teacher/giao-bai", label: "Giao bài", icon: ClipboardList },
  { href: "/teacher/danh-sach-bai", label: "Danh sách bài", icon: BookOpen },
  { href: "/teacher/bao-cao", label: "Báo cáo", icon: BarChart2 },
  { href: "/teacher/cai-dat", label: "Cài đặt", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, toggleSidebar } = useSidebar()
  const router = useRouter();
  const isActive = (href: string) => {
    if (href === "/teacher") return pathname === "/teacher"
    if (href === "/teacher/bao-cao") return pathname.startsWith("/teacher/bao-cao")
    return pathname === href
  }

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={`fixed left-0 top-0 h-screen bg-navy flex flex-col transition-[width] duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-60"
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center ${isCollapsed ? "justify-center px-3" : "gap-3 px-5"} py-6`}  
            onClick={() => router.push('/navigation')}
        >
          <Image
            src="/images/logo.svg"
            alt="VisualEdu Logo"
            width={32}
            height={32}
            className="h-10 w-10"
          />     
          <span
            className={`text-xl font-semibold text-light whitespace-nowrap transition-opacity duration-200 ${
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            VisualEdu
          </span>
        </div>

        {/* Teacher Profile */}
        <div
          className={`mx-3 mb-6 flex items-center ${
            isCollapsed ? "justify-center px-0" : "gap-3 px-3"
          } rounded-lg bg-sidebar-hover py-3`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-medium text-navy">
            NL
          </div>
          <div
            className={`flex flex-col transition-opacity duration-200 ${
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            <span className="text-sm font-medium text-light whitespace-nowrap">Nguyễn Thị Lan</span>
            <span className="rounded-full bg-teal/20 px-2 py-0.5 text-xs text-teal whitespace-nowrap">
              Giáo viên
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              const linkContent = (
                <Link
                  href={item.href}
                  className={`flex items-center ${
                    isCollapsed ? "justify-center" : "gap-3"
                  } rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? isCollapsed
                        ? "bg-teal text-navy"
                        : "bg-teal text-navy"
                      : "text-light hover:bg-sidebar-hover"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span
                    className={`transition-opacity duration-200 whitespace-nowrap ${
                      isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              )

              return (
                <li key={item.href}>
                  {isCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                      <TooltipContent side="right" className="bg-navy text-light border-sidebar-hover">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    linkContent
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3">
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex w-full items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium text-light transition-colors hover:bg-sidebar-hover">
                  <LogOut className="h-5 w-5 shrink-0" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-navy text-light border-sidebar-hover">
                Đăng xuất
              </TooltipContent>
            </Tooltip>
          ) : (
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-light transition-colors hover:bg-sidebar-hover">
              <LogOut className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap">Đăng xuất</span>
            </button>
          )}
        </div>

        {/* Toggle Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleSidebar}
              className={`absolute top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border bg-card-bg shadow-[0_1px_3px_rgba(29,53,87,0.15)] transition-colors hover:bg-teal hover:text-navy ${
                isCollapsed ? "left-[calc(100%+8px)]" : "left-[calc(100%-16px)]"
              }`}
              style={{ borderColor: "#B8DDE0" }}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-navy" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-navy" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-navy text-light border-sidebar-hover">
            <span>Ẩn menu · Ctrl+B</span>
          </TooltipContent>
        </Tooltip>
      </aside>
    </TooltipProvider>
  )
}
