"use client"

import React from "react"

import { useSceneStore } from "@/stores/sceneStore"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Eye,
  EyeOff,
  Grid3X3,
  Axis3D,
  RotateCcw,
  Maximize,
  Type,
  Box,
  Move3D,
  Ruler,
  Crosshair,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ActiveTool, ViewPreset } from "@/types/geometry3d.types"

export default function SceneControlPanel() {
  const showGrid = useSceneStore((s) => s.showGrid)
  const showAxes = useSceneStore((s) => s.showAxes)
  const showLabels = useSceneStore((s) => s.showLabels)
  const wireframeMode = useSceneStore((s) => s.wireframeMode)
  const globalOpacity = useSceneStore((s) => s.globalOpacity)
  const autoRotate = useSceneStore((s) => s.autoRotate)
  const activeTool = useSceneStore((s) => s.activeTool)

  const toggleGrid = useSceneStore((s) => s.toggleGrid)
  const toggleAxes = useSceneStore((s) => s.toggleAxes)
  const toggleLabels = useSceneStore((s) => s.toggleLabels)
  const toggleWireframe = useSceneStore((s) => s.toggleWireframe)
  const setGlobalOpacity = useSceneStore((s) => s.setGlobalOpacity)
  const setAutoRotate = useSceneStore((s) => s.setAutoRotate)
  const resetCamera = useSceneStore((s) => s.resetCamera)
  const setViewPreset = useSceneStore((s) => s.setViewPreset)
  const setActiveTool = useSceneStore((s) => s.setActiveTool)

  const viewPresets: { label: string; value: ViewPreset }[] = [
    { label: "Top", value: "top" },
    { label: "Front", value: "front" },
    { label: "Side", value: "side" },
    { label: "Iso", value: "isometric" },
  ]

  const tools: { label: string; value: ActiveTool; icon: React.ReactNode }[] = [
    { label: "Select", value: "select", icon: <Crosshair className="h-4 w-4" /> },
    { label: "Distance", value: "measure_distance", icon: <Ruler className="h-4 w-4" /> },
    { label: "Angle", value: "measure_angle", icon: <Move3D className="h-4 w-4" /> },
  ]

  return (
    <TooltipProvider delayDuration={200}>
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
        {/* Tool selection */}
        <div
          className="flex flex-col gap-1 rounded-lg p-1.5"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.85)" }}
        >
          {tools.map((tool) => (
            <Tooltip key={tool.value}>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTool === tool.value ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setActiveTool(tool.value)}
                  style={
                    activeTool !== tool.value
                      ? { color: "#e2e8f0" }
                      : undefined
                  }
                >
                  {tool.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{tool.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Display toggles */}
        <div
          className="flex flex-col gap-1 rounded-lg p-1.5"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.85)" }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleGrid}
                style={{ color: showGrid ? "#4a9eff" : "#64748b" }}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle Grid</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleAxes}
                style={{ color: showAxes ? "#4a9eff" : "#64748b" }}
              >
                <Axis3D className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle Axes</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleLabels}
                style={{ color: showLabels ? "#4a9eff" : "#64748b" }}
              >
                <Type className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle Labels</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleWireframe}
                style={{ color: wireframeMode ? "#4a9eff" : "#64748b" }}
              >
                <Box className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Wireframe Mode</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {/* View presets */}
        <div
          className="flex items-center gap-1 rounded-lg px-2 py-1.5"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.85)" }}
        >
          {viewPresets.map((preset) => (
            <Button
              key={preset.value}
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              style={{ color: "#e2e8f0" }}
              onClick={() => setViewPreset(preset.value)}
            >
              {preset.label}
            </Button>
          ))}

          <div className="mx-1 h-5 w-px" style={{ backgroundColor: "#334155" }} />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={resetCamera}
                style={{ color: "#e2e8f0" }}
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset Camera</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setAutoRotate(!autoRotate)}
                style={{ color: autoRotate ? "#4a9eff" : "#e2e8f0" }}
              >
                <Maximize className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Auto Rotate</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Opacity slider */}
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-1.5"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.85)" }}
        >
          <span className="text-xs" style={{ color: "#94a3b8" }}>
            Opacity
          </span>
          <Slider
            value={[globalOpacity]}
            onValueChange={([v]) => setGlobalOpacity(v)}
            min={0}
            max={1}
            step={0.05}
            className="w-24"
          />
          <span className="w-8 text-right text-xs" style={{ color: "#e2e8f0" }}>
            {Math.round(globalOpacity * 100)}%
          </span>
        </div>
      </div>
    </TooltipProvider>
  )
}
