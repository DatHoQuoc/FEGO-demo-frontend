"use client"

import { memo, useMemo, useState } from "react"
import * as THREE from "three"
import { Html } from "@react-three/drei"
import type { GeometryNode, Vector3Tuple } from "@/types/geometry3d.types"
import { useSceneStore } from "@/stores/sceneStore"

interface Vector3DProps {
  node: GeometryNode
}

function Vector3D({ node }: Vector3DProps) {
  const [hovered, setHovered] = useState(false)
  const selectedIds = useSceneStore((s) => s.selectedIds)
  const selectObject = useSceneStore((s) => s.selectObject)
  const showLabels = useSceneStore((s) => s.showLabels)
  const ghostIds = useSceneStore((s) => s.ghostIds)

  const isSelected = selectedIds.includes(node.id)
  const isGhost = ghostIds.has(node.id)
  const color = node.properties.color ?? "#eab308"

  const origin: Vector3Tuple = node.properties.origin ?? node.coordinates
  const direction: Vector3Tuple = node.properties.direction ?? [1, 0, 0]
  const length =
    node.properties.length ??
    Math.sqrt(direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2)

  // Create arrow using a cylinder for the shaft and a cone for the head
  const { shaftLength, quaternion, endPoint } = useMemo(() => {
    const dir = new THREE.Vector3(...direction).normalize()
    const shaftLen = Math.max(0.1, length - 0.4)
    const q = new THREE.Quaternion()
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
    const end: Vector3Tuple = [
      origin[0] + dir.x * length,
      origin[1] + dir.y * length,
      origin[2] + dir.z * length,
    ]
    return { shaftLength: shaftLen, quaternion: q, endPoint: end }
  }, [origin, direction, length])

  const effectiveColor = isSelected ? "#fbbf24" : color

  return (
    <group
      position={origin}
      quaternion={quaternion}
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
    >
      {/* Shaft */}
      <mesh position={[0, shaftLength / 2, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, shaftLength, 8]} />
        <meshStandardMaterial
          color={effectiveColor}
          transparent={isGhost}
          opacity={isGhost ? 0.3 : 1}
          emissive={hovered ? effectiveColor : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* Arrow head */}
      <mesh position={[0, shaftLength + 0.2, 0]} castShadow>
        <coneGeometry args={[0.12, 0.4, 12]} />
        <meshStandardMaterial
          color={effectiveColor}
          transparent={isGhost}
          opacity={isGhost ? 0.3 : 1}
        />
      </mesh>

      {/* Label */}
      {showLabels && (
        <Html
          position={[0, shaftLength + 0.6, 0]}
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

export default memo(Vector3D)
