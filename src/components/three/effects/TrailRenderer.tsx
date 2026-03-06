"use client"

import React from "react"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface TrailRendererProps {
  /** The object ID to follow (matches userData.nodeId) */
  targetId: string
  /** Max trail segments */
  maxPoints?: number
  /** Trail color */
  color?: string
  /** Trail line width (note: WebGL only supports lineWidth=1 on most GPUs) */
  width?: number
}

export default function TrailRenderer({
  targetId,
  maxPoints = 80,
  color = "#f59e0b",
}: TrailRendererProps) {
  const lineRef = useRef<THREE.Line>(null)
  const trailPoints = useRef<THREE.Vector3[]>([])

  useFrame(({ scene }) => {
    let targetPos: THREE.Vector3 | null = null

    scene.traverse((obj) => {
      if (obj.userData?.nodeId === targetId) {
        targetPos = new THREE.Vector3()
        obj.getWorldPosition(targetPos)
      }
    })

    if (!targetPos || !lineRef.current) return

    trailPoints.current.push(targetPos.clone())
    if (trailPoints.current.length > maxPoints) {
      trailPoints.current.shift()
    }

    const geo = lineRef.current.geometry
    geo.setFromPoints(trailPoints.current)
    geo.computeBoundingSphere()
  })

  return (
    <line ref={lineRef as React.RefObject<THREE.Line>}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={0.7} />
    </line>
  )
}
