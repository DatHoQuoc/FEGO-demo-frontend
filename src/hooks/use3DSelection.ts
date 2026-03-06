"use client"

import { useCallback } from "react"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useSceneStore } from "@/stores/sceneStore"
import { raycastScene, resolveNodeId } from "@/services/threeScene.service"

/**
 * Provides pointer-based selection of scene objects.
 * Returns handlers to attach to the R3F Canvas.
 */
export function use3DSelection() {
  const { camera, scene } = useThree()
  const selectObject = useSceneStore((s) => s.selectObject)
  const deselectAll = useSceneStore((s) => s.deselectAll)
  const setHovered = useSceneStore((s) => s.setHovered)
  const activeTool = useSceneStore((s) => s.activeTool)

  const onPointerDown = useCallback(
    (e: THREE.Event & { pointer?: THREE.Vector2; nativeEvent?: MouseEvent }) => {
      if (activeTool !== "select") return
      const pointer = e.pointer ?? new THREE.Vector2()
      const hits = raycastScene(scene, camera, pointer)
      if (hits.length === 0) {
        deselectAll()
        return
      }
      const nodeId = resolveNodeId(hits[0])
      if (nodeId) {
        const multi = !!(e.nativeEvent as MouseEvent | undefined)?.shiftKey
        selectObject(nodeId, multi)
      }
    },
    [activeTool, camera, scene, selectObject, deselectAll]
  )

  const onPointerMove = useCallback(
    (e: THREE.Event & { pointer?: THREE.Vector2 }) => {
      const pointer = e.pointer ?? new THREE.Vector2()
      const hits = raycastScene(scene, camera, pointer)
      if (hits.length === 0) {
        setHovered(null)
        return
      }
      const nodeId = resolveNodeId(hits[0])
      setHovered(nodeId)
    },
    [camera, scene, setHovered]
  )

  return { onPointerDown, onPointerMove }
}
