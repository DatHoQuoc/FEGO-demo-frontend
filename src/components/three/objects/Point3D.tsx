"use client"

import { memo, useRef, useState } from "react"
import { Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import type { GeometryNode } from "@/types/geometry3d.types"
import { useSceneStore } from "@/stores/sceneStore"

interface Point3DProps {
  node: GeometryNode
}

function Point3D({ node }: Point3DProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const selectedIds = useSceneStore((s) => s.selectedIds)
  const selectObject = useSceneStore((s) => s.selectObject)
  const showLabels = useSceneStore((s) => s.showLabels)
  const ghostIds = useSceneStore((s) => s.ghostIds)

  const isSelected = selectedIds.includes(node.id)
  const isGhost = ghostIds.has(node.id)
  const color = node.properties.color ?? "#4a9eff"

  useFrame(() => {
    if (!meshRef.current) return
    const targetScale = hovered ? 1.4 : 1
    meshRef.current.scale.lerp(
      { x: targetScale, y: targetScale, z: targetScale } as any,
      0.15
    )
  })

  return (
    <group position={node.coordinates}>
      <mesh
        ref={meshRef}
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
        castShadow
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? "#fbbf24" : color}
          emissive={isSelected ? "#fbbf24" : hovered ? color : "#000000"}
          emissiveIntensity={isSelected ? 0.6 : hovered ? 0.3 : 0}
          transparent={isGhost}
          opacity={isGhost ? 0.3 : 1}
        />
      </mesh>

      {showLabels && (
        <Html
          position={[0, 0.35, 0]}
          center
          style={{ pointerEvents: "none" }}
        >
          <span
            className="pointer-events-none select-none whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-semibold"
            style={{
              color: "#f8fafc",
              backgroundColor: "rgba(15, 23, 42, 0.75)",
            }}
          >
            {node.name}
          </span>
        </Html>
      )}
    </group>
  )
}

export default memo(Point3D)
