export interface Point2D {
  x: number
  y: number
  id: string
  label?: string
}

export interface Line2D {
  from: Point2D
  to: Point2D
  id: string
  dashed?: boolean
  color?: string
}

export interface Polygon2D {
  vertices: Point2D[]
  id: string
  filled?: boolean
  color?: string
  opacity?: number
}

export interface Circle2D {
  center: Point2D
  radius: number
  id: string
  color?: string
  filled?: boolean
}

export interface Label2DData {
  text: string
  position: Point2D
  color?: string
  id: string
}

export interface Geometry2DGraph {
  points: Point2D[]
  lines: Line2D[]
  polygons: Polygon2D[]
  circles: Circle2D[]
  labels: Label2DData[]
}

export type ProjectionMethod =
  | "isometric"
  | "orthographic_top"
  | "orthographic_front"
  | "orthographic_side"
  | "perspective"
  | "custom"

export interface ProjectionAngle {
  theta: number // 0-360 degrees
  phi: number // 0-90 degrees
  distance?: number // for perspective
}

export type DrawingTool = "select" | "point" | "line" | "freehand" | "erase"

export interface DrawingAction {
  type: "add_point" | "add_line" | "add_polygon" | "remove" | "move"
  target: string
  data: unknown
  timestamp: number
}

export interface ViewportState {
  zoom: number
  pan: { x: number; y: number }
}
