"use client"

import { useState, useRef } from "react"
import { TopBar } from "@/components/moderator/top-bar"
import { LeftPanel } from "@/components/moderator/left-panel"
import { CenterPanel } from "@/components/moderator/center-panel"
import { RightPanel } from "@/components/moderator/right-panel"
import { BottomBar } from "@/components/moderator/bottom-bar"

interface Annotation {
  id: string
  text: string
  stepId: number
}

export default function ModeratorReviewPage() {
  const [reviewedCount, setReviewedCount] = useState(1)
  const [annotations, setAnnotations] = useState<Annotation[]>([
    { id: "ann-1", text: "Thieu dieu kien vuong goc truoc khi ap dung cong thuc", stepId: 3 },
  ])
  const [hasEdits, setHasEdits] = useState(false)
  const totalSteps = 4
  const centerPanelRef = useRef<{ scrollToStep: (stepId: number) => void } | null>(null)

  const handleAnnotationAdd = (annotation: Annotation) => {
    setAnnotations(prev => [...prev, annotation])
  }

  const handleScrollToStep = (stepId: number) => {
    // Trigger scroll in center panel
    centerPanelRef.current?.scrollToStep(stepId)
  }

  return (
    <div className="h-screen flex flex-col bg-[#F5F7FA] overflow-hidden">
      {/* Fixed Top Bar */}
      <TopBar />

      {/* Main Content - 3 Column Layout with fixed widths */}
      <main className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Panel - fixed 260px */}
        <div className="w-[260px] min-w-[260px] shrink-0 overflow-y-auto">
          <LeftPanel />
        </div>

        {/* Center Panel - flex-1, takes remaining space */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <CenterPanel 
            reviewedCount={reviewedCount}
            totalSteps={totalSteps}
            onReviewedCountChange={setReviewedCount}
            annotations={annotations}
            onAnnotationAdd={handleAnnotationAdd}
            hasEdits={hasEdits}
            onEditChange={setHasEdits}
          />
        </div>

        {/* Right Panel - fixed 320px */}
        <div className="w-[320px] min-w-[320px] shrink-0 overflow-y-auto">
          <RightPanel 
            annotations={annotations}
            onAnnotationAdd={handleAnnotationAdd}
            onScrollToStep={handleScrollToStep}
          />
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <BottomBar 
        currentPosition={1} 
        totalInQueue={12} 
        hasEdits={hasEdits}
        hasAnnotations={annotations.length > 0}
      />
    </div>
  )
}
