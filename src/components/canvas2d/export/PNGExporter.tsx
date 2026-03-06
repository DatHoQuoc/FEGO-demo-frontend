"use client"

import React from "react"

import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ImageDown } from "lucide-react"

interface PNGExporterProps {
  svgRef: React.RefObject<SVGSVGElement | null>
}

export default function PNGExporter({ svgRef }: PNGExporterProps) {
  const exportPNG = useCallback(() => {
    const svg = svgRef.current
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const scale = 2
      const canvas = document.createElement("canvas")
      canvas.width = svg.clientWidth * scale
      canvas.height = svg.clientHeight * scale
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.fillStyle = "#f8fafc"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.scale(scale, scale)
      ctx.drawImage(img, 0, 0)

      canvas.toBlob((blob) => {
        if (!blob) return
        const a = document.createElement("a")
        a.href = URL.createObjectURL(blob)
        a.download = `geometry_2d_${Date.now()}.png`
        a.click()
        URL.revokeObjectURL(a.href)
      }, "image/png")

      URL.revokeObjectURL(url)
    }
    img.src = url
  }, [svgRef])

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 gap-1.5 text-xs"
      onClick={exportPNG}
      style={{ color: "#94a3b8" }}
    >
      <ImageDown className="h-3.5 w-3.5" />
      PNG
    </Button>
  )
}
