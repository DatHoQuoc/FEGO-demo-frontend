"use client"

import { memo, useMemo } from "react"
import { Line } from "@react-three/drei"
import type { Vector3Tuple } from "@/types/geometry3d.types"
import { distance3D, midpoint3D } from "@/utils/coordinateTransform"
import MeasurementLabel from "./MeasurementLabel"

interface DimensionLine3DProps {
  from: Vector3Tuple
  to: Vector3Tuple
  offset?: number
  onDismiss?: () => void
}

function DimensionLine3D({
  from,
  to,
  onDismiss,
}: DimensionLine3DProps) {
  const dist = useMemo(() => distance3D(from, to), [from, to])
  const mid = useMemo(() => midpoint3D(from, to), [from, to])

  return (
    <group>
      {/* Main dimension line */}
      <Line
        points={[from, to]}
        color="#06b6d4"
        lineWidth={1.5}
        dashed
        dashSize={0.15}
        gapSize={0.1}
      />

      {/* Endpoint markers */}
      <mesh position={from}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>
      <mesh position={to}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>

      {/* Measurement label at midpoint */}
      <MeasurementLabel
        value={dist}
        unit="units"
        position={[mid[0], mid[1] + 0.3, mid[2]]}
        type="distance"
        onDismiss={onDismiss}
      />
    </group>
  )
}

export default memo(DimensionLine3D)
