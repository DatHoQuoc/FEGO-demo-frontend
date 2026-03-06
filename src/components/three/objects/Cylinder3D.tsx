"use client"

import { memo, useMemo, useState } from "react"
import * as THREE from "three"
import type { GeometryNode, Vector3Tuple } from "@/types/geometry3d.types"
import { useSceneStore } from "@/stores/sceneStore"

interface Cylinder3DProps {
  node: GeometryNode
}

function Cylinder3D({ node }: Cylinder3DProps) {
  const [hovered, setHovered] = useState(false)
  const selectedIds = useSceneStore((s) => s.selectedIds)
  const selectObject = useSceneStore((s) => s.selectObject)
  const ghostIds = useSceneStore((s) => s.ghostIds)
  const globalOpacity = useSceneStore((s) => s.globalOpacity)
  const wireframeMode = useSceneStore((s) => s.wireframeMode)

  const isSelected = selectedIds.includes(node.id)
  const isGhost = ghostIds.has(node.id)
  const color = node.properties.color ?? "#14b8a6"
  const radius = node.properties.radius ?? 1

  const baseCenter: Vector3Tuple = node.properties.baseCenter ?? node.coordinates
  const topCenter: Vector3Tuple = node.properties.topCenter ?? [
    node.coordinates[0],
    node.coordinates[1] + 3,
    node.coordinates[2],
  ]

  const { position, height, quaternion } = useMemo(() => {
    const base = new THREE.Vector3(...baseCenter)
    const top = new THREE.Vector3(...topCenter)
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
  }, [baseCenter, topCenter])

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
        <cylinderGeometry args={[radius, radius, height, 32]} />
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

      {/* Axis line indicator */}
      <mesh position={baseCenter}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      <mesh position={topCenter}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
    </group>
  )
}

export default memo(Cylinder3D)
