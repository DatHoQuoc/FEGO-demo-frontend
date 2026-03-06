"use client"

import { memo, useState, useCallback } from "react"
import { useThree } from "@react-three/fiber"
import type { Intersection, Object3D } from "three"
import type { Vector3Tuple, MeasurementResult } from "@/types/geometry3d.types"
import { useSceneStore } from "@/stores/sceneStore"
import AngleArc3D from "../annotations/AngleArc3D"

/**
 * AngleMeasureTool - Click three points (point1, vertex, point2) to measure angle.
 */

function angleBetween(
  vertex: Vector3Tuple,
  p1: Vector3Tuple,
  p2: Vector3Tuple
): number {
  const v1 = [p1[0] - vertex[0], p1[1] - vertex[1], p1[2] - vertex[2]]
  const v2 = [p2[0] - vertex[0], p2[1] - vertex[1], p2[2] - vertex[2]]
  const dot = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
  const mag1 = Math.sqrt(v1[0] ** 2 + v1[1] ** 2 + v1[2] ** 2)
  const mag2 = Math.sqrt(v2[0] ** 2 + v2[1] ** 2 + v2[2] ** 2)
  if (mag1 === 0 || mag2 === 0) return 0
  return (Math.acos(Math.max(-1, Math.min(1, dot / (mag1 * mag2)))) * 180) / Math.PI
}

function AngleMeasureTool() {
  const activeTool = useSceneStore((s) => s.activeTool)
  const addMeasurement = useSceneStore((s) => s.addMeasurement)
  const measurements = useSceneStore((s) => s.measurements)
  const { raycaster, camera, scene, pointer } = useThree()

  const [clickedPoints, setClickedPoints] = useState<Vector3Tuple[]>([])

  const getClickPosition = useCallback((): Vector3Tuple | null => {
    raycaster.setFromCamera(pointer, camera)
    const intersections: Intersection[] = raycaster.intersectObjects(
      scene.children,
      true
    )
    for (const hit of intersections) {
      let obj: Object3D | null = hit.object
      while (obj) {
        if (obj.userData?.geometryId) {
          const p = hit.point
          return [p.x, p.y, p.z]
        }
        obj = obj.parent
      }
    }
    return null
  }, [raycaster, camera, scene, pointer])

  const handlePointerDown = useCallback(() => {
    if (activeTool !== "measure_angle") return

    const pos = getClickPosition()
    if (!pos) return

    const next = [...clickedPoints, pos]

    if (next.length >= 3) {
      // Order: point1, vertex (middle), point2
      const [p1, vertex, p2] = next
      const angle = angleBetween(vertex, p1, p2)
      const result: MeasurementResult = {
        type: "angle",
        value: angle,
        unit: "degrees",
        points: [p1, vertex, p2],
      }
      addMeasurement(result)
      setClickedPoints([])
    } else {
      setClickedPoints(next)
    }
  }, [activeTool, clickedPoints, getClickPosition, addMeasurement])

  const angleMeasurements = measurements.filter((m) => m.type === "angle")

  return (
    <group>
      {/* Invisible click catcher */}
      <mesh visible={false} onPointerDown={handlePointerDown}>
        <boxGeometry args={[200, 200, 200]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Show picked points so far */}
      {activeTool === "measure_angle" &&
        clickedPoints.map((pt, i) => (
          <mesh key={`angle-pick-${i}`} position={pt}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshBasicMaterial color={i === 1 ? "#f97316" : "#f59e0b"} />
          </mesh>
        ))}

      {/* Render all angle arcs */}
      {angleMeasurements.map((m, i) => (
        <AngleArc3D
          key={`angle-${i}`}
          point1={m.points[0]}
          vertex={m.points[1]}
          point2={m.points[2]}
        />
      ))}
    </group>
  )
}

export default memo(AngleMeasureTool)
