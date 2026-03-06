"use client"

import React from "react"

import { useEffect } from "react"
import { useCanvas2DStore } from "@/stores/canvas2dStore"
import type { DrawingTool } from "@/types/geometry2d.types"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MousePointer2, Circle, Minus, Pencil, Eraser, Undo2, Redo2, Trash2 } from "lucide-react"

const TOOLS: { value: DrawingTool; icon: React.ReactNode; label: string; shortcut: string }[] = [
  { value: "select", icon: <MousePointer2 className="h-4 w-4" />, label: "Select / Pan", shortcut: "V" },
  { value: "point", icon: <Circle className="h-4 w-4" />, label: "Place Point", shortcut: "P" },
  { value: "line", icon: <Minus className="h-4 w-4" />, label: "Draw Line", shortcut: "L" },
  { value: "freehand", icon: <Pencil className="h-4 w-4" />, label: "Freehand", shortcut: "F" },
  { value: "erase", icon: <Eraser className="h-4 w-4" />, label: "Erase", shortcut: "E" },
]

export default function DrawingToolbar() {
  const activeTool = useCanvas2DStore((s) => s.activeTool)
  const setActiveTool = useCanvas2DStore((s) => s.setActiveTool)
  const undo = useCanvas2DStore((s) => s.undo)
  const redo = useCanvas2DStore((s) => s.redo)
  const canUndo = useCanvas2DStore((s) => s.canUndo())
  const canRedo = useCanvas2DStore((s) => s.canRedo())
  const clearDrawings = useCanvas2DStore((s) => s.clearStudentDrawings)

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") {
          e.preventDefault()
          if (e.shiftKey) redo()
          else undo()
        }
        if (e.key === "y") {
          e.preventDefault()
          redo()
        }
        return
      }

      const shortcutMap: Record<string, DrawingTool> = {
        v: "select",
        p: "point",
        l: "line",
        f: "freehand",
        e: "erase",
      }
      const tool = shortcutMap[e.key.toLowerCase()]
      if (tool) setActiveTool(tool)
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [setActiveTool, undo, redo])

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className="flex flex-col items-center gap-1 rounded-lg p-1.5"
        style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b" }}
      >
        {TOOLS.map((tool) => {
          const isActive = activeTool === tool.value
          return (
            <Tooltip key={tool.value}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setActiveTool(tool.value)}
                  style={{
                    backgroundColor: isActive ? "#1e40af" : "transparent",
                    color: isActive ? "#ffffff" : "#94a3b8",
                  }}
                >
                  {tool.icon}
                  <span className="sr-only">{tool.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                {tool.label} ({tool.shortcut})
              </TooltipContent>
            </Tooltip>
          )
        })}

        <div className="my-1 h-px w-5" style={{ backgroundColor: "#334155" }} />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={undo}
              disabled={!canUndo}
              style={{ color: canUndo ? "#94a3b8" : "#334155" }}
            >
              <Undo2 className="h-4 w-4" />
              <span className="sr-only">Undo</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            Undo (Ctrl+Z)
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={redo}
              disabled={!canRedo}
              style={{ color: canRedo ? "#94a3b8" : "#334155" }}
            >
              <Redo2 className="h-4 w-4" />
              <span className="sr-only">Redo</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            Redo (Ctrl+Y)
          </TooltipContent>
        </Tooltip>

        <div className="my-1 h-px w-5" style={{ backgroundColor: "#334155" }} />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={clearDrawings}
              style={{ color: "#ef4444" }}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Clear all drawings</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            Clear Drawings
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
