"use client"

import { useState } from "react"
import { CheckCircle, ChevronRight, Circle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const similarCases = [
  { id: 201, verified: true },
  { id: 189, verified: true },
  { id: 156, verified: true },
]

const reviewHistory = [
  { 
    event: "Tra ve lan 1", 
    date: "12/03/2025", 
    reason: "Ly do: Sai lap luan buoc 3",
    type: "returned" as const
  },
  { 
    event: "Dang review", 
    date: "Hom nay", 
    reason: "",
    type: "current" as const
  },
]

export function LeftPanel() {
  const [historyOpen, setHistoryOpen] = useState(false)
  const [similarOpen, setSimilarOpen] = useState(false) // Collapsed by default

  return (
    <div className="h-full bg-white border-r border-[#A8DADC] flex flex-col">
      <ScrollArea className="flex-1 h-full">
        <div className="p-5 space-y-6">
          {/* Problem Statement Section */}
          <section>
            <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1D3557] mb-3">
              DE BAI
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Cho hinh chop S.ABCD co day ABCD la hinh vuong canh a, SA vuong goc voi mat phang day va SA = a. Tinh goc giua duong thang SB va mat phang (ABCD).
            </p>
            {/* No 2D illustration placeholder - removed per requirements */}
          </section>

          {/* Metadata Section */}
          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wide text-[#457B9D]">Chu de</span>
              <span className="text-sm text-gray-700">Hinh chop deu</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wide text-[#457B9D]">Do kho</span>
              <span className="text-sm text-gray-700">Kho</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wide text-[#457B9D]">So hoc sinh da dung</span>
              <span className="text-sm font-bold text-[#E63946]">34</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wide text-[#457B9D]">Thoi gian cho</span>
              <span className="text-sm text-amber-600 font-medium">26 gio</span>
            </div>
          </section>

          {/* Similar Verified Cases - Collapsed by default */}
          <Collapsible open={similarOpen} onOpenChange={setSimilarOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full group">
              <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1D3557]">
                BAI TUONG TU ({similarCases.length})
              </h2>
              <ChevronRight className="h-4 w-4 text-[#457B9D] transition-transform group-data-[state=open]:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-2">
              {similarCases.map((item) => (
                <button
                  key={item.id}
                  className="flex items-center gap-2 text-[#457B9D] hover:text-[#1D3557] transition-colors text-sm w-full text-left"
                >
                  <span>Bai #{item.id}</span>
                  {item.verified && (
                    <CheckCircle className="h-4 w-4 text-[#A8DADC]" />
                  )}
                </button>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Review History Timeline */}
          <Collapsible open={historyOpen} onOpenChange={setHistoryOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full group">
              <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1D3557]">
                LICH SU REVIEW
              </h2>
              <ChevronRight className="h-4 w-4 text-[#457B9D] transition-transform group-data-[state=open]:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="relative pl-4 border-l-2 border-[#A8DADC] space-y-4">
                {reviewHistory.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot */}
                    <div className={`absolute -left-[21px] w-4 h-4 rounded-full flex items-center justify-center ${
                      item.type === "returned" 
                        ? "bg-[#E63946]" 
                        : "bg-[#A8DADC] animate-pulse"
                    }`}>
                      <Circle className="h-2 w-2 text-white fill-white" />
                    </div>
                    
                    <div className="ml-2">
                      <p className={`text-sm font-medium ${
                        item.type === "returned" ? "text-[#E63946]" : "text-[#457B9D]"
                      }`}>
                        {item.event}
                      </p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                      {item.reason && (
                        <p className="text-xs text-gray-600 mt-1">{item.reason}</p>
                      )}
                    </div>
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
