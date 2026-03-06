import { create } from "zustand"
import type {
  GeometryGraph,
  GeometryNode,
  GeometryDiff,
  ActiveTool,
  ViewportMode,
  ViewPreset,
  CameraState,
  MeasurementResult,
  Vector3Tuple,
} from "@/types/geometry3d.types"
import { computeDiff, createEmptyGraph } from "@/utils/geometryDiff"

// ─── Scene store state ───────────────────────────────────────────
interface SceneState {
  // Graph data
  graph: GeometryGraph
  previousGraph: GeometryGraph
  lastDiff: GeometryDiff | null

  // Selection
  selectedIds: string[]
  hoveredId: string | null

  // Camera
  camera: CameraState
  autoRotate: boolean

  // Tools
  activeTool: ActiveTool
  measurements: MeasurementResult[]

  // Visibility
  hiddenIds: Set<string>
  ghostIds: Set<string>

  // Display
  globalOpacity: number
  showGrid: boolean
  showAxes: boolean
  showLabels: boolean
  wireframeMode: boolean
  viewportMode: ViewportMode

  // Actions
  setGraph: (graph: GeometryGraph) => void
  applyDiff: (diff: GeometryDiff) => void

  // Selection actions
  selectObject: (id: string, multiSelect?: boolean) => void
  deselectAll: () => void
  setHovered: (id: string | null) => void

  // Camera actions
  setCameraPosition: (position: Vector3Tuple) => void
  setCameraTarget: (target: Vector3Tuple) => void
  setAutoRotate: (enabled: boolean) => void
  setViewPreset: (preset: ViewPreset) => void
  resetCamera: () => void

  // Tool actions
  setActiveTool: (tool: ActiveTool) => void
  addMeasurement: (result: MeasurementResult) => void
  clearMeasurements: () => void

  // Visibility actions
  toggleVisibility: (id: string) => void
  toggleGhost: (id: string) => void
  setGlobalOpacity: (opacity: number) => void
  toggleGrid: () => void
  toggleAxes: () => void
  toggleLabels: () => void
  toggleWireframe: () => void
  setViewportMode: (mode: ViewportMode) => void

  // Utility
  getNodeById: (id: string) => GeometryNode | undefined
  getVisibleNodes: () => GeometryNode[]
}

const DEFAULT_CAMERA: CameraState = {
  position: [10, 10, 10],
  target: [0, 0, 0],
  fov: 50,
}

const VIEW_PRESETS: Record<ViewPreset, Vector3Tuple> = {
  top: [0, 15, 0],
  front: [0, 0, 15],
  side: [15, 0, 0],
  isometric: [10, 10, 10],
  custom: [10, 10, 10],
}

export const useSceneStore = create<SceneState>((set, get) => ({
  // Initial state
  graph: createEmptyGraph(),
  previousGraph: createEmptyGraph(),
  lastDiff: null,

  selectedIds: [],
  hoveredId: null,

  camera: { ...DEFAULT_CAMERA },
  autoRotate: false,

  activeTool: "select",
  measurements: [],

  hiddenIds: new Set(),
  ghostIds: new Set(),

  globalOpacity: 0.7,
  showGrid: true,
  showAxes: true,
  showLabels: true,
  wireframeMode: false,
  viewportMode: "single",

  // ─── Graph actions ──────────────────────────────────────────
  setGraph: (newGraph) => {
    const state = get()
    const diff = computeDiff(state.graph, newGraph)
    set({
      previousGraph: state.graph,
      graph: newGraph,
      lastDiff: diff,
    })
  },

  applyDiff: (diff) => {
    const state = get()
    const currentNodes = [...state.graph.nodes]

    // Remove
    const removedSet = new Set(diff.removed)
    const filtered = currentNodes.filter((n) => !removedSet.has(n.id))

    // Add
    const withAdded = [...filtered, ...diff.added]

    // Apply changes
    const final = withAdded.map((node) => {
      const change = diff.changed.find((c) => c.id === node.id)
      if (change) {
        return { ...node, ...change.changes }
      }
      return node
    })

    set({
      previousGraph: state.graph,
      graph: { ...state.graph, nodes: final },
      lastDiff: diff,
    })
  },

  // ─── Selection actions ──────────────────────────────────────
  selectObject: (id, multiSelect = false) => {
    set((state) => {
      if (multiSelect) {
        const isSelected = state.selectedIds.includes(id)
        return {
          selectedIds: isSelected
            ? state.selectedIds.filter((sid) => sid !== id)
            : [...state.selectedIds, id],
        }
      }
      return { selectedIds: [id] }
    })
  },

  deselectAll: () => set({ selectedIds: [] }),

  setHovered: (id) => set({ hoveredId: id }),

  // ─── Camera actions ─────────────────────────────────────────
  setCameraPosition: (position) =>
    set((state) => ({ camera: { ...state.camera, position } })),

  setCameraTarget: (target) =>
    set((state) => ({ camera: { ...state.camera, target } })),

  setAutoRotate: (enabled) => set({ autoRotate: enabled }),

  setViewPreset: (preset) =>
    set((state) => ({
      camera: {
        ...state.camera,
        position: VIEW_PRESETS[preset],
      },
    })),

  resetCamera: () => set({ camera: { ...DEFAULT_CAMERA } }),

  // ─── Tool actions ───────────────────────────────────────────
  setActiveTool: (tool) => set({ activeTool: tool }),

  addMeasurement: (result) =>
    set((state) => ({
      measurements: [...state.measurements, result],
    })),

  clearMeasurements: () => set({ measurements: [] }),

  // ─── Visibility actions ─────────────────────────────────────
  toggleVisibility: (id) =>
    set((state) => {
      const next = new Set(state.hiddenIds)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return { hiddenIds: next }
    }),

  toggleGhost: (id) =>
    set((state) => {
      const next = new Set(state.ghostIds)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return { ghostIds: next }
    }),

  setGlobalOpacity: (opacity) => set({ globalOpacity: opacity }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleAxes: () => set((state) => ({ showAxes: !state.showAxes })),
  toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),
  toggleWireframe: () =>
    set((state) => ({ wireframeMode: !state.wireframeMode })),
  setViewportMode: (mode) => set({ viewportMode: mode }),

  // ─── Utility ────────────────────────────────────────────────
  getNodeById: (id) => {
    return get().graph.nodes.find((n) => n.id === id)
  },

  getVisibleNodes: () => {
    const state = get()
    return state.graph.nodes.filter(
      (n) =>
        n.properties.visible !== false && !state.hiddenIds.has(n.id)
    )
  },
}))
