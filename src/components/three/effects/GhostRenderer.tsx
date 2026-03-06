"use client"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useSceneStore } from "@/stores/sceneStore"

/**
 * Makes meshes marked as "ghost" appear translucent with a wireframe overlay.
 * Runs per-frame to apply the ghost style to objects in the ghostIds set.
 */
export default function GhostRenderer() {
  const ghostIds = useSceneStore((s) => s.ghostIds)

  useFrame(({ scene }) => {
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return
      const id = obj.userData?.nodeId as string | undefined
      if (!id) return

      const isGhost = ghostIds.has(id)
      const mat = obj.material

      if (!mat || Array.isArray(mat)) return
      const m = mat as THREE.MeshStandardMaterial

      if (isGhost) {
        m.transparent = true
        m.opacity = 0.15
        m.wireframe = true
        m.depthWrite = false
      } else {
        // Restore — only undo if this effect set it
        if (m.wireframe && m.opacity === 0.15) {
          m.wireframe = false
          m.opacity = 1
          m.depthWrite = true
        }
      }
    })
  })

  return null
}
