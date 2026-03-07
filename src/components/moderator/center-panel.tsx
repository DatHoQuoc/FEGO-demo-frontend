"use client"

import { useState, useRef } from "react"
import { RotateCw, ZoomIn, RotateCcw, Highlighter, X, Check, Pin, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type StepStatus = "approved" | "issue" | "pending"

interface Annotation {
  id: string
  text: string
  stepId: number
}

interface SolutionStep {
  id: number
  title: string
  content: string
  status: StepStatus
}

const initialSteps: SolutionStep[] = [
  {
    id: 1,
    title: "Ve hinh, xac dinh SA vuong goc ABCD",
    content: "Ve hinh chop S.ABCD voi day ABCD la hinh vuong canh a. Theo de bai, SA vuong goc voi mat phang (ABCD) tai A.",
    status: "approved",
  },
  {
    id: 2,
    title: "Xac dinh hinh chieu cua S len day",
    content: "Vi SA vuong goc (ABCD) nen A la hinh chieu vuong goc cua S len mat phang day (ABCD). Do do, hinh chieu cua SB len (ABCD) la AB.",
    status: "approved",
  },
  {
    id: 3,
    title: "Tinh SB = SA nhan can 2",
    content: "Ap dung dinh ly Pytago trong tam giac SAB vuong tai A: SB binh phuong = SA binh phuong + AB binh phuong = a binh phuong + a binh phuong = 2a binh phuong. Suy ra SB = a nhan can 2.",
    status: "issue",
  },
  {
    id: 4,
    title: "Ket luan goc = 45 do",
    content: "Goc giua SB va (ABCD) la goc SBA. Ta co tan(SBA) = SA/AB = a/a = 1. Vay goc SBA = 45 do.",
    status: "pending",
  },
]

const auditLog = [
  {
    event: "Phe duyet",
    date: "Hom nay, 14:32",
    actor: "Thay Minh",
    description: "Da sua buoc 3, phe duyet",
    type: "approved" as const,
  },
  {
    event: "Chinh sua buoc 3",
    date: "Hom nay, 14:28",
    actor: "Thay Minh",
    description: "Them dieu kien vuong goc",
    type: "edit" as const,
  },
  {
    event: "Tra ve lan 1",
    date: "12/03/2025, 09:15",
    actor: "Co Lan",
    description: "Loi lap luan buoc 3",
    type: "returned" as const,
  },
  {
    event: "AI sinh loi giai",
    date: "10/03/2025, 16:45",
    actor: "Tu dong",
    description: "Loi giai duoc tao tu de bai",
    type: "ai" as const,
  },
]

const statusConfig: Record<StepStatus, { label: string; bgColor: string; textColor: string; borderColor: string }> = {
  approved: {
    label: "Dat",
    bgColor: "bg-[#A8DADC]/30",
    textColor: "text-[#1D3557]",
    borderColor: "border-l-[#A8DADC]",
  },
  issue: {
    label: "Co van de",
    bgColor: "bg-[#FDECEA]",
    textColor: "text-[#E63946]",
    borderColor: "border-l-[#E63946]",
  },
  pending: {
    label: "Chua review",
    bgColor: "bg-[#F0F0F0]",
    textColor: "text-[#888888]",
    borderColor: "border-l-[#D1D5DB]",
  },
}

interface CenterPanelProps {
  reviewedCount: number
  totalSteps: number
  onReviewedCountChange: (count: number) => void
  annotations: Annotation[]
  onAnnotationAdd: (annotation: Annotation) => void
  hasEdits: boolean
  onEditChange: (hasEdits: boolean) => void
}

export function CenterPanel({ 
  reviewedCount, 
  totalSteps, 
  onReviewedCountChange, 
  annotations, 
  onAnnotationAdd,
  hasEdits,
  onEditChange 
}: CenterPanelProps) {
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [editingStep, setEditingStep] = useState<number | null>(null)
  const [editedContent, setEditedContent] = useState<string>("")
  const [steps, setSteps] = useState(initialSteps)
  const [activeTab, setActiveTab] = useState<"solution" | "history">("solution")
  const stepRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const handleEditStep = (stepId: number, content: string) => {
    setEditingStep(stepId)
    setEditedContent(content)
  }

  const handleSaveEdit = (stepId: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, content: editedContent, status: "approved" as StepStatus }
        : step
    ))
    setEditingStep(null)
    setEditedContent("")
    onEditChange(true)
    // Update reviewed count
    const newReviewedCount = steps.filter(s => s.status !== "pending").length
    onReviewedCountChange(newReviewedCount)
  }

  const handleCancelEdit = () => {
    setEditingStep(null)
    setEditedContent("")
  }

  const scrollToStep = (stepId: number) => {
    setActiveTab("solution")
    setTimeout(() => {
      stepRefs.current[stepId]?.scrollIntoView({ behavior: "smooth", block: "center" })
      setSelectedStep(stepId)
    }, 100)
  }

  const getStepAnnotations = (stepId: number) => {
    return annotations.filter(a => a.stepId === stepId)
  }

  const getAuditDotColor = (type: string) => {
    switch (type) {
      case "approved": return "bg-[#1D3557]"
      case "edit": return "bg-[#457B9D]"
      case "returned": return "bg-[#E63946]"
      case "ai": return "bg-[#A8DADC]"
      default: return "bg-[#A8DADC]"
    }
  }

  return (
    <div className="h-full bg-[#F5F7FA] flex flex-col overflow-hidden">
      {/* 3D Model Viewer - Fixed Height */}
      <div className="h-[40%] p-4 shrink-0">
        <div className="bg-[#1D3557] rounded-lg h-full flex flex-col overflow-hidden">
          {/* Control Buttons */}
          <div className="flex justify-end gap-2 p-3">
            <Button size="sm" className="bg-[#457B9D] hover:bg-[#457B9D]/90 text-white text-xs h-7 px-3">
              <RotateCw className="h-3 w-3 mr-1" />
              Xoay
            </Button>
            <Button size="sm" className="bg-[#457B9D] hover:bg-[#457B9D]/90 text-white text-xs h-7 px-3">
              <ZoomIn className="h-3 w-3 mr-1" />
              Zoom
            </Button>
            <Button size="sm" className="bg-[#457B9D] hover:bg-[#457B9D]/90 text-white text-xs h-7 px-3">
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
            <Button size="sm" className="bg-[#457B9D] hover:bg-[#457B9D]/90 text-white text-xs h-7 px-3">
              <Highlighter className="h-3 w-3 mr-1" />
              Highlight
            </Button>
          </div>
          
          {/* 3D Wireframe Placeholder */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-3 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full" stroke="white" strokeWidth="1" fill="none">
                  <polygon points="20,70 50,85 80,70 50,55" strokeDasharray="2,2" opacity="0.5" />
                  <line x1="50" y1="15" x2="20" y2="70" />
                  <line x1="50" y1="15" x2="80" y2="70" />
                  <line x1="50" y1="15" x2="50" y2="85" strokeDasharray="2,2" opacity="0.5" />
                  <line x1="50" y1="15" x2="50" y2="55" />
                  <line x1="20" y1="70" x2="50" y2="55" />
                  <line x1="50" y1="55" x2="80" y2="70" />
                  <line x1="80" y1="70" x2="50" y2="85" strokeDasharray="2,2" opacity="0.5" />
                  <line x1="50" y1="85" x2="20" y2="70" strokeDasharray="2,2" opacity="0.5" />
                  <text x="50" y="10" fill="white" fontSize="8" textAnchor="middle">S</text>
                  <text x="14" y="73" fill="white" fontSize="8" textAnchor="middle">A</text>
                  <text x="50" y="50" fill="white" fontSize="8" textAnchor="middle">B</text>
                  <text x="86" y="73" fill="white" fontSize="8" textAnchor="middle">C</text>
                  <text x="50" y="93" fill="white" fontSize="8" textAnchor="middle">D</text>
                </svg>
              </div>
              <p className="text-white/70 text-sm">Mo hinh 3D tuong tac</p>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-[#A8DADC] mt-2 text-center">
          Mo hinh dong bo voi buoc dang chon
        </p>
      </div>

      {/* Tabs */}
      <div className="px-4 shrink-0 border-b border-[#A8DADC]">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("solution")}
            className={cn(
              "py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === "solution"
                ? "border-[#A8DADC] text-[#1D3557]"
                : "border-transparent text-[#457B9D] hover:text-[#1D3557]"
            )}
          >
            Loi giai
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={cn(
              "py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === "history"
                ? "border-[#A8DADC] text-[#1D3557]"
                : "border-transparent text-[#457B9D] hover:text-[#1D3557]"
            )}
          >
            Lich su
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {activeTab === "solution" ? (
          <>
            <div className="px-4 py-2 shrink-0 flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1D3557]">
                LOI GIAI TUNG BUOC
              </h2>
              <span className="text-xs text-[#457B9D]">
                Da review {reviewedCount} / {totalSteps} buoc
              </span>
            </div>
            
            <ScrollArea className="flex-1 px-4 pb-4">
              <div className="space-y-3">
                {steps.map((step) => {
                  const config = statusConfig[step.status]
                  const isEditing = editingStep === step.id
                  const stepAnnotations = getStepAnnotations(step.id)
                  
                  return (
                    <div
                      key={step.id}
                      ref={(el) => { stepRefs.current[step.id] = el }}
                      onClick={() => !isEditing && setSelectedStep(step.id)}
                      className={cn(
                        "bg-white rounded-lg p-4 border-l-4 cursor-pointer transition-all",
                        config.borderColor,
                        selectedStep === step.id && "ring-2 ring-[#457B9D]"
                      )}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#1D3557] text-white text-xs flex items-center justify-center font-medium shrink-0">
                            {step.id}
                          </span>
                          <span className="font-medium text-[#1D3557] text-sm">
                            {step.title}
                          </span>
                        </div>
                        <Badge className={cn("text-xs font-normal", config.bgColor, config.textColor, "border-0")}>
                          {config.label}
                        </Badge>
                      </div>

                      {/* Content - Normal or Edit Mode */}
                      {isEditing ? (
                        <div className="ml-9 space-y-3">
                          <p className="text-xs text-[#457B9D] italic">
                            Thay doi se duoc ghi lai trong audit trail
                          </p>
                          
                          {/* Original Text */}
                          <div className="p-2 bg-[#FFF0F0] rounded">
                            <p className="text-sm text-[#E63946] line-through">
                              {step.content}
                            </p>
                          </div>
                          
                          {/* New Text Input */}
                          <div className="p-2 bg-[#F0FFF4] rounded">
                            <Input
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                              className="border-0 bg-transparent text-[#1D3557] text-sm p-0 h-auto focus-visible:ring-0"
                            />
                          </div>
                          
                          {/* Edit Actions */}
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              onClick={() => handleSaveEdit(step.id)}
                              className="bg-[#1D3557] hover:bg-[#1D3557]/90 text-white text-xs h-7"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Luu thay doi
                            </Button>
                            <Button 
                              size="sm"
                              variant="ghost"
                              onClick={handleCancelEdit}
                              className="text-[#457B9D] hover:text-[#1D3557] text-xs h-7"
                            >
                              <X className="h-3 w-3 mr-1" />
                              Huy
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-gray-700 ml-9 leading-relaxed">
                            {step.content}
                          </p>

                          {/* Inline Annotations */}
                          {stepAnnotations.map((annotation) => (
                            <div 
                              key={annotation.id}
                              className="ml-9 mt-3 p-2 bg-[#FFF5F5] rounded border-l-2 border-[#E63946]"
                            >
                              <p className="text-sm italic text-[#E63946] flex items-start gap-2">
                                <Pin className="h-4 w-4 shrink-0 mt-0.5" />
                                Annotation: {'"'}{annotation.text}{'"'}
                              </p>
                            </div>
                          ))}

                          {/* Action Links */}
                          <div className="ml-9 mt-3 flex gap-4">
                            <button className="text-xs text-[#457B9D] hover:text-[#1D3557] transition-colors">
                              [Them annotation]
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditStep(step.id, step.content)
                              }}
                              className="text-xs text-[#457B9D] hover:text-[#1D3557] transition-colors"
                            >
                              [Sua buoc]
                            </button>
                            <button className="text-xs text-[#E63946] hover:text-[#E63946]/80 border border-[#E63946] rounded px-2 py-0.5 transition-colors">
                              AI sinh lai
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </>
        ) : (
          /* Audit Log / History Tab */
          <ScrollArea className="flex-1 px-4 py-4">
            <div className="relative pl-6">
              {auditLog.map((item, index) => (
                <div key={index} className="relative pb-6 last:pb-0">
                  {/* Vertical line */}
                  {index < auditLog.length - 1 && (
                    <div className="absolute left-[7px] top-4 w-0.5 h-full bg-[#A8DADC]" />
                  )}
                  
                  {/* Timeline dot */}
                  <div className={cn(
                    "absolute left-0 w-4 h-4 rounded-full",
                    getAuditDotColor(item.type)
                  )} />
                  
                  <div className="ml-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#1D3557]">{item.event}</p>
                      <span className="text-xs text-[#457B9D]">{item.date}</span>
                    </div>
                    <p className="text-xs text-[#457B9D] mt-1">Moderator: {item.actor}</p>
                    <p className="text-xs text-gray-600 mt-1">{'"'}{item.description}{'"'}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
