import type {
  GeometryGraph,
  GeometryDiff,
  GeometryNode,
} from "@/types/geometry3d.types"

/**
 * Deep-equal comparison for two values. Handles arrays, objects, and primitives.
 */
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (a == null || b == null) return false
  if (typeof a !== typeof b) return false

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((val, i) => deepEqual(val, b[i]))
  }

  if (typeof a === "object" && typeof b === "object") {
    const aObj = a as Record<string, unknown>
    const bObj = b as Record<string, unknown>
    const aKeys = Object.keys(aObj)
    const bKeys = Object.keys(bObj)
    if (aKeys.length !== bKeys.length) return false
    return aKeys.every((key) => deepEqual(aObj[key], bObj[key]))
  }

  return false
}

/**
 * Compute the partial changes between two geometry nodes.
 * Returns only the fields that differ.
 */
function computeNodeChanges(
  oldNode: GeometryNode,
  newNode: GeometryNode
): Partial<GeometryNode> | null {
  const changes: Record<string, unknown> = {}
  let hasChanges = false

  // Compare top-level fields
  const fields: (keyof GeometryNode)[] = [
    "type",
    "name",
    "coordinates",
    "dependencies",
  ]

  for (const field of fields) {
    if (!deepEqual(oldNode[field], newNode[field])) {
      changes[field] = newNode[field]
      hasChanges = true
    }
  }

  // Compare properties object (granular)
  if (!deepEqual(oldNode.properties, newNode.properties)) {
    changes.properties = newNode.properties
    hasChanges = true
  }

  return hasChanges ? (changes as Partial<GeometryNode>) : null
}

/**
 * Compute a Virtual DOM-style diff between old and new geometry graphs.
 *
 * Performance:
 * - Uses Map for O(1) lookups instead of Array.find (O(n))
 * - Only creates change entries for nodes that actually differ
 * - Suitable for graphs with 50+ nodes at 60fps
 */
export function computeDiff(
  oldGraph: GeometryGraph,
  newGraph: GeometryGraph
): GeometryDiff {
  const oldMap = new Map<string, GeometryNode>()
  for (const node of oldGraph.nodes) {
    oldMap.set(node.id, node)
  }

  const newMap = new Map<string, GeometryNode>()
  for (const node of newGraph.nodes) {
    newMap.set(node.id, node)
  }

  // Nodes in new graph but NOT in old → added
  const added: GeometryNode[] = []
  for (const node of newGraph.nodes) {
    if (!oldMap.has(node.id)) {
      added.push(node)
    }
  }

  // Nodes in old graph but NOT in new → removed
  const removed: string[] = []
  for (const node of oldGraph.nodes) {
    if (!newMap.has(node.id)) {
      removed.push(node.id)
    }
  }

  // Nodes in both → check for changes
  const changed: GeometryDiff["changed"] = []
  for (const newNode of newGraph.nodes) {
    const oldNode = oldMap.get(newNode.id)
    if (oldNode) {
      const nodeChanges = computeNodeChanges(oldNode, newNode)
      if (nodeChanges) {
        changed.push({ id: newNode.id, changes: nodeChanges })
      }
    }
  }

  return { added, removed, changed }
}

/**
 * Check if a diff is empty (no changes).
 */
export function isDiffEmpty(diff: GeometryDiff): boolean {
  return (
    diff.added.length === 0 &&
    diff.removed.length === 0 &&
    diff.changed.length === 0
  )
}

/**
 * Create an empty geometry graph.
 */
export function createEmptyGraph(): GeometryGraph {
  return {
    nodes: [],
    edges: [],
    metadata: {
      coordinateSystem: "cartesian",
      units: "units",
      bounds: {
        min: [-10, -10, -10],
        max: [10, 10, 10],
      },
    },
  }
}
