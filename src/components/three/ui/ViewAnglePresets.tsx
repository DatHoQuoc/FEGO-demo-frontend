"use client"

import { useSceneStore } from "@/stores/sceneStore"
import { Button } from "@/components/ui/button"
import type { ViewPreset } from "@/types/geometry3d.types"

const presets: { value: ViewPreset; label: string; shortcut: string }[] = [
  { value: "front", label: "Front", shortcut: "1" },
  { value: "side", label: "Side", shortcut: "3" },
  { value: "top", label: "Top", shortcut: "7" },
  { value: "isometric", label: "Iso", shortcut: "5" },
]

export default function ViewAnglePresets() {
  const setViewPreset = useSceneStore((s) => s.setViewPreset)

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium" style={{ color: "#94a3b8" }}>
        View Presets
      </label>
      <div className="grid grid-cols-2 gap-1">
        {presets.map((p) => (
          <Button
            key={p.value}
            variant="outline"
            size="sm"
            className="h-7 text-xs bg-transparent"
            onClick={() => setViewPreset(p.value)}
          >
            {p.label}
            <kbd
              className="ml-auto rounded px-1 text-[10px]"
              style={{ backgroundColor: "#1e293b", color: "#64748b" }}
            >
              {p.shortcut}
            </kbd>
          </Button>
        ))}
      </div>
    </div>
  )
}
