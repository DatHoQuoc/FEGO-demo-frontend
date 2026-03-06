"use client"

import { useEffect } from "react"
import ThreeJSCanvas from "@/components/three/scene/ThreeJSCanvas"
import SceneManager from "@/components/three/scene/SceneManager"
import CameraController from "@/components/three/scene/CameraController"
import LightingController from "@/components/three/scene/LightingController"
import SceneGrid from "@/components/three/scene/GridHelper"
import SceneAxes from "@/components/three/scene/AxesHelper"
import SceneControlPanel from "@/components/three/ui/SceneControlPanel"
import ObjectListPanel from "@/components/three/ui/ObjectListPanel"
import { useSceneStore } from "@/stores/sceneStore"
import type { GeometryGraph } from "@/types/geometry3d.types"

interface Viewer3DProps {
  graph: GeometryGraph
  className?: string
}

export default function Viewer3D({ graph, className }: Viewer3DProps) {
  const setGraph = useSceneStore((s) => s.setGraph)
  const deselectAll = useSceneStore((s) => s.deselectAll)

  useEffect(() => {
    setGraph(graph)
  }, [graph, setGraph])

  return (
    <div className={`relative ${className ?? "h-full w-full"}`}>
      <ThreeJSCanvas>
        {/* Click empty space to deselect */}
        <mesh
          visible={false}
          position={[0, 0, 0]}
          onClick={() => deselectAll()}
        >
          <sphereGeometry args={[100, 8, 8]} />
          <meshBasicMaterial side={1} />
        </mesh>

        <SceneManager graph={graph} />
        <CameraController />
        <LightingController shadows />
        <SceneGrid />
        <SceneAxes />
      </ThreeJSCanvas>

      {/* UI overlay panels */}
      <SceneControlPanel />
      <ObjectListPanel />
    </div>
  )
}
