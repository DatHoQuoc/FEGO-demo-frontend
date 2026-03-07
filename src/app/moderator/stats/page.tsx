"use client"

import { QueueTopBar } from "@/components/queue/queue-top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const recentReviews = [
  { id: "#248", topic: "Hinh chop deu", result: "approved", time: "15 phut", date: "07/03/2025" },
  { id: "#246", topic: "Hinh lang tru", result: "edited", time: "22 phut", date: "07/03/2025" },
  { id: "#244", topic: "Hinh cau", result: "approved", time: "12 phut", date: "07/03/2025" },
  { id: "#242", topic: "Hinh tru", result: "edited", time: "28 phut", date: "06/03/2025" },
  { id: "#239", topic: "Hinh chop cut", result: "approved", time: "18 phut", date: "06/03/2025" },
]

const errorTypes = [
  { label: "Thieu dieu kien", count: 12, color: "bg-[#1D3557]" },
  { label: "Sai thuat ngu", count: 8, color: "bg-[#457B9D]" },
  { label: "Loi 3D", count: 5, color: "bg-[#A8DADC]" },
  { label: "Sai cong thuc", count: 3, color: "bg-[#E63946]" },
]

const maxErrorCount = Math.max(...errorTypes.map(e => e.count))

export default function StatsPage() {
  return (
    <div className="h-screen flex flex-col bg-[#F5F7FA]">
      <QueueTopBar activeTab="stats" />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            {/* Card 1: Today */}
            <Card className="border-[#A8DADC] bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#457B9D]">Hom nay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#1D3557]">5</div>
                <p className="text-xs text-[#457B9D]">bai da review</p>
                <p className="text-xs text-gray-500 mt-1">Muc tieu: 10 bai</p>
                <Progress value={50} className="h-2 mt-2 bg-[#F0F0F0] [&>[data-slot=indicator]]:bg-[#A8DADC]" />
              </CardContent>
            </Card>

            {/* Card 2: This Week */}
            <Card className="border-[#A8DADC] bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#457B9D]">Tuan nay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#1D3557]">23</span>
                  <span className="flex items-center text-xs text-[#10B981]">
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                    +12%
                  </span>
                </div>
                <p className="text-xs text-[#457B9D]">bai da review</p>
                <p className="text-xs text-gray-500 mt-1">so voi tuan truoc</p>
              </CardContent>
            </Card>

            {/* Card 3: Average Time */}
            <Card className="border-[#A8DADC] bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#457B9D]">Thoi gian TB</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#457B9D]">18</div>
                <p className="text-xs text-[#457B9D]">phut moi bai</p>
                <p className="text-xs text-[#10B981] mt-1">Nhanh hon TB 4 phut</p>
              </CardContent>
            </Card>

            {/* Card 4: Approval Rate */}
            <Card className="border-[#A8DADC] bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#457B9D]">Ti le phe duyet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#1D3557]">68%</div>
                <p className="text-xs text-[#457B9D]">approve thang</p>
                <div className="flex gap-1 mt-2">
                  <div className="h-2 bg-[#A8DADC] rounded-l" style={{ width: '68%' }} />
                  <div className="h-2 bg-[#F59E0B] rounded-r" style={{ width: '32%' }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-[#457B9D]">68% OK</span>
                  <span className="text-xs text-[#F59E0B]">32% sua</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Section - Error Types */}
          <Card className="border-[#A8DADC] bg-white">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-[#1D3557]">Dang loi hay phat hien nhat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {errorTypes.map((error) => (
                  <div key={error.label} className="flex items-center gap-4">
                    <span className="text-sm text-[#1D3557] w-36">{error.label}</span>
                    <div className="flex-1 h-6 bg-[#F0F0F0] rounded overflow-hidden">
                      <div 
                        className={`h-full ${error.color} rounded transition-all`}
                        style={{ width: `${(error.count / maxErrorCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#1D3557] w-16">{error.count} lan</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bottom Section - Recent Reviews */}
          <Card className="border-[#A8DADC] bg-white">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-[#1D3557]">Lich su review gan day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-[#A8DADC]">
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-4 px-4 py-3 bg-[#F5F7FA] border-b border-[#A8DADC]">
                  <span className="text-xs font-semibold text-[#457B9D] uppercase">Ma bai</span>
                  <span className="text-xs font-semibold text-[#457B9D] uppercase">Chu de</span>
                  <span className="text-xs font-semibold text-[#457B9D] uppercase">Ket qua</span>
                  <span className="text-xs font-semibold text-[#457B9D] uppercase">Thoi gian xu ly</span>
                  <span className="text-xs font-semibold text-[#457B9D] uppercase">Ngay</span>
                </div>

                {/* Table Rows */}
                {recentReviews.map((review) => (
                  <div 
                    key={review.id}
                    className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-[#A8DADC] last:border-b-0 hover:bg-[#EEF4F7] transition-colors"
                  >
                    <span className="text-sm font-medium text-[#1D3557]">{review.id}</span>
                    <span className="text-sm text-[#1D3557]">{review.topic}</span>
                    <div>
                      <Badge className={`border-0 ${
                        review.result === "approved" 
                          ? "bg-[#D1FAE5] text-[#065F46]" 
                          : "bg-[#FEF3C7] text-[#92400E]"
                      }`}>
                        {review.result === "approved" ? "Phe duyet" : "Da sua"}
                      </Badge>
                    </div>
                    <span className="text-sm text-[#457B9D]">{review.time}</span>
                    <span className="text-sm text-[#457B9D]">{review.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
