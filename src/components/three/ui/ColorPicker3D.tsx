"use client"

import { useSceneStore } from "@/stores/sceneStore"

const PALETTE = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#f1f5f9", "#94a3b8", "#475569", "#1e293b",
]

export default function ColorPicker3D() {
  const selectedIds = useSceneStore((s) => s.selectedIds)
  const graph = useSceneStore((s) => s.graph)
  const setGraph = useSceneStore((s) => s.setGraph)

  const handleColorChange = (color: string) => {
    if (selectedIds.length === 0) return
    const updated = {
      ...graph,
      nodes: graph.nodes.map((n) =>
        selectedIds.includes(n.id)
          ? { ...n, properties: { ...n.properties, color } }
          : n
      ),
    }
    setGraph(updated)
  }

  const selectedNode = selectedIds.length === 1
    ? graph.nodes.find((n) => n.id === selectedIds[0])
    : null

  const currentColor = selectedNode?.properties.color ?? "#3b82f6"

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium" style={{ color: "#94a3b8" }}>
        Color {selectedIds.length === 0 && "(select object)"}
      </label>
      <div className="grid grid-cols-6 gap-1.5">
        {PALETTE.map((color) => (
          <button
            key={color}
            type="button"
            className="h-6 w-6 rounded-md border-2 transition-transform hover:scale-110"
            style={{
              backgroundColor: color,
              borderColor: currentColor === color ? "#fff" : "transparent",
            }}
            onClick={() => handleColorChange(color)}
            disabled={selectedIds.length === 0}
            aria-label={`Set color to ${color}`}
          />
        ))}
      </div>
    </div>
  )
}
