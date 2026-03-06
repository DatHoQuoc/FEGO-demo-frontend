"use client"

import { memo, useMemo } from "react"
import { Line } from "@react-three/drei"
import type { Vector3Tuple } from "@/types/geometry3d.types"
import MeasurementLabel from "./MeasurementLabel"

interface AngleArc3DProps {
  vertex: Vector3Tuple
  point1: Vector3Tuple
  point2: Vector3Tuple
  radius?: number
  color?: string
  onDismiss?: () => void
}

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
  return Math.acos(Math.max(-1, Math.min(1, dot / (mag1 * mag2))))
}

function normalize(v: number[]): number[] {
  const mag = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2)
  if (mag === 0) return [0, 0, 0]
  return [v[0] / mag, v[1] / mag, v[2] / mag]
}

function cross(a: number[], b: number[]): number[] {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]
}

function AngleArc3D({
  vertex,
  point1,
  point2,
  radius = 0.8,
  color = "#eab308",
  onDismiss,
}: AngleArc3DProps) {
  const { arcPoints, angle, labelPos } = useMemo(() => {
    const dir1 = normalize([
      point1[0] - vertex[0],
      point1[1] - vertex[1],
      point1[2] - vertex[2],
    ])
    const dir2 = normalize([
      point2[0] - vertex[0],
      point2[1] - vertex[1],
      point2[2] - vertex[2],
    ])

    const angleRad = angleBetween(vertex, point1, point2)
    const angleDeg = (angleRad * 180) / Math.PI

    // Build arc points using Rodrigues' rotation
    const normal = normalize(cross(dir1, dir2))
    const segments = 32
    const points: Vector3Tuple[] = []

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * angleRad
      const cosT = Math.cos(t)
      const sinT = Math.sin(t)

      // Rodrigues' rotation formula: v*cos(t) + (n x v)*sin(t) + n*(n.v)*(1-cos(t))
      const crossNV = cross(normal, dir1)
      const dotNV =
        normal[0] * dir1[0] + normal[1] * dir1[1] + normal[2] * dir1[2]

      const rx =
        dir1[0] * cosT +
        crossNV[0] * sinT +
        normal[0] * dotNV * (1 - cosT)
      const ry =
        dir1[1] * cosT +
        crossNV[1] * sinT +
        normal[1] * dotNV * (1 - cosT)
      const rz =
        dir1[2] * cosT +
        crossNV[2] * sinT +
        normal[2] * dotNV * (1 - cosT)

      points.push([
        vertex[0] + rx * radius,
        vertex[1] + ry * radius,
        vertex[2] + rz * radius,
      ])
    }

    // Label at midpoint of arc
    const midIdx = Math.floor(segments / 2)
    const lp: Vector3Tuple = [
      points[midIdx][0] + normal[0] * 0.15,
      points[midIdx][1] + 0.25,
      points[midIdx][2] + normal[2] * 0.15,
    ]

    return { arcPoints: points, angle: angleDeg, labelPos: lp }
  }, [vertex, point1, point2, radius])

  return (
    <group>
      {/* Arc curve */}
      <Line points={arcPoints} color={color} lineWidth={2.5} />

      {/* Small endpoint markers */}
      <mesh position={arcPoints[0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={arcPoints[arcPoints.length - 1]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Angle measurement label */}
      <MeasurementLabel
        value={angle}
        unit="degrees"
        position={labelPos}
        type="angle"
        onDismiss={onDismiss}
      />
    </group>
  )
}

export default memo(AngleArc3D)
