"use client"

import { memo, useMemo, useState } from "react"
import * as THREE from "three"
import { Line } from "@react-three/drei"
import type { GeometryNode, Vector3Tuple } from "@/types/geometry3d.types"
import { useSceneStore } from "@/stores/sceneStore"

interface Solid3DProps {
  node: GeometryNode
}

function Solid3D({ node }: Solid3DProps) {
  const [hovered, setHovered] = useState(false)
  const selectedIds = useSceneStore((s) => s.selectedIds)
  const selectObject = useSceneStore((s) => s.selectObject)
  const ghostIds = useSceneStore((s) => s.ghostIds)
  const globalOpacity = useSceneStore((s) => s.globalOpacity)
  const wireframeMode = useSceneStore((s) => s.wireframeMode)

  const isSelected = selectedIds.includes(node.id)
  const isGhost = ghostIds.has(node.id)
  const color = node.properties.color ?? "#f97316"

  const vertices: Vector3Tuple[] = node.properties.vertices ?? []
  const faces: number[][] = node.properties.faces ?? []

  const geometry = useMemo(() => {
    if (vertices.length < 4 || faces.length === 0) return null

    const geo = new THREE.BufferGeometry()
    const positions: number[] = []
    const normals: number[] = []

    for (const face of faces) {
      if (face.length < 3) continue

      // Fan triangulation for each face
      const v0 = new THREE.Vector3(...vertices[face[0]])
      for (let i = 1; i < face.length - 1; i++) {
        const v1 = new THREE.Vector3(...vertices[face[i]])
        const v2 = new THREE.Vector3(...vertices[face[i + 1]])

        // Compute face normal
        const edge1 = new THREE.Vector3().subVectors(v1, v0)
        const edge2 = new THREE.Vector3().subVectors(v2, v0)
        const normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize()

        positions.push(v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z)
        normals.push(
          normal.x, normal.y, normal.z,
          normal.x, normal.y, normal.z,
          normal.x, normal.y, normal.z
        )
      }
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3))
    return geo
  }, [vertices, faces])

  // Compute edges for wireframe overlay
  const edges = useMemo(() => {
    const edgeSet = new Set<string>()
    const edgeLines: [Vector3Tuple, Vector3Tuple][] = []

    for (const face of faces) {
      for (let i = 0; i < face.length; i++) {
        const a = face[i]
        const b = face[(i + 1) % face.length]
        const key = a < b ? `${a}-${b}` : `${b}-${a}`
        if (!edgeSet.has(key)) {
          edgeSet.add(key)
          if (vertices[a] && vertices[b]) {
            edgeLines.push([vertices[a], vertices[b]])
          }
        }
      }
    }
    return edgeLines
  }, [vertices, faces])

  const opacity = isGhost
    ? 0.1
    : (node.properties.opacity ?? 0.7) * globalOpacity

  if (!geometry) return null

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
      {/* Solid faces */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={isSelected ? "#fbbf24" : color}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          wireframe={wireframeMode}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.15 : 0}
        />
      </mesh>

      {/* Edge lines */}
      {!wireframeMode &&
        edges.map(([a, b], i) => (
          <Line
            key={`${node.id}-edge-${i}`}
            points={[a, b]}
            color={isSelected ? "#fbbf24" : "#e2e8f0"}
            lineWidth={isSelected ? 2 : 1}
            transparent={isGhost}
            opacity={isGhost ? 0.3 : 0.8}
          />
        ))}

      {/* Vertex markers */}
      {vertices.map((v, i) => (
        <mesh key={`${node.id}-vert-${i}`} position={v}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={isSelected ? "#fbbf24" : "#e2e8f0"}
            transparent={isGhost}
            opacity={isGhost ? 0.3 : 1}
          />
        </mesh>
      ))}
    </group>
  )
}

export default memo(Solid3D)
