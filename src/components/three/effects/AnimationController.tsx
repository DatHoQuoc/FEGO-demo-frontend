"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useSceneStore } from "@/stores/sceneStore"

/**
 * Drives simple entry animations for newly added nodes.
 * Newly added objects (from lastDiff.added) scale from 0 -> 1 over ~0.4s.
 */
export default function AnimationController() {
  const lastDiff = useSceneStore((s) => s.lastDiff)
  const addedIdsRef = useRef<Set<string>>(new Set())
  const progressRef = useRef<Map<string, number>>(new Map())

  // Track new additions
  if (lastDiff) {
    for (const node of lastDiff.added) {
      if (!addedIdsRef.current.has(node.id)) {
        addedIdsRef.current.add(node.id)
        progressRef.current.set(node.id, 0)
      }
    }
  }

  useFrame(({ scene }, delta) => {
    const toRemove: string[] = []

    progressRef.current.forEach((progress, id) => {
      const next = Math.min(progress + delta * 2.5, 1) // ~0.4s duration
      progressRef.current.set(id, next)

      // Ease-out cubic
      const t = 1 - Math.pow(1 - next, 3)

      scene.traverse((obj) => {
        if (obj.userData?.nodeId === id) {
          obj.scale.setScalar(t)
        }
      })

      if (next >= 1) {
        toRemove.push(id)
      }
    })

    for (const id of toRemove) {
      progressRef.current.delete(id)
      addedIdsRef.current.delete(id)
    }
  })

  return null
}
