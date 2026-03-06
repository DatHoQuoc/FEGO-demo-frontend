"use client"

import { memo, useMemo, useState } from "react"
import * as THREE from "three"
import { Line } from "@react-three/drei"
import type { GeometryNode, Vector3Tuple } from "@/types/geometry3d.types"
import { useSceneStore } from "@/stores/sceneStore"

interface Polygon3DProps {
  node: GeometryNode
}

function Polygon3D({ node }: Polygon3DProps) {
  const [hovered, setHovered] = useState(false)
  const selectedIds = useSceneStore((s) => s.selectedIds)
  const selectObject = useSceneStore((s) => s.selectObject)
  const ghostIds = useSceneStore((s) => s.ghostIds)
  const globalOpacity = useSceneStore((s) => s.globalOpacity)

  const isSelected = selectedIds.includes(node.id)
  const isGhost = ghostIds.has(node.id)
  const color = node.properties.color ?? "#8b5cf6"
  const filled = node.properties.filled ?? true

  const vertices: Vector3Tuple[] = node.properties.vertices ?? [
    node.coordinates,
    [node.coordinates[0] + 2, node.coordinates[1], node.coordinates[2]],
    [node.coordinates[0] + 1, node.coordinates[1] + 2, node.coordinates[2]],
  ]

  const geometry = useMemo(() => {
    if (vertices.length < 3) return null
    const geo = new THREE.BufferGeometry()
    const verts: number[] = []
    // Fan triangulation from vertex 0
    for (let i = 1; i < vertices.length - 1; i++) {
      verts.push(...vertices[0], ...vertices[i], ...vertices[i + 1])
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3))
    geo.computeVertexNormals()
    return geo
  }, [vertices])

  // Edge loop (closed)
  const edgePoints = useMemo(
    () => [...vertices, vertices[0]],
    [vertices]
  )

  const opacity = isGhost ? 0.1 : (node.properties.opacity ?? 0.5) * globalOpacity

  return (
    <group
      onClick={(e) => {
        e.stopPropagation()
        selectObject(node.id, e.nativeEvent.ctrlKey || e.nativeEvent.metaKey)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Filled face */}
      {filled && geometry && (
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color={isSelected ? "#fbbf24" : color}
            transparent
            opacity={opacity}
            side={THREE.DoubleSide}
            emissive={hovered ? color : "#000000"}
            emissiveIntensity={hovered ? 0.15 : 0}
          />
        </mesh>
      )}

      {/* Edges */}
      <Line
        points={edgePoints}
        color={isSelected ? "#fbbf24" : isGhost ? "#64748b" : color}
        lineWidth={isSelected ? 2.5 : 1.5}
        transparent={isGhost}
        opacity={isGhost ? 0.3 : 1}
      />

      {/* Vertex markers */}
      {vertices.map((v, i) => (
        <mesh key={`${node.id}-v-${i}`} position={v}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={isSelected ? "#fbbf24" : color}
            transparent={isGhost}
            opacity={isGhost ? 0.3 : 1}
          />
        </mesh>
      ))}
    </group>
  )
}

export default memo(Polygon3D)
