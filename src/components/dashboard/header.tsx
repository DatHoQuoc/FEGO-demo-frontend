import { Bell, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-navy">Dashboard</h1>
        <p className="text-muted-text">
          Xin chào, cô Lan — Lớp 11A1 · Thứ Sáu, 06/03/2026
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-lg p-2 text-navy hover:bg-hover-row">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red" />
        </button>
        <Button className="bg-navy text-light hover:bg-blue">
          <Plus className="mr-2 h-4 w-4" />
          Giao bài mới
        </Button>
      </div>
    </div>
  )
}
