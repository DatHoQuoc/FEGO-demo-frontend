"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Student Notification Card Component
function NotificationCard({
  title,
  step,
  issue,
}: {
  title: string
  step: number
  issue: string
}) {
  return (
    <div className="bg-white border-l-4 border-l-[#457B9D] rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Bell className="h-5 w-5 text-[#457B9D] shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-bold text-[#1D3557] mb-2">
            Loi giai ban da xem vua duoc cap nhat
          </h3>
          <p className="text-sm text-[#1D3557] mb-1">
            Bai: {title}
          </p>
          <p className="text-sm text-[#6B7280] mb-4">
            Buoc {step} {issue}
          </p>
          <div className="flex gap-3">
            <Button 
              asChild
              size="sm"
              className="bg-[#1D3557] hover:bg-[#457B9D] text-white text-xs"
            >
              <Link href="/moderator/review">
                Xem ban da sua
              </Link>
            </Button>
            <Button 
              size="sm"
              variant="ghost"
              className="text-[#6B7280] hover:text-[#1D3557] text-xs"
            >
              Bo qua
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-[#1D3557] mb-6">
          Thong bao hoc sinh (Demo)
        </h1>
        <p className="text-sm text-[#457B9D] mb-6">
          Day la giao dien thong bao ma hoc sinh se nhin thay khi loi giai ho da xem duoc cap nhat boi Moderator.
        </p>
        
        <div className="space-y-4">
          <NotificationCard 
            title="Hinh chop S.ABCD — Tinh goc SB va day"
            step={3}
            issue="co loi lap luan da duoc sua"
          />
          
          <NotificationCard 
            title="Hinh lang tru tam giac — Tinh the tich"
            step={2}
            issue="thieu dieu kien da duoc bo sung"
          />
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
