"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ParticleSystemProps {
  /** Center of the particle emitter */
  position?: [number, number, number]
  /** Number of particles */
  count?: number
  /** Spread radius */
  radius?: number
  /** Particle color */
  color?: string
  /** Particle size */
  size?: number
}

export default function ParticleSystem({
  position = [0, 0, 0],
  count = 200,
  radius = 5,
  color = "#60a5fa",
  size = 0.04,
}: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * radius + position[0]
      pos[i3 + 1] = (Math.random() - 0.5) * radius + position[1]
      pos[i3 + 2] = (Math.random() - 0.5) * radius + position[2]

      vel[i3] = (Math.random() - 0.5) * 0.01
      vel[i3 + 1] = Math.random() * 0.02 + 0.005
      vel[i3 + 2] = (Math.random() - 0.5) * 0.01
    }
    return { positions: pos, velocities: vel }
  }, [count, radius, position])

  useFrame(() => {
    if (!pointsRef.current) return
    const geo = pointsRef.current.geometry
    const posAttr = geo.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      arr[i3] += velocities[i3]
      arr[i3 + 1] += velocities[i3 + 1]
      arr[i3 + 2] += velocities[i3 + 2]

      // Reset when drifted too far
      const dy = arr[i3 + 1] - position[1]
      if (dy > radius) {
        arr[i3] = (Math.random() - 0.5) * radius + position[0]
        arr[i3 + 1] = position[1]
        arr[i3 + 2] = (Math.random() - 0.5) * radius + position[2]
      }
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
