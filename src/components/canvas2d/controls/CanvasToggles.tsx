"use client"

import React from "react"

import { useCanvas2DStore } from "@/stores/canvas2dStore"
import { Switch } from "@/components/ui/switch"
import { Link, Unlink, Grid3x3, Projector } from "lucide-react"

export default function CanvasToggles() {
  const syncWith3D = useCanvas2DStore((s) => s.syncWith3D)
  const setSyncWith3D = useCanvas2DStore((s) => s.setSyncWith3D)
  const showProjectionLines = useCanvas2DStore((s) => s.showProjectionLines)
  const setShowProjectionLines = useCanvas2DStore((s) => s.setShowProjectionLines)
  const snapToGrid = useCanvas2DStore((s) => s.snapToGrid)
  const setSnapToGrid = useCanvas2DStore((s) => s.setSnapToGrid)

  return (
    <div className="flex flex-col gap-3">
      <ToggleRow
        icon={syncWith3D ? <Link className="h-3.5 w-3.5" /> : <Unlink className="h-3.5 w-3.5" />}
        label="Sync with 3D"
        sublabel="Dong bo voi 3D"
        checked={syncWith3D}
        onChange={setSyncWith3D}
      />
      <ToggleRow
        icon={<Projector className="h-3.5 w-3.5" />}
        label="Projection Lines"
        sublabel="Hien duong chieu"
        checked={showProjectionLines}
        onChange={setShowProjectionLines}
      />
      <ToggleRow
        icon={<Grid3x3 className="h-3.5 w-3.5" />}
        label="Snap to Grid"
        sublabel="Dinh luoi"
        checked={snapToGrid}
        onChange={setSnapToGrid}
      />
    </div>
  )
}

function ToggleRow({
  icon,
  label,
  sublabel,
  checked,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  sublabel: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span style={{ color: "#64748b" }}>{icon}</span>
        <div className="flex flex-col">
          <span className="text-xs" style={{ color: "#e2e8f0" }}>
            {label}
          </span>
          <span className="text-[10px]" style={{ color: "#475569" }}>
            {sublabel}
          </span>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
