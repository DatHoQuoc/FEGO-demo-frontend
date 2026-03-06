"use client"

import { memo } from "react"
import { Html } from "@react-three/drei"
import type { Vector3Tuple } from "@/types/geometry3d.types"

interface MeasurementLabelProps {
  value: number
  unit: "units" | "degrees"
  position: Vector3Tuple
  type: "distance" | "angle"
  onDismiss?: () => void
}

function MeasurementLabel({
  value,
  unit,
  position,
  type,
  onDismiss,
}: MeasurementLabelProps) {
  const formatted =
    type === "angle"
      ? `${value.toFixed(1)}\u00B0`
      : `${value.toFixed(2)} ${unit}`

  return (
    <Html position={position} center>
      <div
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-bold shadow-lg"
        style={{
          backgroundColor: "rgba(234, 179, 8, 0.9)",
          color: "#0f172a",
        }}
      >
        <span>{type === "angle" ? "\u2220" : "d ="}</span>
        <span>{formatted}</span>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-1 rounded-full p-0.5 text-xs transition-colors hover:bg-black/20"
            type="button"
          >
            x
          </button>
        )}
      </div>
    </Html>
  )
}

export default memo(MeasurementLabel)
