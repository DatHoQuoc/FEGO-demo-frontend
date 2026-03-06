"use client"

import { useSceneStore } from "@/stores/sceneStore"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, EyeOff, Ghost } from "lucide-react"

const TYPE_ICONS: Record<string, string> = {
  point: "\u25CF",
  line: "\u2500",
  plane: "\u25B1",
  vector: "\u2192",
  polygon: "\u25B3",
  solid: "\u25A0",
  sphere: "\u25CB",
  cylinder: "\u25AD",
  cone: "\u25B2",
}

export default function ObjectListPanel() {
  const graph = useSceneStore((s) => s.graph)
  const selectedIds = useSceneStore((s) => s.selectedIds)
  const hiddenIds = useSceneStore((s) => s.hiddenIds)
  const ghostIds = useSceneStore((s) => s.ghostIds)
  const selectObject = useSceneStore((s) => s.selectObject)
  const toggleVisibility = useSceneStore((s) => s.toggleVisibility)
  const toggleGhost = useSceneStore((s) => s.toggleGhost)

  if (graph.nodes.length === 0) return null

  return (
    <div
      className="absolute right-3 top-3 z-10 w-56 rounded-lg"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.9)" }}
    >
      <div className="border-b px-3 py-2" style={{ borderColor: "#1e293b" }}>
        <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
          Objects ({graph.nodes.length})
        </h3>
      </div>

      <ScrollArea className="max-h-72">
        <div className="flex flex-col gap-0.5 p-1.5">
          {graph.nodes.map((node) => {
            const isSelected = selectedIds.includes(node.id)
            const isHidden = hiddenIds.has(node.id)
            const isGhost = ghostIds.has(node.id)

            return (
              <div
                key={node.id}
                className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors"
                style={{
                  backgroundColor: isSelected
                    ? "rgba(74, 158, 255, 0.2)"
                    : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => selectObject(node.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") selectObject(node.id)
                }}
              >
                {/* Type icon */}
                <span
                  className="w-4 text-center text-sm"
                  style={{ color: node.properties.color ?? "#e2e8f0" }}
                >
                  {TYPE_ICONS[node.type] ?? "?"}
                </span>

                {/* Name */}
                <span
                  className="flex-1 truncate text-xs"
                  style={{
                    color: isHidden ? "#475569" : "#e2e8f0",
                  }}
                >
                  {node.name}
                </span>

                {/* Ghost toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleGhost(node.id)
                  }}
                  style={{ color: isGhost ? "#4a9eff" : "#475569" }}
                >
                  <Ghost className="h-3 w-3" />
                </Button>

                {/* Visibility toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleVisibility(node.id)
                  }}
                  style={{ color: isHidden ? "#475569" : "#94a3b8" }}
                >
                  {isHidden ? (
                    <EyeOff className="h-3 w-3" />
                  ) : (
                    <Eye className="h-3 w-3" />
                  )}
                </Button>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
