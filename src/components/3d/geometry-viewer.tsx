"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { demoGraph } from "@/lib/demoGraph"
import { Button } from "@/components/ui/button"
import { Box, PenTool, Columns2, Maximize2, Minimize2 } from "lucide-react"

const Viewer3D = dynamic(() => import("@/components/three/Viewer3D"), { ssr: false })
const Viewer2D = dynamic(() => import("@/components/canvas2d/Viewer2D"), { ssr: false })

type ViewMode = "3d" | "2d" | "split"
type IntentionType = "observe" | "hint" | "solution" | "check" | null

interface GeometryViewerProps {
  intention?: IntentionType
  className?: string
  isExpanded?: boolean
  onToggleExpand?: () => void
}

export function GeometryViewer({
  intention,
  className,
  isExpanded = false,
  onToggleExpand,
}: GeometryViewerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("3d")

  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden ${className ?? ""}`}
      style={{ backgroundColor: "#0f172a" }}
    >
      {/* Header bar */}
      <header
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: "1px solid #1e293b" }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-bold tracking-tight" style={{ color: "#e2e8f0" }}>
            VisualEdu
          </h1>
          <span
            className="text-[10px] font-medium uppercase tracking-widest"
            style={{ color: "#475569" }}
          >
            Geometry Workspace
          </span>
          {intention && (
            <span
              className="rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest"
              style={{ backgroundColor: "#1e293b", color: "#94a3b8" }}
            >
              {intention}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1 rounded-lg p-0.5"
            style={{ backgroundColor: "#1e293b" }}
          >
            <ViewToggle
              icon={<Box className="h-3.5 w-3.5" />}
              label="3D"
              active={viewMode === "3d"}
              onClick={() => setViewMode("3d")}
            />
            <ViewToggle
              icon={<Columns2 className="h-3.5 w-3.5" />}
              label="Split"
              active={viewMode === "split"}
              onClick={() => setViewMode("split")}
            />
            <ViewToggle
              icon={<PenTool className="h-3.5 w-3.5" />}
              label="2D"
              active={viewMode === "2d"}
              onClick={() => setViewMode("2d")}
            />
          </div>

          {/* Expand / minimize chat button */}
          {onToggleExpand && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-md"
              onClick={onToggleExpand}
              title={isExpanded ? "Restore chat" : "Expand 3D"}
              style={{ color: "#64748b" }}
            >
              {isExpanded ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </Button>
          )}
        </div>
      </header>

      {/* Content area */}
      <div className="flex flex-1 overflow-hidden">
        {(viewMode === "3d" || viewMode === "split") && (
          <div
            className={viewMode === "split" ? "w-1/2" : "w-full"}
            style={{
              borderRight: viewMode === "split" ? "1px solid #1e293b" : undefined,
            }}
          >
            <Viewer3D graph={demoGraph} className="h-full w-full" />
          </div>
        )}

        {(viewMode === "2d" || viewMode === "split") && (
          <div className={`${viewMode === "split" ? "w-1/2" : "w-full"} p-2`}>
            <Viewer2D graph3D={demoGraph} className="h-full" />
          </div>
        )}
      </div>
    </div>
  )
}

function ViewToggle({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 gap-1.5 rounded-md px-2.5 text-xs"
      onClick={onClick}
      style={{
        backgroundColor: active ? "#0f172a" : "transparent",
        color: active ? "#e2e8f0" : "#64748b",
      }}
    >
      {icon}
      {label}
    </Button>
  )
}