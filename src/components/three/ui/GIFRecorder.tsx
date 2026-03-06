"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Video, VideoOff } from "lucide-react"

/**
 * Records the WebGL canvas to a WebM video using the MediaRecorder API.
 * Requires a ref to the container that holds the <canvas>.
 */
interface GIFRecorderProps {
  canvasContainerRef: React.RefObject<HTMLElement | null>
}

export default function GIFRecorder({ canvasContainerRef }: GIFRecorderProps) {
  const [recording, setRecording] = useState(false)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const start = useCallback(() => {
    const container = canvasContainerRef.current
    if (!container) return
    const canvas = container.querySelector("canvas")
    if (!canvas) return

    const stream = canvas.captureStream(30)
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" })

    chunksRef.current = []
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `recording-${Date.now()}.webm`
      a.click()
      URL.revokeObjectURL(url)
    }

    recorder.start()
    recorderRef.current = recorder
    setRecording(true)
  }, [canvasContainerRef])

  const stop = useCallback(() => {
    recorderRef.current?.stop()
    recorderRef.current = null
    setRecording(false)
  }, [])

  return (
    <Button
      variant={recording ? "destructive" : "outline"}
      size="icon"
      className="h-8 w-8"
      onClick={recording ? stop : start}
      aria-label={recording ? "Stop recording" : "Start recording"}
    >
      {recording ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
    </Button>
  )
}
