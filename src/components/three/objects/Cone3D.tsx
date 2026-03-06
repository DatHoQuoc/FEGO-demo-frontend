"use client"

import { memo, useMemo, useState } from "react"
import * as THREE from "three"
import type { GeometryNode, Vector3Tuple } from "@/types/geometry3d.types"
import { useSceneStore } from "@/stores/sceneStore"

interface Cone3DProps {
  node: GeometryNode
}

function Cone3D({ node }: Cone3DProps) {
  const [hovered, setHovered] = useState(false)
  const selectedIds = useSceneStore((s) => s.selectedIds)
  const selectObject = useSceneStore((s) => s.selectObject)
  const ghostIds = useSceneStore((s) => s.ghostIds)
  const globalOpacity = useSceneStore((s) => s.globalOpacity)
  const wireframeMode = useSceneStore((s) => s.wireframeMode)

  const isSelected = selectedIds.includes(node.id)
  const isGhost = ghostIds.has(node.id)
  const color = node.properties.color ?? "#f43f5e"
  const radius = node.properties.radius ?? 1

  const apex: Vector3Tuple = node.properties.apex ?? [
    node.coordinates[0],
    node.coordinates[1] + 3,
    node.coordinates[2],
  ]
  const baseCenter: Vector3Tuple = node.properties.baseCenter ?? node.coordinates

  const { position, height, quaternion } = useMemo(() => {
    const base = new THREE.Vector3(...baseCenter)
    const top = new THREE.Vector3(...apex)
    const mid = new THREE.Vector3().addVectors(base, top).multiplyScalar(0.5)
    const h = base.distanceTo(top)
    const dir = new THREE.Vector3().subVectors(top, base).normalize()
    const q = new THREE.Quaternion()
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
    return {
      position: [mid.x, mid.y, mid.z] as Vector3Tuple,
      height: h,
      quaternion: q,
    }
  }, [baseCenter, apex])

  const opacity = isGhost
    ? 0.1
    : (node.properties.opacity ?? 0.6) * globalOpacity

  return (
    <group>
      <mesh
        position={position}
        quaternion={quaternion}
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
        <coneGeometry args={[radius, height, 32]} />
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

      {/* Apex marker */}
      <mesh position={apex}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>

      {/* Base center marker */}
      <mesh position={baseCenter}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
    </group>
  )
}

export default memo(Cone3D)
