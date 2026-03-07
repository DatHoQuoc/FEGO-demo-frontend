"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function TopBar() {
  return (
    <header className="h-14 bg-[#1D3557] flex items-center justify-between px-6 shrink-0">
      {/* Left - Back Button */}
      <Button 
        asChild
        variant="ghost" 
        className="text-white hover:bg-white/10 hover:text-white gap-2"
      >
        <Link href="/moderator">
          <ArrowLeft className="h-4 w-4" />
          <span>Hàng đợi</span>
        </Link>
      </Button>

      {/* Center - Title + Metadata */}
      <div className="flex items-center gap-3">
        <h1 className="text-white font-semibold text-lg">Kiểm chứng lời giải</h1>
        <Badge 
          variant="secondary" 
          className="bg-[#457B9D] text-white border-0 font-normal"
        >
          Hình chóp · Khó · #247
        </Badge>
      </div>

      {/* Right - Pending Badge */}
      <Badge className="bg-[#A8DADC] text-[#1D3557] border-0 font-medium hover:bg-[#A8DADC]">
        12 bài đang chờ
      </Badge>
    </header>
  )
}
