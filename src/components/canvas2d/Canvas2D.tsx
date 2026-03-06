"use client"

import React from "react"

import { useRef, useCallback, useEffect, useMemo, useState } from "react"
import type { GeometryGraph, Vector3Tuple } from "@/types/geometry3d.types"
import type { Point2D, Geometry2DGraph } from "@/types/geometry2d.types"
import { project3DTo2D } from "@/services/projection.service"
import { useCanvas2DStore } from "@/stores/canvas2dStore"

interface Canvas2DProps {
  graph3D: GeometryGraph
  width?: number
  height?: number
  externalSvgRef?: React.RefObject<SVGSVGElement | null>
}

export default function Canvas2D({
  graph3D,
  width = 600,
  height = 500,
  externalSvgRef,
}: Canvas2DProps) {
  const internalRef = useRef<SVGSVGElement>(null)
  const svgRef = externalSvgRef ?? internalRef
  const [isPanning, setIsPanning] = useState(false)
  const panStart = useRef({ x: 0, y: 0 })

  const projectionMethod = useCanvas2DStore((s) => s.projectionMethod)
  const projectionAngle = useCanvas2DStore((s) => s.projectionAngle)
  const viewport = useCanvas2DStore((s) => s.viewport)
  const setPan = useCanvas2DStore((s) => s.setPan)
  const setZoom = useCanvas2DStore((s) => s.setZoom)
  const showProjectionLines = useCanvas2DStore((s) => s.showProjectionLines)
  const studentGraph = useCanvas2DStore((s) => s.studentGraph)
  const activeTool = useCanvas2DStore((s) => s.activeTool)
  const snapToGridEnabled = useCanvas2DStore((s) => s.snapToGrid)
  const gridSize = useCanvas2DStore((s) => s.gridSize)
  const addPoint = useCanvas2DStore((s) => s.addPoint)
  const addLine = useCanvas2DStore((s) => s.addLine)
  const setProjectedGraph = useCanvas2DStore((s) => s.setProjectedGraph)

  const [lineStart, setLineStart] = useState<Point2D | null>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)

  const centerX = width / 2
  const centerY = height / 2

  // Project all 3D nodes to 2D
  const projectedGraph = useMemo<Geometry2DGraph>(() => {
    const points: Point2D[] = []
    const lines: Geometry2DGraph["lines"] = []
    const polygons: Geometry2DGraph["polygons"] = []

    // Project points and lines from the geometry graph
    for (const node of graph3D.nodes) {
      if (node.properties.visible === false) continue

      if (node.type === "point") {
        const p = project3DTo2D(node.coordinates, projectionMethod, projectionAngle)
        points.push({ ...p, id: node.id, label: node.name })
      }

      if (node.type === "line") {
        const from = node.properties.from as Vector3Tuple | undefined
        const to = node.properties.to as Vector3Tuple | undefined
        if (from && to) {
          const p1 = project3DTo2D(from, projectionMethod, projectionAngle)
          const p2 = project3DTo2D(to, projectionMethod, projectionAngle)
          lines.push({
            from: { ...p1, id: `${node.id}-from` },
            to: { ...p2, id: `${node.id}-to` },
            id: node.id,
            dashed: !!node.properties.dashed,
            color: node.properties.color as string | undefined,
          })
        }
      }

      if (node.type === "solid" || node.type === "polygon") {
        const verts = node.properties.vertices as Vector3Tuple[] | undefined
        const faces = node.properties.faces as number[][] | undefined
        if (verts && faces) {
          const projected = verts.map((v, i) => {
            const p = project3DTo2D(v, projectionMethod, projectionAngle)
            return { ...p, id: `${node.id}-v${i}` }
          })

          for (const face of faces) {
            const faceVerts = face.map((idx) => projected[idx]).filter(Boolean)
            if (faceVerts.length >= 3) {
              polygons.push({
                vertices: faceVerts,
                id: `${node.id}-face-${face.join("-")}`,
                filled: true,
                color: node.properties.color as string | undefined,
                opacity: 0.15,
              })
            }
          }

          // Draw edges
          for (const face of faces) {
            for (let i = 0; i < face.length; i++) {
              const a = face[i]
              const b = face[(i + 1) % face.length]
              if (projected[a] && projected[b]) {
                const lineId = `${node.id}-e-${Math.min(a, b)}-${Math.max(a, b)}`
                if (!lines.find((l) => l.id === lineId)) {
                  lines.push({
                    from: projected[a],
                    to: projected[b],
                    id: lineId,
                    color: "#94a3b8",
                  })
                }
              }
            }
          }
        }
      }
    }

    const result: Geometry2DGraph = {
      points,
      lines,
      polygons,
      circles: [],
      labels: [],
    }
    return result
  }, [graph3D, projectionMethod, projectionAngle])

  useEffect(() => {
    setProjectedGraph(projectedGraph)
  }, [projectedGraph, setProjectedGraph])

  // Handle mouse wheel zoom
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      setZoom(viewport.zoom + delta)
    },
    [viewport.zoom, setZoom]
  )

  // Handle pan
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (activeTool === "select" || e.button === 1) {
        setIsPanning(true)
        panStart.current = { x: e.clientX - viewport.pan.x, y: e.clientY - viewport.pan.y }
      }
    },
    [activeTool, viewport.pan]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = svgRef.current?.getBoundingClientRect()
      if (rect) {
        setMousePos({
          x: (e.clientX - rect.left - centerX - viewport.pan.x) / viewport.zoom,
          y: (e.clientY - rect.top - centerY - viewport.pan.y) / viewport.zoom,
        })
      }

      if (isPanning) {
        setPan({
          x: e.clientX - panStart.current.x,
          y: e.clientY - panStart.current.y,
        })
      }
    },
    [isPanning, setPan, centerX, centerY, viewport]
  )

  const handleMouseUp = useCallback(() => {
    setIsPanning(false)
  }, [])

  // Handle drawing clicks
  const handleSVGClick = useCallback(
    (e: React.MouseEvent) => {
      if (activeTool === "select" || isPanning) return

      const rect = svgRef.current?.getBoundingClientRect()
      if (!rect) return

      let x = (e.clientX - rect.left - centerX - viewport.pan.x) / viewport.zoom
      let y = (e.clientY - rect.top - centerY - viewport.pan.y) / viewport.zoom

      if (snapToGridEnabled) {
        x = Math.round(x / gridSize) * gridSize
        y = Math.round(y / gridSize) * gridSize
      }

      const point: Point2D = {
        x,
        y,
        id: `sp-${Date.now()}`,
        label: String.fromCharCode(65 + studentGraph.points.length),
      }

      if (activeTool === "point") {
        addPoint(point)
      } else if (activeTool === "line") {
        if (!lineStart) {
          setLineStart(point)
        } else {
          addLine({
            from: lineStart,
            to: point,
            id: `sl-${Date.now()}`,
          })
          setLineStart(null)
        }
      }
    },
    [
      activeTool,
      isPanning,
      viewport,
      centerX,
      centerY,
      snapToGridEnabled,
      gridSize,
      studentGraph.points.length,
      addPoint,
      addLine,
      lineStart,
    ]
  )

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="select-none rounded-lg"
      style={{
        backgroundColor: "#f8fafc",
        cursor:
          activeTool === "select"
            ? isPanning
              ? "grabbing"
              : "grab"
            : "crosshair",
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleSVGClick}
    >
      <g transform={`translate(${centerX + viewport.pan.x}, ${centerY + viewport.pan.y}) scale(${viewport.zoom})`}>
        {/* Grid */}
        <GridPattern gridSize={gridSize} width={width} height={height} zoom={viewport.zoom} />

        {/* Axes */}
        <line
          x1={-width}
          y1={0}
          x2={width}
          y2={0}
          stroke="#94a3b8"
          strokeWidth={1 / viewport.zoom}
        />
        <line
          x1={0}
          y1={-height}
          x2={0}
          y2={height}
          stroke="#94a3b8"
          strokeWidth={1 / viewport.zoom}
        />

        {/* Axis labels */}
        <text x={width / viewport.zoom - 20} y={-8} fill="#64748b" fontSize={12 / viewport.zoom}>
          x
        </text>
        <text x={8} y={-height / viewport.zoom + 20} fill="#64748b" fontSize={12 / viewport.zoom}>
          y
        </text>

        {/* Projected polygons (faces) */}
        {projectedGraph.polygons.map((poly) => (
          <polygon
            key={poly.id}
            points={poly.vertices.map((v) => `${v.x},${v.y}`).join(" ")}
            fill={poly.color ?? "#f97316"}
            fillOpacity={poly.opacity ?? 0.15}
            stroke={poly.color ?? "#f97316"}
            strokeWidth={0.5 / viewport.zoom}
            strokeOpacity={0.3}
          />
        ))}

        {/* Projected lines */}
        {projectedGraph.lines.map((line) => (
          <line
            key={line.id}
            x1={line.from.x}
            y1={line.from.y}
            x2={line.to.x}
            y2={line.to.y}
            stroke={line.color ?? "#334155"}
            strokeWidth={1.5 / viewport.zoom}
            strokeDasharray={line.dashed ? `${4 / viewport.zoom} ${3 / viewport.zoom}` : undefined}
          />
        ))}

        {/* Projected points */}
        {projectedGraph.points.map((pt) => (
          <g key={pt.id}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r={4 / viewport.zoom}
              fill="#1e40af"
              stroke="#f8fafc"
              strokeWidth={1 / viewport.zoom}
            />
            {pt.label && (
              <text
                x={pt.x + 8 / viewport.zoom}
                y={pt.y - 8 / viewport.zoom}
                fill="#1e293b"
                fontSize={13 / viewport.zoom}
                fontWeight="600"
              >
                {pt.label}
              </text>
            )}
          </g>
        ))}

        {/* Projection lines (educational) */}
        {showProjectionLines &&
          projectedGraph.points.map((pt) => (
            <line
              key={`proj-${pt.id}`}
              x1={pt.x}
              y1={pt.y}
              x2={pt.x}
              y2={0}
              stroke="#06b6d4"
              strokeWidth={0.5 / viewport.zoom}
              strokeDasharray={`${3 / viewport.zoom} ${2 / viewport.zoom}`}
              opacity={0.5}
            />
          ))}

        {/* Student drawing - lines */}
        {studentGraph.lines.map((line) => (
          <line
            key={line.id}
            x1={line.from.x}
            y1={line.from.y}
            x2={line.to.x}
            y2={line.to.y}
            stroke={line.color ?? "#dc2626"}
            strokeWidth={2 / viewport.zoom}
          />
        ))}

        {/* Student drawing - points */}
        {studentGraph.points.map((pt) => (
          <g key={pt.id}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r={4 / viewport.zoom}
              fill="#dc2626"
              stroke="#f8fafc"
              strokeWidth={1 / viewport.zoom}
            />
            {pt.label && (
              <text
                x={pt.x + 8 / viewport.zoom}
                y={pt.y - 8 / viewport.zoom}
                fill="#dc2626"
                fontSize={12 / viewport.zoom}
                fontWeight="600"
              >
                {pt.label}
              </text>
            )}
          </g>
        ))}

        {/* Line tool preview */}
        {activeTool === "line" && lineStart && mousePos && (
          <line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={mousePos.x}
            y2={mousePos.y}
            stroke="#dc2626"
            strokeWidth={1.5 / viewport.zoom}
            strokeDasharray={`${4 / viewport.zoom} ${2 / viewport.zoom}`}
            opacity={0.6}
          />
        )}
      </g>
    </svg>
  )
}

function GridPattern({
  gridSize,
  width,
  height,
  zoom,
}: {
  gridSize: number
  width: number
  height: number
  zoom: number
}) {
  const extent = Math.max(width, height) / zoom + gridSize * 2
  const lines = []
  const count = Math.ceil(extent / gridSize)

  for (let i = -count; i <= count; i++) {
    const pos = i * gridSize
    const isMajor = i % 5 === 0
    lines.push(
      <line
        key={`gv-${i}`}
        x1={pos}
        y1={-extent}
        x2={pos}
        y2={extent}
        stroke={isMajor ? "#cbd5e1" : "#e2e8f0"}
        strokeWidth={(isMajor ? 0.8 : 0.4) / zoom}
      />,
      <line
        key={`gh-${i}`}
        x1={-extent}
        y1={pos}
        x2={extent}
        y2={pos}
        stroke={isMajor ? "#cbd5e1" : "#e2e8f0"}
        strokeWidth={(isMajor ? 0.8 : 0.4) / zoom}
      />
    )
  }

  return <g>{lines}</g>
}
