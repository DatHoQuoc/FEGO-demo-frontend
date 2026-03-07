"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BaoCaoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isClassReport = pathname === "/teacher/bao-cao" || pathname === "/teacher/bao-cao/lop"
  const isIndividualReport = pathname === "/teacher/bao-cao/ca-nhan"

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        <Link
          href="/teacher/bao-cao"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            isClassReport
              ? "bg-navy text-light"
              : "border border-border-color text-navy hover:bg-hover-row"
          }`}
        >
          Báo cáo lớp
        </Link>
        <Link
          href="/teacher/bao-cao/ca-nhan"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            isIndividualReport
              ? "bg-navy text-light"
              : "border border-border-color text-navy hover:bg-hover-row"
          }`}
        >
          Báo cáo cá nhân
        </Link>
      </div>

      {children}
    </div>
  )
}
