"use client"

import { Circle, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Solution Badge Component
function SolutionBadge({
  variant,
}: {
  variant: "unverified" | "reviewing" | "verified"
}) {
  const config = {
    unverified: {
      bg: "bg-[#F3F4F6]",
      text: "text-[#6B7280]",
      icon: <Circle className="h-4 w-4" />,
      label: "AI · Chua kiem chung — Dung nhu tai lieu tham khao",
    },
    reviewing: {
      bg: "bg-[#FEF3C7]",
      text: "text-[#92400E]",
      icon: <Clock className="h-4 w-4" />,
      label: "Dang kiem chung — Moderator dang review",
    },
    verified: {
      bg: "bg-[#D1FAE5]",
      text: "text-[#065F46]",
      icon: <Check className="h-4 w-4" />,
      label: "Da kiem chung · Giao vien Toan THPT · 15/03/2025",
    },
  }

  const { bg, text, icon, label } = config[variant]

  return (
    <div className={`${bg} ${text} px-4 py-3 rounded-t-lg flex items-center gap-2`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

// Mock Solution Card
function MockSolutionCard({ variant }: { variant: "unverified" | "reviewing" | "verified" }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#A8DADC] overflow-hidden">
      <SolutionBadge variant={variant} />
      <div className="p-4">
        <p className="text-sm text-[#6B7280] mb-2">Buoc 1: Ve hinh, xac dinh SA vuong goc ABCD</p>
        <p className="text-sm text-[#1D3557]">
          Ve hinh chop S.ABCD voi day ABCD la hinh vuong canh a...
        </p>
        <div className="h-px bg-[#A8DADC] my-3" />
        <p className="text-xs text-[#457B9D]">
          [Noi dung loi giai tiep tuc...]
        </p>
      </div>
    </div>
  )
}

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold text-[#1D3557] mb-6">
          Badge trang thai loi giai (Demo)
        </h1>
        <p className="text-sm text-[#457B9D] mb-8">
          Day la 3 trang thai badge xuat hien o dau moi loi giai AI, hien thi cho hoc sinh biet muc do tin cay cua loi giai.
        </p>
        
        <div className="space-y-8">
          {/* Unverified */}
          <div>
            <h2 className="text-sm font-semibold text-[#1D3557] mb-3 uppercase tracking-wide">
              1. Chua kiem chung (Unverified)
            </h2>
            <MockSolutionCard variant="unverified" />
          </div>

          {/* Reviewing */}
          <div>
            <h2 className="text-sm font-semibold text-[#1D3557] mb-3 uppercase tracking-wide">
              2. Dang kiem chung (Being reviewed)
            </h2>
            <MockSolutionCard variant="reviewing" />
          </div>

          {/* Verified */}
          <div>
            <h2 className="text-sm font-semibold text-[#1D3557] mb-3 uppercase tracking-wide">
              3. Da kiem chung (Verified)
            </h2>
            <MockSolutionCard variant="verified" />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#A8DADC]">
          <Button asChild variant="outline" className="border-[#457B9D] text-[#457B9D]">
            <Link href="/moderator">Quay lai Queue Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
