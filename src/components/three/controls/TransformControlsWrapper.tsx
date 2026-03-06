"use client"

import { memo, useRef, useEffect } from "react"
import { TransformControls } from "@react-three/drei"
import type { Object3D, Event as ThreeEvent } from "three"
import type { Vector3Tuple } from "@/types/geometry3d.types"

interface TransformControlsWrapperProps {
  object: Object3D | null
  mode?: "translate" | "rotate" | "scale"
  snap?: boolean
  onTransform?: (newPosition: Vector3Tuple) => void
}

function TransformControlsWrapper({
  object,
  mode = "translate",
  snap = false,
  onTransform,
}: TransformControlsWrapperProps) {
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    function handleChange(e: ThreeEvent) {
      if (!e.target) return
      const target = (e.target as any).object as Object3D | undefined
      if (target && onTransform) {
        onTransform([target.position.x, target.position.y, target.position.z])
      }
    }

    controls.addEventListener("objectChange", handleChange)
    return () => controls.removeEventListener("objectChange", handleChange)
  }, [onTransform])

  if (!object) return null

  return (
    <TransformControls
      ref={controlsRef}
      object={object}
      mode={mode}
      translationSnap={snap ? 0.5 : undefined}
      rotationSnap={snap ? Math.PI / 12 : undefined}
      size={0.8}
    />
  )
}

export default memo(TransformControlsWrapper)
