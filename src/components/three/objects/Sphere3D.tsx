"use client"

import { memo, useState } from "react"
import type { GeometryNode, Vector3Tuple } from "@/types/geometry3d.types"
import { useSceneStore } from "@/stores/sceneStore"

interface Sphere3DProps {
  node: GeometryNode
}

function Sphere3D({ node }: Sphere3DProps) {
  const [hovered, setHovered] = useState(false)
  const selectedIds = useSceneStore((s) => s.selectedIds)
  const selectObject = useSceneStore((s) => s.selectObject)
  const ghostIds = useSceneStore((s) => s.ghostIds)
  const globalOpacity = useSceneStore((s) => s.globalOpacity)
  const wireframeMode = useSceneStore((s) => s.wireframeMode)

  const isSelected = selectedIds.includes(node.id)
  const isGhost = ghostIds.has(node.id)
  const color = node.properties.color ?? "#ec4899"
  const center: Vector3Tuple = node.properties.center ?? node.coordinates
  const radius = node.properties.radius ?? 1

  const opacity = isGhost
    ? 0.1
    : (node.properties.opacity ?? 0.6) * globalOpacity

  return (
    <group position={center}>
      {/* Sphere mesh */}
      <mesh
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation()
          selectObject(node.id, e.nativeEvent.ctrlKey || e.nativeEvent.metaKey)
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
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={isSelected ? "#fbbf24" : color}
          transparent
          opacity={opacity}
          wireframe={wireframeMode}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
          side={2}
        />
      </mesh>

      {/* Center point marker */}
      <mesh>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={isSelected ? "#fbbf24" : "#e2e8f0"} />
      </mesh>
    </group>
  )
}

export default memo(Sphere3D)
