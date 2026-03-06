"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, type ReactNode } from "react"
import { useSceneStore } from "@/stores/sceneStore"

interface ThreeJSCanvasProps {
  children: ReactNode
  backgroundColor?: string
  className?: string
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4a9eff" wireframe />
    </mesh>
  )
}

export default function ThreeJSCanvas({
  children,
  backgroundColor = "#fdfdfd",
  className,
}: ThreeJSCanvasProps) {
  const camera = useSceneStore((s) => s.camera)

  return (
    <div className={className ?? "h-full w-full"}>
      <Canvas
        camera={{
          position: camera.position,
          fov: camera.fov,
          near: 0.1,
          far: 1000,
        }}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
    gl.setClearColor(backgroundColor) // ✅ Set màu trực tiếp cho renderer
  }}
        dpr={[1, 2]}
        style={{ background: backgroundColor }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}
