"use client"

import { memo } from "react"
import { Html } from "@react-three/drei"
import { useSceneStore } from "@/stores/sceneStore"

function AxisLabel({
  position,
  text,
  color,
}: {
  position: [number, number, number]
  text: string
  color: string
}) {
  return (
    <Html position={position} center>
      <span
        className="pointer-events-none select-none text-xs font-bold"
        style={{ color }}
      >
        {text}
      </span>
    </Html>
  )
}

function SceneAxes() {
  const showAxes = useSceneStore((s) => s.showAxes)
  const showLabels = useSceneStore((s) => s.showLabels)

  if (!showAxes) return null

  return (
    <group>
      <axesHelper args={[6]} />

      {showLabels && (
        <>
          <AxisLabel position={[6.5, 0, 0]} text="X" color="#ef4444" />
          <AxisLabel position={[0, 6.5, 0]} text="Y" color="#22c55e" />
          <AxisLabel position={[0, 0, 6.5]} text="Z" color="#3b82f6" />
        </>
      )}
    </group>
  )
}

export default memo(SceneAxes)
