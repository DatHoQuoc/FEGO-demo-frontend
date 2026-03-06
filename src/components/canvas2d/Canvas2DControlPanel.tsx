"use client"

import ProjectionMethodSelector from "./controls/ProjectionMethodSelector"
import ProjectionAnglePicker from "./controls/ProjectionAnglePicker"
import CanvasToggles from "./controls/CanvasToggles"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Canvas2DControlPanel() {
  return (
    <div
      className="flex w-56 flex-col rounded-lg"
      style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b" }}
    >
      <div className="border-b px-3 py-2.5" style={{ borderColor: "#1e293b" }}>
        <h3 className="text-xs font-semibold" style={{ color: "#e2e8f0" }}>
          2D Projection
        </h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 p-3">
          <ProjectionMethodSelector />

          <div className="h-px" style={{ backgroundColor: "#1e293b" }} />

          <ProjectionAnglePicker />

          <div className="h-px" style={{ backgroundColor: "#1e293b" }} />

          <CanvasToggles />
        </div>
      </ScrollArea>
    </div>
  )
}
