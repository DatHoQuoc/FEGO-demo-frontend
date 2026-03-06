import { create } from "zustand"
import type {
  ProjectionMethod,
  ProjectionAngle,
  DrawingTool,
  Geometry2DGraph,
  Point2D,
  Line2D,
  ViewportState,
  DrawingAction,
} from "@/types/geometry2d.types"

interface Canvas2DState {
  // Projection
  projectionMethod: ProjectionMethod
  projectionAngle: ProjectionAngle
  syncWith3D: boolean
  showProjectionLines: boolean

  // Viewport
  viewport: ViewportState

  // Drawing
  activeTool: DrawingTool
  snapToGrid: boolean
  gridSize: number
  drawingColor: string
  drawingWidth: number

  // Graph (student drawings)
  studentGraph: Geometry2DGraph
  history: DrawingAction[]
  historyIndex: number

  // Projected graph (from 3D)
  projectedGraph: Geometry2DGraph

  // Actions - Projection
  setProjectionMethod: (method: ProjectionMethod) => void
  setProjectionAngle: (angle: ProjectionAngle) => void
  setSyncWith3D: (sync: boolean) => void
  setShowProjectionLines: (show: boolean) => void

  // Actions - Viewport
  setZoom: (zoom: number) => void
  setPan: (pan: { x: number; y: number }) => void
  zoomIn: () => void
  zoomOut: () => void
  resetViewport: () => void

  // Actions - Drawing
  setActiveTool: (tool: DrawingTool) => void
  setSnapToGrid: (snap: boolean) => void

  // Actions - Student drawings
  addPoint: (point: Point2D) => void
  addLine: (line: Line2D) => void
  clearStudentDrawings: () => void
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean

  // Actions - Projected graph
  setProjectedGraph: (graph: Geometry2DGraph) => void
}

const EMPTY_GRAPH: Geometry2DGraph = {
  points: [],
  lines: [],
  polygons: [],
  circles: [],
  labels: [],
}

export const useCanvas2DStore = create<Canvas2DState>((set, get) => ({
  // Initial state
  projectionMethod: "isometric",
  projectionAngle: { theta: 30, phi: 30, distance: 10 },
  syncWith3D: true,
  showProjectionLines: false,

  viewport: { zoom: 1, pan: { x: 0, y: 0 } },

  activeTool: "select",
  snapToGrid: true,
  gridSize: 40,
  drawingColor: "#e2e8f0",
  drawingWidth: 2,

  studentGraph: { ...EMPTY_GRAPH },
  history: [],
  historyIndex: -1,

  projectedGraph: { ...EMPTY_GRAPH },

  // Projection actions
  setProjectionMethod: (method) => set({ projectionMethod: method }),
  setProjectionAngle: (angle) => set({ projectionAngle: angle }),
  setSyncWith3D: (sync) => set({ syncWith3D: sync }),
  setShowProjectionLines: (show) => set({ showProjectionLines: show }),

  // Viewport actions
  setZoom: (zoom) =>
    set((s) => ({ viewport: { ...s.viewport, zoom: Math.max(0.3, Math.min(3, zoom)) } })),
  setPan: (pan) => set((s) => ({ viewport: { ...s.viewport, pan } })),
  zoomIn: () =>
    set((s) => ({
      viewport: { ...s.viewport, zoom: Math.min(3, s.viewport.zoom + 0.1) },
    })),
  zoomOut: () =>
    set((s) => ({
      viewport: { ...s.viewport, zoom: Math.max(0.3, s.viewport.zoom - 0.1) },
    })),
  resetViewport: () => set({ viewport: { zoom: 1, pan: { x: 0, y: 0 } } }),

  // Drawing actions
  setActiveTool: (tool) => set({ activeTool: tool }),
  setSnapToGrid: (snap) => set({ snapToGrid: snap }),

  // Student drawing actions
  addPoint: (point) =>
    set((s) => {
      const action: DrawingAction = {
        type: "add_point",
        target: point.id,
        data: point,
        timestamp: Date.now(),
      }
      const newHistory = s.history.slice(0, s.historyIndex + 1)
      return {
        studentGraph: {
          ...s.studentGraph,
          points: [...s.studentGraph.points, point],
        },
        history: [...newHistory, action],
        historyIndex: newHistory.length,
      }
    }),

  addLine: (line) =>
    set((s) => {
      const action: DrawingAction = {
        type: "add_line",
        target: line.id,
        data: line,
        timestamp: Date.now(),
      }
      const newHistory = s.history.slice(0, s.historyIndex + 1)
      return {
        studentGraph: {
          ...s.studentGraph,
          lines: [...s.studentGraph.lines, line],
        },
        history: [...newHistory, action],
        historyIndex: newHistory.length,
      }
    }),

  clearStudentDrawings: () =>
    set({
      studentGraph: { ...EMPTY_GRAPH },
      history: [],
      historyIndex: -1,
    }),

  undo: () => {
    const state = get()
    if (state.historyIndex < 0) return
    const action = state.history[state.historyIndex]
    if (!action) return

    set((s) => {
      const graph = { ...s.studentGraph }
      if (action.type === "add_point") {
        graph.points = graph.points.filter((p) => p.id !== action.target)
      } else if (action.type === "add_line") {
        graph.lines = graph.lines.filter((l) => l.id !== action.target)
      }
      return { studentGraph: graph, historyIndex: s.historyIndex - 1 }
    })
  },

  redo: () => {
    const state = get()
    if (state.historyIndex >= state.history.length - 1) return
    const action = state.history[state.historyIndex + 1]
    if (!action) return

    set((s) => {
      const graph = { ...s.studentGraph }
      if (action.type === "add_point") {
        graph.points = [...graph.points, action.data as Point2D]
      } else if (action.type === "add_line") {
        graph.lines = [...graph.lines, action.data as Line2D]
      }
      return { studentGraph: graph, historyIndex: s.historyIndex + 1 }
    })
  },

  canUndo: () => get().historyIndex >= 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  setProjectedGraph: (graph) => set({ projectedGraph: graph }),
}))
