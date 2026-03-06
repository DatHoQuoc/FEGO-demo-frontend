"use client"

import { memo, useState, useRef, useCallback } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import type { Mesh } from "three"
import { useSceneStore } from "@/stores/sceneStore"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

/**
 * SlicingTool - A draggable plane that cuts through solids.
 * Shows cross-section visualization in real-time.
 */

function SlicingTool() {
  const activeTool = useSceneStore((s) => s.activeTool)
  const [planeY, setPlaneY] = useState(0)
  const [planeRotX, setPlaneRotX] = useState(0)
  const [planeRotZ, setPlaneRotZ] = useState(0)
  const [applied, setApplied] = useState(false)
  const planeRef = useRef<Mesh>(null)

  // Subtle pulse animation on the plane
  useFrame(({ clock }) => {
    if (planeRef.current && !applied) {
      planeRef.current.material.opacity =
        0.25 + Math.sin(clock.getElapsedTime() * 2) * 0.1
    }
  })

  if (activeTool !== "slice") return null

  return (
    <group>
      {/* Slicing plane visualization */}
      <mesh
        ref={planeRef as any}
        position={[0, planeY, 0]}
        rotation={[planeRotX, 0, planeRotZ]}
      >
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial
          color={applied ? "#22c55e" : "#f59e0b"}
          transparent
          opacity={0.3}
          side={2} // DoubleSide
          depthWrite={false}
        />
      </mesh>

      {/* Cross-section outline ring */}
      <mesh
        position={[0, planeY, 0]}
        rotation={[planeRotX, 0, planeRotZ]}
      >
        <ringGeometry args={[5.9, 6, 64]} />
        <meshBasicMaterial
          color={applied ? "#22c55e" : "#f59e0b"}
          transparent
          opacity={0.6}
          side={2}
        />
      </mesh>

      {/* Control panel */}
      <Html position={[7, planeY, 0]} center>
        <div
          className="pointer-events-auto flex flex-col gap-2 rounded-lg border p-3 shadow-xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            borderColor: "rgba(148, 163, 184, 0.2)",
            color: "#f8fafc",
            minWidth: 180,
          }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Slicing Plane
          </span>

          <label className="text-xs">
            Height (Y)
            <Slider
              min={-5}
              max={5}
              step={0.1}
              value={[planeY]}
              onValueChange={([v]) => setPlaneY(v)}
              className="mt-1"
            />
          </label>

          <label className="text-xs">
            Tilt X
            <Slider
              min={-Math.PI / 2}
              max={Math.PI / 2}
              step={0.05}
              value={[planeRotX]}
              onValueChange={([v]) => setPlaneRotX(v)}
              className="mt-1"
            />
          </label>

          <label className="text-xs">
            Tilt Z
            <Slider
              min={-Math.PI / 2}
              max={Math.PI / 2}
              step={0.05}
              value={[planeRotZ]}
              onValueChange={([v]) => setPlaneRotZ(v)}
              className="mt-1"
            />
          </label>

          <div className="mt-1 flex gap-1.5">
            <Button
              size="sm"
              variant="default"
              className="h-7 flex-1 text-xs"
              onClick={() => setApplied(true)}
            >
              Apply
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 flex-1 text-xs bg-transparent"
              onClick={() => {
                setPlaneY(0)
                setPlaneRotX(0)
                setPlaneRotZ(0)
                setApplied(false)
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </Html>
    </group>
  )
}

export default memo(SlicingTool)
