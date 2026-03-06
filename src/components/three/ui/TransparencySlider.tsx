"use client"

import { useSceneStore } from "@/stores/sceneStore"
import { Slider } from "@/components/ui/slider"

export default function TransparencySlider() {
  const globalOpacity = useSceneStore((s) => s.globalOpacity)
  const setGlobalOpacity = useSceneStore((s) => s.setGlobalOpacity)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium" style={{ color: "#94a3b8" }}>
          Opacity
        </label>
        <span className="text-xs tabular-nums" style={{ color: "#64748b" }}>
          {Math.round(globalOpacity * 100)}%
        </span>
      </div>
      <Slider
        min={0}
        max={100}
        step={1}
        value={[globalOpacity * 100]}
        onValueChange={([v]) => setGlobalOpacity(v / 100)}
      />
    </div>
  )
}
