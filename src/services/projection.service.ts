import type { Vector3Tuple } from "@/types/geometry3d.types"
import type { Point2D, ProjectionMethod, ProjectionAngle } from "@/types/geometry2d.types"

/**
 * Projects 3D coordinates to 2D based on the selected projection method.
 */
export function project3DTo2D(
  point3D: Vector3Tuple,
  method: ProjectionMethod,
  angle: ProjectionAngle,
  scale = 40
): Point2D {
  let p: Point2D

  switch (method) {
    case "isometric":
      p = isometricProjection(point3D)
      break
    case "orthographic_top":
      p = orthographicTop(point3D)
      break
    case "orthographic_front":
      p = orthographicFront(point3D)
      break
    case "orthographic_side":
      p = orthographicSide(point3D)
      break
    case "perspective":
      p = perspectiveProjection(point3D, angle.distance ?? 10)
      break
    case "custom":
      p = customProjection(point3D, angle)
      break
    default:
      p = { x: 0, y: 0, id: "" }
  }

  // Apply scale
  return { x: p.x * scale, y: -p.y * scale, id: p.id }
}

function isometricProjection(point3D: Vector3Tuple): Point2D {
  const [x, y, z] = point3D
  const angle30 = Math.PI / 6
  const x2d = (x - z) * Math.cos(angle30)
  const y2d = y + (x + z) * Math.sin(angle30)
  return { x: x2d, y: y2d, id: "" }
}

function orthographicTop(point3D: Vector3Tuple): Point2D {
  const [x, , z] = point3D
  return { x, y: z, id: "" }
}

function orthographicFront(point3D: Vector3Tuple): Point2D {
  const [x, y] = point3D
  return { x, y, id: "" }
}

function orthographicSide(point3D: Vector3Tuple): Point2D {
  const [, y, z] = point3D
  return { x: z, y, id: "" }
}

function perspectiveProjection(
  point3D: Vector3Tuple,
  distance: number
): Point2D {
  const [x, y, z] = point3D
  const d = Math.max(0.1, distance)
  const scale = d / (d + z)
  return { x: x * scale, y: y * scale, id: "" }
}

function customProjection(
  point3D: Vector3Tuple,
  angle: ProjectionAngle
): Point2D {
  const rotated = rotate3D(point3D, angle.theta, angle.phi)
  return orthographicFront(rotated)
}

function rotate3D(
  point: Vector3Tuple,
  thetaDeg: number,
  phiDeg: number
): Vector3Tuple {
  const theta = (thetaDeg * Math.PI) / 180
  const phi = (phiDeg * Math.PI) / 180
  const [x, y, z] = point

  // Rotate around Y axis (theta)
  const x1 = x * Math.cos(theta) + z * Math.sin(theta)
  const y1 = y
  const z1 = -x * Math.sin(theta) + z * Math.cos(theta)

  // Rotate around X axis (phi)
  const x2 = x1
  const y2 = y1 * Math.cos(phi) - z1 * Math.sin(phi)
  const z2 = y1 * Math.sin(phi) + z1 * Math.cos(phi)

  return [x2, y2, z2]
}

/**
 * Convert screen coordinates to canvas coordinates.
 */
export function screenToCanvas(
  screenPoint: { x: number; y: number },
  canvasRect: DOMRect,
  viewport: { zoom: number; pan: { x: number; y: number } }
): Point2D {
  const x = (screenPoint.x - canvasRect.left - viewport.pan.x) / viewport.zoom
  const y = (screenPoint.y - canvasRect.top - viewport.pan.y) / viewport.zoom
  return { x, y, id: "" }
}

/**
 * Snap a point to the nearest grid intersection.
 */
export function snapToGrid(
  point: Point2D,
  gridSize: number
): Point2D {
  return {
    ...point,
    x: Math.round(point.x / gridSize) * gridSize,
    y: Math.round(point.y / gridSize) * gridSize,
  }
}
