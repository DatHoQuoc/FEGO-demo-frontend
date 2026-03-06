"use client"

import { memo } from "react"
import { Grid } from "@react-three/drei"
import { useSceneStore } from "@/stores/sceneStore"

function SceneGrid() {
  const showGrid = useSceneStore((s) => s.showGrid)

  if (!showGrid) return null

  return (
    <Grid
      args={[20, 20]}
      cellSize={1}
      cellThickness={0.5}
      cellColor="#334155"
      sectionSize={5}
      sectionThickness={1}
      sectionColor="#475569"
      fadeDistance={30}
      fadeStrength={1}
      infiniteGrid
      position={[0, -0.01, 0]}
    />
  )
}

export default memo(SceneGrid)
