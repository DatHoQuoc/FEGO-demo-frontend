"use client"

import React from "react"

import { useSceneStore } from "@/stores/sceneStore"
import { Button } from "@/components/ui/button"
import { Columns2, Square } from "lucide-react"
import type { ViewportMode } from "@/types/geometry3d.types"

const modes: { value: ViewportMode; label: string; icon: React.ReactNode }[] = [
  { value: "single", label: "Single", icon: <Square className="h-4 w-4" /> },
  { value: "quad", label: "Quad", icon: <Columns2 className="h-4 w-4" /> },
]

export default function ViewportSelector() {
  const viewportMode = useSceneStore((s) => s.viewportMode)
  const setViewportMode = useSceneStore((s) => s.setViewportMode)

  return (
    <div className="flex gap-1">
      {modes.map((m) => (
        <Button
          key={m.value}
          variant={viewportMode === m.value ? "default" : "outline"}
          size="sm"
          className="h-8 gap-1.5 text-xs"
          onClick={() => setViewportMode(m.value)}
        >
          {m.icon}
          <span className="sr-only sm:not-sr-only">{m.label}</span>
        </Button>
      ))}
    </div>
  )
}
