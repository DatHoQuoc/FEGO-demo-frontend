"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"

let gsapRegistered = false

function ensureGSAP() {
  if (!gsapRegistered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Draggable)
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    })
    gsap.defaults({
      ease: "power2.out",
      duration: 0.8,
    })
    gsapRegistered = true
  }
}

export function useGSAP(
  callback: (ctx: gsap.Context) => void,
  dependencies: unknown[] = []
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    ensureGSAP()

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() =>{
      
    },containerRef)
    callback(ctx)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, ...dependencies])

  return containerRef
}
