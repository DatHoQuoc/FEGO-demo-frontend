"use client"

import { useRef, useCallback } from "react"
import { useSceneStore } from "@/stores/sceneStore"
import { distance3D, angleBetween3Points } from "@/services/threeScene.service"
import type { Vector3Tuple, MeasurementResult } from "@/types/geometry3d.types"

/**
 * Hook for interactive distance / angle measurement.
 * Collects clicked points and creates MeasurementResults.
 */
export function use3DMeasurement() {
  const activeTool = useSceneStore((s) => s.activeTool)
  const addMeasurement = useSceneStore((s) => s.addMeasurement)
  const measurements = useSceneStore((s) => s.measurements)
  const clearMeasurements = useSceneStore((s) => s.clearMeasurements)

  const pendingPoints = useRef<Vector3Tuple[]>([])

  const addPoint = useCallback(
    (point: Vector3Tuple) => {
      if (activeTool === "measure_distance") {
        pendingPoints.current.push(point)
        if (pendingPoints.current.length === 2) {
          const [a, b] = pendingPoints.current
          const result: MeasurementResult = {
            type: "distance",
            value: distance3D(a, b),
            unit: "units",
            points: [a, b],
          }
          addMeasurement(result)
          pendingPoints.current = []
        }
      } else if (activeTool === "measure_angle") {
        pendingPoints.current.push(point)
        if (pendingPoints.current.length === 3) {
          const [a, vertex, b] = pendingPoints.current
          const result: MeasurementResult = {
            type: "angle",
            value: angleBetween3Points(a, vertex, b),
            unit: "deg",
            points: [a, vertex, b],
          }
          addMeasurement(result)
          pendingPoints.current = []
        }
      }
    },
    [activeTool, addMeasurement]
  )

  const reset = useCallback(() => {
    pendingPoints.current = []
    clearMeasurements()
  }, [clearMeasurements])

  return {
    addPoint,
    reset,
    measurements,
    pendingPointsCount: pendingPoints.current.length,
    expectedPoints: activeTool === "measure_distance" ? 2 : activeTool === "measure_angle" ? 3 : 0,
  }
}
