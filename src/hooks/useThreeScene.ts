"use client"

import { useCallback, useEffect } from "react"
import { useSceneStore } from "@/stores/sceneStore"
import type { GeometryGraph, ViewPreset } from "@/types/geometry3d.types"

/**
 * Convenience hook wrapping common scene-store operations.
 * Provides typed actions plus keyboard shortcut handling.
 */
export function useThreeScene() {
  const {
    graph,
    selectedIds,
    hoveredId,
    camera,
    activeTool,
    showGrid,
    showAxes,
    showLabels,
    wireframeMode,
    globalOpacity,
    hiddenIds,
    ghostIds,
    lastDiff,
    measurements,
    setGraph,
    selectObject,
    deselectAll,
    setHovered,
    setActiveTool,
    setViewPreset,
    resetCamera,
    toggleGrid,
    toggleAxes,
    toggleLabels,
    toggleWireframe,
    setGlobalOpacity,
    toggleVisibility,
    toggleGhost,
    addMeasurement,
    clearMeasurements,
  } = useSceneStore()

  // ─── Keyboard shortcuts ────────────────────────────────────
  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return

      switch (e.key) {
        case "Escape":
          deselectAll()
          setActiveTool("select")
          break
        case "g":
          toggleGrid()
          break
        case "a":
          toggleAxes()
          break
        case "l":
          toggleLabels()
          break
        case "w":
          toggleWireframe()
          break
        case "1":
          setViewPreset("front")
          break
        case "3":
          setViewPreset("side")
          break
        case "7":
          setViewPreset("top")
          break
        case "5":
          setViewPreset("isometric")
          break
        case "d":
          setActiveTool("measure_distance")
          break
        case "m":
          setActiveTool("measure_angle")
          break
        case "s":
          setActiveTool("slice")
          break
        case "Delete":
        case "Backspace":
          if (selectedIds.length > 0) {
            // Hide selected objects
            for (const id of selectedIds) toggleVisibility(id)
          }
          break
        default:
          break
      }
    },
    [
      deselectAll,
      setActiveTool,
      toggleGrid,
      toggleAxes,
      toggleLabels,
      toggleWireframe,
      setViewPreset,
      selectedIds,
      toggleVisibility,
    ]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard)
    return () => window.removeEventListener("keydown", handleKeyboard)
  }, [handleKeyboard])

  return {
    // State
    graph,
    selectedIds,
    hoveredId,
    camera,
    activeTool,
    showGrid,
    showAxes,
    showLabels,
    wireframeMode,
    globalOpacity,
    hiddenIds,
    ghostIds,
    lastDiff,
    measurements,

    // Actions
    setGraph,
    selectObject,
    deselectAll,
    setHovered,
    setActiveTool,
    setViewPreset,
    resetCamera,
    toggleGrid,
    toggleAxes,
    toggleLabels,
    toggleWireframe,
    setGlobalOpacity,
    toggleVisibility,
    toggleGhost,
    addMeasurement,
    clearMeasurements,
  }
}
