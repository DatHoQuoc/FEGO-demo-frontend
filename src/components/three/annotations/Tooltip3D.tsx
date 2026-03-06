"use client"

import { memo, useEffect, useState } from "react"
import { Html } from "@react-three/drei"
import type { Vector3Tuple } from "@/types/geometry3d.types"

interface Tooltip3DProps {
  text: string
  position: Vector3Tuple
  autoHideMs?: number
}

function Tooltip3D({ text, position, autoHideMs = 2000 }: Tooltip3DProps) {
  const [visible, setVisible] = useState(true)
  const [opacity, setOpacity] = useState(0)

  // Fade in on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpacity(1))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Auto-hide
  useEffect(() => {
    if (autoHideMs <= 0) return
    const timer = setTimeout(() => {
      setOpacity(0)
      setTimeout(() => setVisible(false), 200)
    }, autoHideMs)
    return () => clearTimeout(timer)
  }, [autoHideMs])

  if (!visible) return null

  // Offset above the position
  const offsetPos: Vector3Tuple = [position[0], position[1] + 0.4, position[2]]

  return (
    <Html position={offsetPos} center style={{ pointerEvents: "none" }}>
      <div
        className="whitespace-nowrap rounded px-2 py-1 text-xs font-medium shadow-md"
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.88)",
          color: "#e2e8f0",
          opacity,
          transition: "opacity 200ms ease-in-out",
        }}
      >
        {text}
      </div>
    </Html>
  )
}

export default memo(Tooltip3D)
