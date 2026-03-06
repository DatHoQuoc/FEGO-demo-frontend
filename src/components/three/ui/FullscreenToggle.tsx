"use client"

import React from "react"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Maximize, Minimize } from "lucide-react"

interface FullscreenToggleProps {
  targetRef: React.RefObject<HTMLElement | null>
}

export default function FullscreenToggle({ targetRef }: FullscreenToggleProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handler)
    return () => document.removeEventListener("fullscreenchange", handler)
  }, [])

  const toggle = useCallback(() => {
    if (!targetRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      targetRef.current.requestFullscreen()
    }
  }, [targetRef])

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-8 w-8 bg-transparent"
      onClick={toggle}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
    </Button>
  )
}
