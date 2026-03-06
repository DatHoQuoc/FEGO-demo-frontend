"use client"

import { memo, useState, useCallback } from "react"
import { useThree } from "@react-three/fiber"
import type { Intersection, Object3D } from "three"
import type { Vector3Tuple, MeasurementResult } from "@/types/geometry3d.types"
import { useSceneStore } from "@/stores/sceneStore"
import DimensionLine3D from "../annotations/DimensionLine3D"
import { distance3D } from "@/utils/coordinateTransform"

/**
 * MeasurementTool - Click two points to measure distance.
 * Renders dimension lines for active measurements.
 */

function MeasurementTool() {
  const activeTool = useSceneStore((s) => s.activeTool)
  const addMeasurement = useSceneStore((s) => s.addMeasurement)
  const measurements = useSceneStore((s) => s.measurements)
  const { raycaster, camera, scene, pointer } = useThree()

  const [firstPoint, setFirstPoint] = useState<Vector3Tuple | null>(null)

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
    if (activeTool !== "measure_distance") return

    const pos = getClickPosition()
    if (!pos) return

    if (!firstPoint) {
      setFirstPoint(pos)
    } else {
      const dist = distance3D(firstPoint, pos)
      const result: MeasurementResult = {
        type: "distance",
        value: dist,
        unit: "units",
        points: [firstPoint, pos],
      }
      addMeasurement(result)
      setFirstPoint(null)
    }
  }, [activeTool, firstPoint, getClickPosition, addMeasurement])

  const distanceMeasurements = measurements.filter(
    (m) => m.type === "distance"
  )

  return (
    <group>
      {/* Invisible click catcher */}
      <mesh visible={false} onPointerDown={handlePointerDown}>
        <boxGeometry args={[200, 200, 200]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* First point indicator */}
      {firstPoint && activeTool === "measure_distance" && (
        <mesh position={firstPoint}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
      )}

      {/* Render all distance measurements */}
      {distanceMeasurements.map((m, i) => (
        <DimensionLine3D
          key={`dist-${i}`}
          from={m.points[0]}
          to={m.points[1]}
        />
      ))}
    </group>
  )
}

export default memo(MeasurementTool)
