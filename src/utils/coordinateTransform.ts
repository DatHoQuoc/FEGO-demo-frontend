import type { Vector3Tuple } from "@/types/geometry3d.types"

/**
 * Compute Euclidean distance between two 3D points.
 */
export function distance3D(a: Vector3Tuple, b: Vector3Tuple): number {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const dz = b[2] - a[2]
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

/**
 * Compute the angle (in degrees) at vertex B formed by points A-B-C.
 */
export function angleBetween(
  a: Vector3Tuple,
  b: Vector3Tuple,
  c: Vector3Tuple
): number {
  const ba: Vector3Tuple = [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
  const bc: Vector3Tuple = [c[0] - b[0], c[1] - b[1], c[2] - b[2]]

  const dot = ba[0] * bc[0] + ba[1] * bc[1] + ba[2] * bc[2]
  const magBA = Math.sqrt(ba[0] ** 2 + ba[1] ** 2 + ba[2] ** 2)
  const magBC = Math.sqrt(bc[0] ** 2 + bc[1] ** 2 + bc[2] ** 2)

  if (magBA === 0 || magBC === 0) return 0
  const cosAngle = Math.max(-1, Math.min(1, dot / (magBA * magBC)))
  return (Math.acos(cosAngle) * 180) / Math.PI
}

/**
 * Compute midpoint between two 3D points.
 */
export function midpoint3D(
  a: Vector3Tuple,
  b: Vector3Tuple
): Vector3Tuple {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]
}

/**
 * Normalize a 3D vector.
 */
export function normalize3D(v: Vector3Tuple): Vector3Tuple {
  const mag = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2)
  if (mag === 0) return [0, 0, 0]
  return [v[0] / mag, v[1] / mag, v[2] / mag]
}

/**
 * Cross product of two 3D vectors.
 */
export function cross3D(
  a: Vector3Tuple,
  b: Vector3Tuple
): Vector3Tuple {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]
}

/**
 * Add two 3D vectors.
 */
export function add3D(
  a: Vector3Tuple,
  b: Vector3Tuple
): Vector3Tuple {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

/**
 * Subtract b from a.
 */
export function sub3D(
  a: Vector3Tuple,
  b: Vector3Tuple
): Vector3Tuple {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

/**
 * Scale a 3D vector.
 */
export function scale3D(v: Vector3Tuple, s: number): Vector3Tuple {
  return [v[0] * s, v[1] * s, v[2] * s]
}
