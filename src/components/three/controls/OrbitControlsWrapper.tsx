"use client"

import { memo } from "react"
import { OrbitControls } from "@react-three/drei"
import { useSceneStore } from "@/stores/sceneStore"

interface OrbitControlsWrapperProps {
  enableRotate?: boolean
  enableZoom?: boolean
  enablePan?: boolean
  dampingFactor?: number
}

function OrbitControlsWrapper({
  enableRotate = true,
  enableZoom = true,
  enablePan = true,
  dampingFactor = 0.12,
}: OrbitControlsWrapperProps) {
  const autoRotate = useSceneStore((s) => s.autoRotate)
  const camera = useSceneStore((s) => s.camera)

  return (
    <OrbitControls
      makeDefault
      enableRotate={enableRotate}
      enableZoom={enableZoom}
      enablePan={enablePan}
      autoRotate={autoRotate}
      autoRotateSpeed={1.5}
      enableDamping
      dampingFactor={dampingFactor}
      minDistance={2}
      maxDistance={50}
      target={camera.target}
      // Touch: pinch zoom, two-finger rotate
      touches={{
        ONE: 0, // ROTATE
        TWO: 2, // DOLLY_PAN
      }}
    />
  )
}

export default memo(OrbitControlsWrapper)
