"use client"

import { useCanvas2DStore } from "@/stores/canvas2dStore"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

export default function ProjectionAnglePicker() {
  const method = useCanvas2DStore((s) => s.projectionMethod)
  const angle = useCanvas2DStore((s) => s.projectionAngle)
  const setAngle = useCanvas2DStore((s) => s.setProjectionAngle)

  const enabled = method === "custom"

  return (
    <div className="flex flex-col gap-3" style={{ opacity: enabled ? 1 : 0.4, pointerEvents: enabled ? "auto" : "none" }}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium" style={{ color: "#94a3b8" }}>
          Custom Angles
        </label>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setAngle({ theta: 30, phi: 30, distance: 10 })}
          style={{ color: "#64748b" }}
        >
          <RotateCcw className="h-3 w-3" />
          <span className="sr-only">Reset angles</span>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px]" style={{ color: "#64748b" }}>
            Theta (Y rotation)
          </span>
          <span className="text-[10px] tabular-nums" style={{ color: "#94a3b8" }}>
            {angle.theta.toFixed(0)}
          </span>
        </div>
        <Slider
          min={0}
          max={360}
          step={1}
          value={[angle.theta]}
          onValueChange={([v]) => setAngle({ ...angle, theta: v })}
          className="h-1"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px]" style={{ color: "#64748b" }}>
            Phi (X rotation)
          </span>
          <span className="text-[10px] tabular-nums" style={{ color: "#94a3b8" }}>
            {angle.phi.toFixed(0)}
          </span>
        </div>
        <Slider
          min={0}
          max={90}
          step={1}
          value={[angle.phi]}
          onValueChange={([v]) => setAngle({ ...angle, phi: v })}
          className="h-1"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px]" style={{ color: "#64748b" }}>
            Distance (perspective)
          </span>
          <span className="text-[10px] tabular-nums" style={{ color: "#94a3b8" }}>
            {(angle.distance ?? 10).toFixed(1)}
          </span>
        </div>
        <Slider
          min={2}
          max={30}
          step={0.5}
          value={[angle.distance ?? 10]}
          onValueChange={([v]) => setAngle({ ...angle, distance: v })}
          className="h-1"
        />
      </div>
    </div>
  )
}
