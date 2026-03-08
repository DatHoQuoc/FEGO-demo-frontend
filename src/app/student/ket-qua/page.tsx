import { Sidebar } from "@/components/layout/sidebar-student"
import { BarChart2 } from "lucide-react"

export default function KetQuaPage() {
  return (
    <div className="flex min-h-screen bg-[#F4F8FA]">
      <Sidebar />
      <main className="ml-60 flex-1 p-8">
        <div className="max-w-[480px] mx-auto mt-20">
          <div className="bg-[#F8FBFC] border border-[#B8DDE0] rounded-[10px] p-10 text-center shadow-[0_1px_3px_rgba(29,53,87,0.10)]">
            <div className="w-12 h-12 mx-auto flex items-center justify-center">
              <BarChart2 className="w-12 h-12 text-[#A8DADC]" />
            </div>
            <h1 className="text-xl font-semibold text-[#1D3557] mt-4">Kết quả của tôi</h1>
            <p className="text-sm text-[#6C7A89] mt-2">
              Lịch sử các bài đã làm và kết quả phỏng vấn
            </p>
            <span className="inline-block bg-[#F0F6F8] border border-[#B8DDE0] text-[#6C7A89] text-xs px-3 py-1 rounded-full mt-4">
              Tính năng đang phát triển
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
