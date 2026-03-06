"use client"

import { memo, useRef, useEffect } from "react"
import { OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useSceneStore } from "@/stores/sceneStore"

function CameraController() {
  const camera = useSceneStore((s) => s.camera)
  const autoRotate = useSceneStore((s) => s.autoRotate)
  const controlsRef = useRef<any>(null)
  const { camera: threeCamera } = useThree()

  useEffect(() => {
    threeCamera.position.set(...camera.position)
    if (controlsRef.current) {
      controlsRef.current.target.set(...camera.target)
      controlsRef.current.update()
    }
  }, [camera.position, camera.target, threeCamera])

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={2}
      maxDistance={50}
      autoRotate={autoRotate}
      autoRotateSpeed={1}
      target={camera.target}
    />
  )
}

export default memo(CameraController)
