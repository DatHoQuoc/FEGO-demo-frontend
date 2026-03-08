"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  LogOut,
  Box,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation';

const navItems = [
  { href: "/staff", label: "Dashboard", icon: LayoutDashboard },
  { href: "/staff/users", label: "Users & Subscription", icon: Users },
  { href: "/staff/schools", label: "Truong & To chuc", icon: Building2 },
  { href: "/staff/revenue", label: "Doanh thu", icon: DollarSign },
  { href: "/staff/acquisition", label: "Acquisition", icon: TrendingUp },
  { href: "/staff/operations", label: "Van hanh noi dung", icon: ShieldCheck },
]

export function StaffSidebar() {
  const pathname = usePathname()
  const router = useRouter();
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-navy flex flex-col text-fg-light">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal">
          <Box className="h-5 w-5 text-navy" onClick={() => {
            router.push('/navigation');
          }}/>
        </div>
        <span className="text-lg font-semibold text-fg-light">VisualEdu</span>
      </div>

      {/* Staff Profile */}
      <div className="flex flex-col items-center gap-2 border-b border-sidebar-border px-5 pb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-navy font-semibold text-sm">
          NMT
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-fg-light">Nguyen Minh Tuan</p>
          <span className="mt-1 inline-block rounded-full border border-teal px-2.5 py-0.5 text-xs text-teal">
            Staff
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-teal text-navy"
                      : "text-fg-light hover:bg-navy-light"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-border px-3 py-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-fg-light hover:bg-navy-light transition-colors">
          <LogOut className="h-5 w-5" />
          Dang xuat
        </button>
      </div>
    </aside>
  )
}
