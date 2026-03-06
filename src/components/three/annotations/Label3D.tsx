"use client"

import { memo } from "react"
import { Html } from "@react-three/drei"
import type { Vector3Tuple } from "@/types/geometry3d.types"

interface Label3DProps {
  text: string
  position: Vector3Tuple
  fontSize?: number
  color?: string
  backgroundColor?: string
}

function Label3D({
  text,
  position,
  color = "#f8fafc",
  backgroundColor = "rgba(15, 23, 42, 0.75)",
}: Label3DProps) {
  return (
    <Html position={position} center style={{ pointerEvents: "none" }}>
      <span
        className="pointer-events-none select-none whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-semibold"
        style={{ color, backgroundColor }}
      >
        {text}
      </span>
    </Html>
  )
}

export default memo(Label3D)
