"use client"

import { memo, useMemo, useState } from "react"
import * as THREE from "three"
import type { GeometryNode, Vector3Tuple } from "@/types/geometry3d.types"
import { useSceneStore } from "@/stores/sceneStore"

interface Plane3DProps {
  node: GeometryNode
}

function Plane3D({ node }: Plane3DProps) {
  const [hovered, setHovered] = useState(false)
  const selectedIds = useSceneStore((s) => s.selectedIds)
  const selectObject = useSceneStore((s) => s.selectObject)
  const ghostIds = useSceneStore((s) => s.ghostIds)
  const globalOpacity = useSceneStore((s) => s.globalOpacity)

  const isSelected = selectedIds.includes(node.id)
  const isGhost = ghostIds.has(node.id)
  const color = node.properties.color ?? "#06b6d4"
  const opacity = node.properties.opacity ?? 0.3

  // If bounding points are provided, create a bounded plane
  const boundingPoints = node.properties.boundingPoints

  const geometry = useMemo(() => {
    if (boundingPoints && boundingPoints.length >= 3) {
      const shape = new THREE.Shape()
      // Project bounding points onto a plane and create a shape
      const pts = boundingPoints as Vector3Tuple[]
      const geo = new THREE.BufferGeometry()
      const vertices: number[] = []

      // Simple triangulation: fan from first vertex
      for (let i = 1; i < pts.length - 1; i++) {
        vertices.push(...pts[0], ...pts[i], ...pts[i + 1])
      }
      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      )
      geo.computeVertexNormals()
      return geo
    }
    return null
  }, [boundingPoints])

  // Compute rotation from plane equation
  const rotation = useMemo(() => {
    const eq = node.properties.equation
    if (eq) {
      const normal = new THREE.Vector3(eq[0], eq[1], eq[2]).normalize()
      const quaternion = new THREE.Quaternion()
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal)
      const euler = new THREE.Euler().setFromQuaternion(quaternion)
      return [euler.x, euler.y, euler.z] as Vector3Tuple
    }
    return [0, 0, 0] as Vector3Tuple
  }, [node.properties.equation])

  const effectiveOpacity = isGhost ? 0.1 : opacity * globalOpacity

  return (
    <group position={node.coordinates}>
      {geometry ? (
        <mesh
          geometry={geometry}
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
          }}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={isSelected ? "#fbbf24" : color}
            transparent
            opacity={effectiveOpacity}
            side={THREE.DoubleSide}
            emissive={hovered ? color : "#000000"}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </mesh>
      ) : (
        <mesh
          rotation={rotation}
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
          }}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[8, 8]} />
          <meshStandardMaterial
            color={isSelected ? "#fbbf24" : color}
            transparent
            opacity={effectiveOpacity}
            side={THREE.DoubleSide}
            emissive={hovered ? color : "#000000"}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </mesh>
      )}

      {/* Edge highlight when selected */}
      {isSelected && !geometry && (
        <mesh rotation={rotation}>
          <planeGeometry args={[8, 8]} />
          <meshBasicMaterial
            color="#fbbf24"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
    </group>
  )
}

export default memo(Plane3D)
