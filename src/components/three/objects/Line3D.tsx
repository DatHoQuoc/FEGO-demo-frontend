"use client"

import { memo, useMemo, useState } from "react"
import { Line } from "@react-three/drei"
import type { GeometryNode, Vector3Tuple } from "@/types/geometry3d.types"
import { useSceneStore } from "@/stores/sceneStore"

interface Line3DProps {
  node: GeometryNode
}

function Line3D({ node }: Line3DProps) {
  const [hovered, setHovered] = useState(false)
  const selectedIds = useSceneStore((s) => s.selectedIds)
  const selectObject = useSceneStore((s) => s.selectObject)
  const ghostIds = useSceneStore((s) => s.ghostIds)

  const isSelected = selectedIds.includes(node.id)
  const isGhost = ghostIds.has(node.id)
  const color = node.properties.color ?? "#e2e8f0"
  const dashed = node.properties.dashed ?? false

  const from: Vector3Tuple = node.properties.from ?? node.coordinates
  const to: Vector3Tuple = node.properties.to ?? [
    node.coordinates[0] + 2,
    node.coordinates[1],
    node.coordinates[2],
  ]

  const points = useMemo<Vector3Tuple[]>(() => [from, to], [from, to])

  return (
    <group>
      <Line
        points={points}
        color={isSelected ? "#fbbf24" : isGhost ? "#64748b" : color}
        lineWidth={hovered ? 3 : 2}
        dashed={dashed}
        dashSize={0.3}
        dashScale={1}
        gapSize={0.15}
        opacity={isGhost ? 0.3 : 1}
        transparent={isGhost}
        onClick={(e) => {
          e.stopPropagation()
          selectObject(
            node.id,
            e.nativeEvent.ctrlKey || e.nativeEvent.metaKey
          )
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = "auto"
        }}
      />
    </group>
  )
}

export default memo(Line3D)
