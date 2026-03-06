"use client"

import { useSceneStore } from "@/stores/sceneStore"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

export default function CameraResetButton() {
  const resetCamera = useSceneStore((s) => s.resetCamera)

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 gap-1.5 text-xs bg-transparent"
      onClick={resetCamera}
    >
      <RotateCcw className="h-3.5 w-3.5" />
      Reset Camera
    </Button>
  )
}
