/**
 * threeScene.service.ts
 *
 * Utility service for imperative Three.js scene operations such as
 * raycasting, bounding-box calculations, and serialization.
 */
import * as THREE from "three"
import type { GeometryGraph, GeometryNode, Vector3Tuple } from "@/types/geometry3d.types"

// ─── Raycasting ────────────────────────────────────────────────
export function raycastScene(
  scene: THREE.Scene,
  camera: THREE.Camera,
  pointer: THREE.Vector2
): THREE.Intersection[] {
  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(pointer, camera)
  return raycaster.intersectObjects(scene.children, true)
}

/**
 * Find the GeometryNode id from a raycast hit by walking up the ancestor chain
 * and checking userData.nodeId.
 */
export function resolveNodeId(hit: THREE.Intersection): string | null {
  let current: THREE.Object3D | null = hit.object
  while (current) {
    if (current.userData?.nodeId) return current.userData.nodeId as string
    current = current.parent
  }
  return null
}

// ─── Bounding box ──────────────────────────────────────────────
export function computeSceneBounds(scene: THREE.Scene): THREE.Box3 {
  const box = new THREE.Box3()
  scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      const childBox = new THREE.Box3().setFromObject(obj)
      box.union(childBox)
    }
  })
  return box
}

export function computeSceneCenter(scene: THREE.Scene): THREE.Vector3 {
  const box = computeSceneBounds(scene)
  const center = new THREE.Vector3()
  box.getCenter(center)
  return center
}

// ─── Distance / angle helpers ──────────────────────────────────
export function distance3D(a: Vector3Tuple, b: Vector3Tuple): number {
  return Math.sqrt(
    (b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2 + (b[2] - a[2]) ** 2
  )
}

export function angleBetween3Points(
  a: Vector3Tuple,
  vertex: Vector3Tuple,
  b: Vector3Tuple
): number {
  const va = new THREE.Vector3(...a).sub(new THREE.Vector3(...vertex))
  const vb = new THREE.Vector3(...b).sub(new THREE.Vector3(...vertex))
  const rad = va.angleTo(vb)
  return THREE.MathUtils.radToDeg(rad)
}

// ─── Serialization ─────────────────────────────────────────────
export function graphToJSON(graph: GeometryGraph): string {
  return JSON.stringify(graph, null, 2)
}

export function graphFromJSON(json: string): GeometryGraph {
  return JSON.parse(json) as GeometryGraph
}

// ─── Node lookup helpers ───────────────────────────────────────
export function getNodesByType(
  graph: GeometryGraph,
  type: GeometryNode["type"]
): GeometryNode[] {
  return graph.nodes.filter((n) => n.type === type)
}

export function getConnectedNodes(
  graph: GeometryGraph,
  nodeId: string
): GeometryNode[] {
  const connectedIds = new Set<string>()
  for (const edge of graph.edges) {
    if (edge.from === nodeId) connectedIds.add(edge.to)
    if (edge.to === nodeId) connectedIds.add(edge.from)
  }
  return graph.nodes.filter((n) => connectedIds.has(n.id))
}
