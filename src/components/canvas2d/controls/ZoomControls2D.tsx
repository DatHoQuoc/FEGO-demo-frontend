"use client"

import { useCanvas2DStore } from "@/stores/canvas2dStore"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Home } from "lucide-react"

export default function ZoomControls2D() {
  const zoom = useCanvas2DStore((s) => s.viewport.zoom)
  const zoomIn = useCanvas2DStore((s) => s.zoomIn)
  const zoomOut = useCanvas2DStore((s) => s.zoomOut)
  const reset = useCanvas2DStore((s) => s.resetViewport)

  return (
    <div
      className="flex items-center gap-1 rounded-md p-1"
      style={{ backgroundColor: "#1e293b" }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={zoomOut}
        style={{ color: "#94a3b8" }}
      >
        <ZoomOut className="h-3.5 w-3.5" />
        <span className="sr-only">Zoom out</span>
      </Button>
      <span
        className="min-w-[40px] text-center text-xs tabular-nums"
        style={{ color: "#e2e8f0" }}
      >
        {(zoom * 100).toFixed(0)}%
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={zoomIn}
        style={{ color: "#94a3b8" }}
      >
        <ZoomIn className="h-3.5 w-3.5" />
        <span className="sr-only">Zoom in</span>
      </Button>
      <div className="mx-0.5 h-4 w-px" style={{ backgroundColor: "#334155" }} />
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={reset}
        style={{ color: "#94a3b8" }}
      >
        <Home className="h-3.5 w-3.5" />
        <span className="sr-only">Reset view</span>
      </Button>
    </div>
  )
}
