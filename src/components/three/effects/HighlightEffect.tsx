"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useSceneStore } from "@/stores/sceneStore"

/**
 * Renders a pulsing emissive outline around selected/hovered objects.
 * This is placed inside the R3F Canvas and scans children by userData.id.
 */
export default function HighlightEffect() {
  const selectedIds = useSceneStore((s) => s.selectedIds)
  const hoveredId = useSceneStore((s) => s.hoveredId)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ scene, clock }) => {
    const pulse = Math.sin(clock.elapsedTime * 4) * 0.3 + 0.7

    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return
      const id = obj.userData?.nodeId as string | undefined
      if (!id) return

      const mat = obj.material
      if (!mat || Array.isArray(mat)) return

      const m = mat as THREE.MeshStandardMaterial

      if (selectedIds.includes(id)) {
        m.emissive = new THREE.Color("#3b82f6")
        m.emissiveIntensity = pulse * 0.6
      } else if (hoveredId === id) {
        m.emissive = new THREE.Color("#60a5fa")
        m.emissiveIntensity = 0.25
      } else {
        m.emissive = new THREE.Color("#000000")
        m.emissiveIntensity = 0
      }
    })
  })

  return <group ref={groupRef} />
}
