import type { Vector3 as ThreeVector3 } from "three"

// ─── Core vector type ────────────────────────────────────────────
export type Vector3Tuple = [number, number, number]
export type Vector3 = Vector3Tuple | ThreeVector3

// ─── Graph structure ─────────────────────────────────────────────
export interface GeometryGraph {
  nodes: GeometryNode[]
  edges: GeometryEdge[]
  metadata: GraphMetadata
}

export type GeometryNodeType =
  | "point"
  | "line"
  | "plane"
  | "vector"
  | "solid"
  | "polygon"
  | "sphere"
  | "cylinder"
  | "cone"

export interface GeometryNode {
  id: string
  type: GeometryNodeType
  name: string
  coordinates: Vector3Tuple
  properties: GeometryNodeProperties
  dependencies?: string[]
}

export interface GeometryNodeProperties {
  color?: string
  opacity?: number
  visible?: boolean
  locked?: boolean
  // Line-specific
  from?: Vector3Tuple
  to?: Vector3Tuple
  dashed?: boolean
  // Plane-specific
  equation?: [number, number, number, number] // ax + by + cz + d = 0
  boundingPoints?: Vector3Tuple[]
  // Vector-specific
  origin?: Vector3Tuple
  direction?: Vector3Tuple
  length?: number
  // Polygon-specific
  vertices?: Vector3Tuple[]
  filled?: boolean
  // Solid-specific
  solidType?: "pyramid" | "prism" | "tetrahedron" | "cube" | "custom"
  faces?: number[][]
  // Sphere-specific
  center?: Vector3Tuple
  radius?: number
  // Cylinder-specific
  baseCenter?: Vector3Tuple
  topCenter?: Vector3Tuple
  // Cone-specific
  apex?: Vector3Tuple
  [key: string]: unknown
}

export interface GeometryEdge {
  from: string
  to: string
  relationship: "contains" | "intersects" | "parallel" | "perpendicular"
}

export interface GraphMetadata {
  coordinateSystem: "cartesian" | "cylindrical" | "spherical"
  units: string
  bounds: {
    min: Vector3Tuple
    max: Vector3Tuple
  }
}

// ─── Diffing ─────────────────────────────────────────────────────
export interface GeometryDiff {
  added: GeometryNode[]
  removed: string[]
  changed: Array<{
    id: string
    changes: Partial<GeometryNode>
  }>
}

// ─── Measurement ─────────────────────────────────────────────────
export interface MeasurementResult {
  type: "distance" | "angle"
  value: number
  unit: string
  points: Vector3Tuple[]
}

// ─── Scene state ─────────────────────────────────────────────────
export type ActiveTool =
  | "select"
  | "measure_distance"
  | "measure_angle"
  | "slice"
  | "none"

export type ViewportMode = "single" | "quad"

export type ViewPreset = "top" | "front" | "side" | "isometric" | "custom"

export interface CameraState {
  position: Vector3Tuple
  target: Vector3Tuple
  fov: number
}
