"use client"

import { useThree } from "@react-three/fiber"
import { useCallback } from "react"

/**
 * Must be rendered inside a Canvas.
 * Captures the current WebGL frame and triggers a download.
 * We expose a global function so the outer UI button can call it.
 */
export function ScreenshotCapture() {
  const { gl } = useThree()

  const capture = useCallback(() => {
    gl.domElement.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `scene-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)
    })
  }, [gl])

  // Expose capture to the window so a DOM button outside the canvas can trigger it
  if (typeof window !== "undefined") {
    ;(window as unknown as Record<string, unknown>).__captureScreenshot = capture
  }

  return null
}

// ─── DOM button (rendered outside Canvas) ─────────────────────
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

export default function ScreenshotButton() {
  const handleClick = () => {
    const fn = (window as unknown as Record<string, unknown>).__captureScreenshot
    if (typeof fn === "function") (fn as () => void)()
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-8 w-8 bg-transparent"
      onClick={handleClick}
      aria-label="Screenshot"
    >
      <Camera className="h-4 w-4" />
    </Button>
  )
}
