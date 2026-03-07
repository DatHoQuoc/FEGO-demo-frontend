"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, Keyboard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface Annotation {
  id: string
  text: string
  stepId: number
}

interface ChecklistItem {
  id: string
  label: string
  checked: boolean
}

interface ChecklistGroup {
  title: string
  items: ChecklistItem[]
}

const initialChecklistGroups: ChecklistGroup[] = [
  {
    title: "Tinh chinh xac de bai",
    items: [
      { id: "data-valid", label: "Du lieu hop le", checked: true },
      { id: "condition-valid", label: "Du dieu kien co nghiem", checked: true },
    ],
  },
  {
    title: "Mo hinh 3D",
    items: [
      { id: "parallel-correct", label: "Quan he song song dung", checked: true },
      { id: "perpendicular-correct", label: "Vuong goc dung", checked: true },
      { id: "intersection-correct", label: "Giao tuyen dung", checked: false },
    ],
  },
  {
    title: "Chuoi lap luan",
    items: [
      { id: "order-logical", label: "Thu tu hop ly", checked: true },
      { id: "condition-sufficient", label: "Du dieu kien", checked: false },
      { id: "terminology-accurate", label: "Thuat ngu chinh xac", checked: false },
    ],
  },
]

const shortcuts = [
  { keys: "^ v", description: "Chuyen buoc" },
  { keys: "A", description: "Danh dau Dat" },
  { keys: "E", description: "Sua buoc" },
  { keys: "Ctrl + Enter", description: "Phe duyet" },
]

interface RightPanelProps {
  annotations: Annotation[]
  onAnnotationAdd: (annotation: Annotation) => void
  onScrollToStep: (stepId: number) => void
}

export function RightPanel({ annotations, onAnnotationAdd, onScrollToStep }: RightPanelProps) {
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [checklistGroups, setChecklistGroups] = useState(initialChecklistGroups)
  const [pendingAnnotation, setPendingAnnotation] = useState<{ groupIdx: number; itemIdx: number } | null>(null)
  const aiConfidence = 74
  
  const getConfidenceColor = (score: number) => {
    if (score >= 85) return "#A8DADC"
    if (score >= 60) return "#F59E0B"
    return "#E63946"
  }

  const confidenceColor = getConfidenceColor(aiConfidence)

  const handleChecklistChange = (groupIdx: number, itemIdx: number, checked: boolean) => {
    if (checked && !checklistGroups[groupIdx].items[itemIdx].checked) {
      // Show step selector prompt
      setPendingAnnotation({ groupIdx, itemIdx })
    } else {
      // Just toggle
      setChecklistGroups(prev => {
        const newGroups = [...prev]
        newGroups[groupIdx] = {
          ...newGroups[groupIdx],
          items: newGroups[groupIdx].items.map((item, idx) =>
            idx === itemIdx ? { ...item, checked } : item
          )
        }
        return newGroups
      })
    }
  }

  const handleStepSelect = (stepId: number) => {
    if (!pendingAnnotation) return
    
    const { groupIdx, itemIdx } = pendingAnnotation
    const itemLabel = checklistGroups[groupIdx].items[itemIdx].label
    
    // Create annotation
    const newAnnotation: Annotation = {
      id: `ann-${crypto.randomUUID()}`,
      text: `Van de: ${itemLabel}`,
      stepId,
    }
    onAnnotationAdd(newAnnotation)
    
    // Update checklist
    setChecklistGroups(prev => {
      const newGroups = [...prev]
      newGroups[groupIdx] = {
        ...newGroups[groupIdx],
        items: newGroups[groupIdx].items.map((item, idx) =>
          idx === itemIdx ? { ...item, checked: true } : item
        )
      }
      return newGroups
    })
    
    setPendingAnnotation(null)
  }

  // Get unique steps that have annotations
  const annotatedSteps = [...new Set(annotations.map(a => a.stepId))].sort()

  return (
    <div className="h-full bg-white border-l border-[#A8DADC] flex flex-col">
      <ScrollArea className="flex-1 h-full">
        <div className="p-5 space-y-6">
          {/* AI Confidence Score */}
          <section className="bg-[#F5F7FA] rounded-lg p-4">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1D3557] mb-3">
              DO TU TIN CUA AI
            </h2>
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center border-4"
                style={{ borderColor: confidenceColor }}
              >
                <span 
                  className="text-xl font-bold"
                  style={{ color: confidenceColor }}
                >
                  {aiConfidence}%
                </span>
              </div>
              <div>
                <p className="text-sm text-[#457B9D]">AI khong chac chan ve buoc 3</p>
              </div>
            </div>
          </section>

          {/* Checklist Section */}
          <section>
            <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1D3557] mb-4">
              CHECKLIST KIEM TRA
            </h2>
            
            <div className="space-y-5">
              {checklistGroups.map((group, groupIdx) => (
                <div key={group.title}>
                  <h3 className="text-sm font-medium text-[#1D3557] mb-2">
                    {group.title}
                  </h3>
                  <div className="space-y-2">
                    {group.items.map((item, itemIdx) => (
                      <div key={item.id}>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <Checkbox
                            id={item.id}
                            checked={item.checked}
                            onCheckedChange={(checked) => handleChecklistChange(groupIdx, itemIdx, checked as boolean)}
                            className="border-[#457B9D] data-[state=checked]:bg-[#A8DADC] data-[state=checked]:border-[#A8DADC] data-[state=checked]:text-[#1D3557]"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-[#1D3557] transition-colors">
                            {item.label}
                          </span>
                          {/* Show link to step if this item has an annotation */}
                          {item.checked && annotations.find(a => a.text.includes(item.label)) && (
                            <button 
                              onClick={() => onScrollToStep(annotations.find(a => a.text.includes(item.label))!.stepId)}
                              className="text-xs text-[#457B9D] hover:text-[#1D3557] ml-auto"
                            >
                              <ArrowRight className="h-3 w-3 inline" /> Xem buoc {annotations.find(a => a.text.includes(item.label))!.stepId}
                            </button>
                          )}
                        </label>
                        
                        {/* Step selector prompt */}
                        {pendingAnnotation?.groupIdx === groupIdx && pendingAnnotation?.itemIdx === itemIdx && (
                          <div className="ml-6 mt-2 p-2 bg-[#FEF3C7] rounded text-sm">
                            <p className="text-[#92400E] mb-2">Van de nay xuat hien o buoc nao?</p>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4].map(stepId => (
                                <Button
                                  key={stepId}
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStepSelect(stepId)}
                                  className="h-7 px-3 text-xs border-[#92400E] text-[#92400E] hover:bg-[#92400E] hover:text-white"
                                >
                                  Buoc {stepId}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Moderator Notes Section */}
          <section>
            <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1D3557] mb-3">
              GHI CHU TONG THE
            </h2>
            <Textarea
              placeholder="Them ghi chu ve loi giai nay..."
              className="min-h-[100px] border-[#A8DADC] bg-[#FAFAFA] focus:border-[#457B9D] focus:ring-[#457B9D] resize-none"
            />
          </section>

          {/* Annotations Summary Section - Now just navigation links */}
          <section>
            <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1D3557] mb-3">
              ANNOTATIONS ({annotations.length})
            </h2>
            {annotations.length > 0 ? (
              <div className="space-y-2">
                {annotatedSteps.map(stepId => (
                  <button
                    key={stepId}
                    onClick={() => onScrollToStep(stepId)}
                    className="flex items-center gap-2 text-sm text-[#457B9D] hover:text-[#1D3557] transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Buoc {stepId}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">Chua co annotation nao</p>
            )}
          </section>

          {/* Keyboard Shortcuts */}
          <Collapsible open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full group bg-[#F5F7FA] rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Keyboard className="h-4 w-4 text-[#457B9D]" />
                <span className="text-xs uppercase tracking-widest font-semibold text-[#1D3557]">
                  PHIM TAT
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-[#457B9D] transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 p-3 bg-[#F5F7FA] rounded-lg">
              <div className="space-y-2">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <code className="font-mono text-xs bg-white px-2 py-1 rounded border border-[#A8DADC] text-[#888888]">
                      {shortcut.keys}
                    </code>
                    <span className="text-xs text-[#888888]">{shortcut.description}</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
    </div>
  )
}
