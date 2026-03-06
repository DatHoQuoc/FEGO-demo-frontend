"use client"

import { memo, useCallback } from "react"
import { useThree } from "@react-three/fiber"
import type { Intersection, Object3D } from "three"
import { useSceneStore } from "@/stores/sceneStore"

/**
 * SelectionTool - Raycaster-based click selection for geometry objects.
 * Renders nothing itself, but handles pointer events on the canvas.
 * Attach this component inside the R3F Canvas.
 */

function SelectionTool() {
  const { raycaster, camera, scene, pointer } = useThree()
  const selectObject = useSceneStore((s) => s.selectObject)
  const deselectAll = useSceneStore((s) => s.deselectAll)
  const activeTool = useSceneStore((s) => s.activeTool)

  const handlePointerDown = useCallback(
    (e: any) => {
      if (activeTool !== "select") return

      raycaster.setFromCamera(pointer, camera)
      const intersections: Intersection[] = raycaster.intersectObjects(
        scene.children,
        true
      )

      // Walk up to find the group with userData.geometryId
      let hitId: string | null = null
      for (const hit of intersections) {
        let obj: Object3D | null = hit.object
        while (obj) {
          if (obj.userData?.geometryId) {
            hitId = obj.userData.geometryId as string
            break
          }
          obj = obj.parent
        }
        if (hitId) break
      }

      if (hitId) {
        const multiSelect = e?.nativeEvent?.ctrlKey || e?.nativeEvent?.metaKey
        selectObject(hitId, multiSelect)
      } else {
        deselectAll()
      }
    },
    [activeTool, raycaster, camera, scene, pointer, selectObject, deselectAll]
  )

  return (
    <mesh
      visible={false}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
    >
      <boxGeometry args={[200, 200, 200]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  )
}

export default memo(SelectionTool)
