"use client"

import { memo } from "react"
import { Html } from "@react-three/drei"
import type { GeometryNode, Vector3Tuple } from "@/types/geometry3d.types"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AnnotationPanel3DProps {
  object: GeometryNode
  position: Vector3Tuple
  onClose?: () => void
}

function formatCoords(v: Vector3Tuple): string {
  return `(${v[0].toFixed(2)}, ${v[1].toFixed(2)}, ${v[2].toFixed(2)})`
}

function AnnotationPanel3D({ object, position, onClose }: AnnotationPanel3DProps) {
  return (
    <Html position={position} center distanceFactor={10}>
      <div
        className="pointer-events-auto min-w-[180px] rounded-lg border p-3 text-xs shadow-xl"
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          borderColor: "rgba(148, 163, 184, 0.3)",
          color: "#f8fafc",
        }}
      >
        {/* Header */}
        <div className="mb-2 flex items-center justify-between gap-3">
          <h4 className="font-bold text-sm">{object.name}</h4>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 shrink-0"
              onClick={onClose}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Type badge */}
        <span
          className="mb-2 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
          style={{ backgroundColor: "rgba(59, 130, 246, 0.3)", color: "#93c5fd" }}
        >
          {object.type}
        </span>

        {/* Properties table */}
        <dl className="mt-2 space-y-1">
          {/* Coordinates */}
          <div className="flex justify-between gap-2">
            <dt className="text-slate-400">Position</dt>
            <dd className="font-mono">{formatCoords(object.coordinates)}</dd>
          </div>

          {/* Equation for plane */}
          {object.properties.equation && (
            <div className="flex justify-between gap-2">
              <dt className="text-slate-400">Equation</dt>
              <dd className="font-mono text-[10px]">
                {`${object.properties.equation[0]}x + ${object.properties.equation[1]}y + ${object.properties.equation[2]}z + ${object.properties.equation[3]} = 0`}
              </dd>
            </div>
          )}

          {/* From/To for lines */}
          {object.properties.from && object.properties.to && (
            <>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">From</dt>
                <dd className="font-mono">{formatCoords(object.properties.from)}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">To</dt>
                <dd className="font-mono">{formatCoords(object.properties.to)}</dd>
              </div>
            </>
          )}

          {/* Radius for sphere/cylinder/cone */}
          {object.properties.radius != null && (
            <div className="flex justify-between gap-2">
              <dt className="text-slate-400">Radius</dt>
              <dd className="font-mono">{object.properties.radius}</dd>
            </div>
          )}

          {/* Opacity */}
          {object.properties.opacity != null && (
            <div className="flex justify-between gap-2">
              <dt className="text-slate-400">Opacity</dt>
              <dd className="font-mono">{(object.properties.opacity * 100).toFixed(0)}%</dd>
            </div>
          )}

          {/* Dependencies */}
          {object.dependencies && object.dependencies.length > 0 && (
            <div className="flex justify-between gap-2">
              <dt className="text-slate-400">Deps</dt>
              <dd className="font-mono">{object.dependencies.join(", ")}</dd>
            </div>
          )}
        </dl>

        {/* Arrow pointing down */}
        <div
          className="absolute left-1/2 -bottom-1.5 h-3 w-3 -translate-x-1/2 rotate-45"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.92)" }}
        />
      </div>
    </Html>
  )
}

export default memo(AnnotationPanel3D)
