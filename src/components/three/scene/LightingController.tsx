"use client"

import { memo } from "react"

interface LightingControllerProps {
  intensity?: number
  shadows?: boolean
}

function LightingController({
  intensity = 1,
  shadows = true,
}: LightingControllerProps) {
  return (
    <>
      {/* Soft ambient fill */}
      <ambientLight intensity={0.4 * intensity} />

      {/* Primary directional light with shadows */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8 * intensity}
        castShadow={shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Secondary fill light from opposite direction */}
      <directionalLight
        position={[-8, 6, -4]}
        intensity={0.3 * intensity}
      />

      {/* Point lights for depth */}
      <pointLight
        position={[0, 12, 0]}
        intensity={0.4 * intensity}
        distance={30}
      />
      <pointLight
        position={[-10, -5, 10]}
        intensity={0.15 * intensity}
        distance={30}
        color="#88bbff"
      />
    </>
  )
}

export default memo(LightingController)
