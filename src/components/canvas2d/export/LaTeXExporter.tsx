"use client"

import { useState, useCallback } from "react"
import { useCanvas2DStore } from "@/stores/canvas2dStore"
import { generateTikZCode } from "@/services/latex.service"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Code, Copy, Download, Check } from "lucide-react"

export default function LaTeXExporter() {
  const projectedGraph = useCanvas2DStore((s) => s.projectedGraph)
  const studentGraph = useCanvas2DStore((s) => s.studentGraph)
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Merge projected + student graphs
  const mergedGraph = {
    points: [...projectedGraph.points, ...studentGraph.points],
    lines: [...projectedGraph.lines, ...studentGraph.lines],
    polygons: [...projectedGraph.polygons, ...studentGraph.polygons],
    circles: [...projectedGraph.circles, ...studentGraph.circles],
    labels: [...projectedGraph.labels, ...studentGraph.labels],
  }

  const tikzCode = generateTikZCode(mergedGraph)

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(tikzCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [tikzCode])

  const downloadTeX = useCallback(() => {
    const blob = new Blob([tikzCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `geometry_2d_${Date.now()}.tex`
    a.click()
    URL.revokeObjectURL(url)
  }, [tikzCode])

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1.5 text-xs"
        onClick={() => setOpen(true)}
        style={{ color: "#94a3b8" }}
      >
        <Code className="h-3.5 w-3.5" />
        LaTeX
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-2xl"
          style={{ backgroundColor: "#0f172a", borderColor: "#1e293b", color: "#e2e8f0" }}
        >
          <DialogHeader>
            <DialogTitle>LaTeX / TikZ Export</DialogTitle>
            <DialogDescription style={{ color: "#64748b" }}>
              Copy or download the TikZ code for your 2D geometry diagram.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <pre
                className="max-h-80 overflow-auto rounded-lg p-4 text-xs leading-relaxed"
                style={{ backgroundColor: "#1e293b", color: "#a5f3fc" }}
              >
                <code>{tikzCode}</code>
              </pre>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs bg-transparent"
                onClick={copyToClipboard}
                style={{ borderColor: "#334155", color: "#e2e8f0", backgroundColor: "transparent" }}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                size="sm"
                className="gap-1.5 text-xs"
                onClick={downloadTeX}
                style={{ backgroundColor: "#1e40af", color: "#ffffff" }}
              >
                <Download className="h-3.5 w-3.5" />
                Download .tex
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
