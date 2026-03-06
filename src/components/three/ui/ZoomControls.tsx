"use client"

import { useSceneStore } from "@/stores/sceneStore"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import type { Vector3Tuple } from "@/types/geometry3d.types"

function scaleVector(v: Vector3Tuple, factor: number): Vector3Tuple {
  return [v[0] * factor, v[1] * factor, v[2] * factor]
}

export default function ZoomControls() {
  const camera = useSceneStore((s) => s.camera)
  const setCameraPosition = useSceneStore((s) => s.setCameraPosition)
  const resetCamera = useSceneStore((s) => s.resetCamera)

  const zoomIn = () => setCameraPosition(scaleVector(camera.position, 0.8))
  const zoomOut = () => setCameraPosition(scaleVector(camera.position, 1.25))

  return (
    <div className="flex gap-1">
      <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" onClick={zoomIn} aria-label="Zoom in">
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" onClick={zoomOut} aria-label="Zoom out">
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" onClick={resetCamera} aria-label="Fit to view">
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
