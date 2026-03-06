"use client"

import { useCanvas2DStore } from "@/stores/canvas2dStore"
import type { ProjectionMethod } from "@/types/geometry2d.types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const PROJECTION_OPTIONS: { value: ProjectionMethod; label: string; description: string }[] = [
  { value: "isometric", label: "Isometric", description: "Chiếu đẳng giác - 30° angles" },
  { value: "orthographic_top", label: "Top View", description: "Hình chiếu vuông góc - Từ trên" },
  { value: "orthographic_front", label: "Front View", description: "Hình chiếu vuông góc - Mặt trước" },
  { value: "orthographic_side", label: "Side View", description: "Hình chiếu vuông góc - Mặt bên" },
  { value: "perspective", label: "Perspective", description: "Phối cảnh" },
  { value: "custom", label: "Custom Angle", description: "Góc tùy chỉnh" },
]

export default function ProjectionMethodSelector() {
  const method = useCanvas2DStore((s) => s.projectionMethod)
  const setMethod = useCanvas2DStore((s) => s.setProjectionMethod)

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium" style={{ color: "#94a3b8" }}>
        Projection Method
      </label>
      <Select value={method} onValueChange={(v) => setMethod(v as ProjectionMethod)}>
        <SelectTrigger
          className="h-8 text-xs border-0"
          style={{ backgroundColor: "#1e293b", color: "#e2e8f0" }}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent style={{ backgroundColor: "#1e293b", color: "#e2e8f0", borderColor: "#334155" }}>
          {PROJECTION_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs">
              <div className="flex flex-col">
                <span>{opt.label}</span>
                <span className="text-[10px]" style={{ color: "#64748b" }}>
                  {opt.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
