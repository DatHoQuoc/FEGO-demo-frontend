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
    // Use a ref-style holder so TS doesn't infer `never` through the closure
    let targetPos: THREE.Vector3 | null = null

    scene.traverse((obj) => {
      if (obj.userData?.nodeId === targetId) {
        const pos = new THREE.Vector3()
        obj.getWorldPosition(pos)
        targetPos = pos
      }
    })

    if (targetPos === null || !lineRef.current) return

    // Cast required: TS still can't narrow through traverse callback
    const pos = targetPos as THREE.Vector3
    trailPoints.current.push(pos.clone())
    if (trailPoints.current.length > maxPoints) {
      trailPoints.current.shift()
    }

    const geo = lineRef.current.geometry
    geo.setFromPoints(trailPoints.current)
    geo.computeBoundingSphere()
  })

  return (
    // Use primitive to avoid JSX confusing THREE.Line with SVG <line>
    <primitive
      object={new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 })
      )}
      ref={lineRef}
    />
  )
}