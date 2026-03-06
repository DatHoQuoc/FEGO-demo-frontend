"use client"

import { useRef } from "react"
import type { GeometryGraph } from "@/types/geometry3d.types"
import Canvas2D from "./Canvas2D"
import Canvas2DControlPanel from "./Canvas2DControlPanel"
import DrawingToolbar from "./drawing/DrawingToolbar"
import ZoomControls2D from "./controls/ZoomControls2D"
import LaTeXExporter from "./export/LaTeXExporter"
import PNGExporter from "./export/PNGExporter"

interface Viewer2DProps {
  graph3D: GeometryGraph
  className?: string
}

export default function Viewer2D({ graph3D, className }: Viewer2DProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  return (
    <div className={`flex h-full gap-2 ${className ?? ""}`}>
      {/* Left: Drawing toolbar */}
      <div className="flex flex-col items-center justify-center">
        <DrawingToolbar />
      </div>

      {/* Center: Canvas */}
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-lg" style={{ border: "1px solid #1e293b" }}>
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-3 py-1.5"
          style={{ backgroundColor: "#0f172a", borderBottom: "1px solid #1e293b" }}
        >
          <span className="text-xs font-medium" style={{ color: "#94a3b8" }}>
            2D Projection View
          </span>
          <div className="flex items-center gap-1">
            <LaTeXExporter />
            <PNGExporter svgRef={svgRef} />
          </div>
        </div>

        {/* Canvas area */}
        <div className="flex flex-1 items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
          <Canvas2D graph3D={graph3D} width={600} height={500} externalSvgRef={svgRef} />
        </div>

        {/* Bottom bar: zoom controls */}
        <div
          className="flex items-center justify-center px-3 py-1.5"
          style={{ backgroundColor: "#0f172a", borderTop: "1px solid #1e293b" }}
        >
          <ZoomControls2D />
        </div>
      </div>

      {/* Right: Control panel */}
      <Canvas2DControlPanel />
    </div>
  )
}
