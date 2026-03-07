import { AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AlertCard() {
  return (
    <div className="flex items-center justify-between rounded-[10px] border-l-4 border-l-teal bg-insight-bg p-4">
      <div className="flex items-start gap-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-blue" />
        <div>
          <h3 className="font-semibold text-navy">
            Điểm nghẽn tư duy lớp tuần này
          </h3>
          <p className="mt-1 text-sm text-muted-text">
            65% học sinh mắc lỗi tại bước: Xác định giao tuyến hai mặt phẳng
          </p>
        </div>
      </div>
      <Button className="bg-navy text-light hover:bg-blue">
        Giao bài ôn luyện ngay
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
