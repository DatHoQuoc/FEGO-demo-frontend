"use client"

import { useState } from "react"
import { AlertTriangle, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"

interface BottomBarProps {
  currentPosition: number
  totalInQueue: number
  hasEdits: boolean
  hasAnnotations: boolean
}

export function BottomBar({ currentPosition, totalInQueue, hasEdits, hasAnnotations }: BottomBarProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  // Smart action button - auto-detect state
  const needsConfirmation = hasEdits || hasAnnotations
  const buttonLabel = needsConfirmation ? "Luu chinh sua & Phe duyet" : "Phe duyet"
  
  const handlePrimaryAction = () => {
    if (needsConfirmation) {
      setShowConfirmation(true)
    } else {
      // Direct approval
      window.location.href = "/"
    }
  }

  const handleConfirm = () => {
    setShowConfirmation(false)
    window.location.href = "/"
  }

  return (
    <footer className="h-16 bg-white border-t border-[#A8DADC] flex items-center justify-between px-6 shrink-0 relative">
      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white border border-[#A8DADC] rounded-lg shadow-lg p-4 z-10">
          <p className="text-sm text-[#1D3557] mb-3">
            Se thong bao den 34 hoc sinh. Xac nhan?
          </p>
          <div className="flex gap-2 justify-end">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setShowConfirmation(false)}
              className="text-[#457B9D]"
            >
              Huy
            </Button>
            <Button 
              size="sm"
              onClick={handleConfirm}
              className="bg-[#1D3557] hover:bg-[#457B9D] text-white"
            >
              Xac nhan
            </Button>
          </div>
        </div>
      )}

      {/* Left - Position + Warning */}
      <div className="flex items-center gap-4">
        {/* Position Indicator */}
        <span className="text-sm text-[#457B9D]">
          Bai {currentPosition} / {totalInQueue} trong hang doi
        </span>
        
        {/* Vertical Divider */}
        <div className="w-px h-6 bg-[#A8DADC]" />
        
        {/* Warning */}
        <div className="flex items-center gap-2 bg-[#FDECEA] rounded-full px-4 py-2">
          <AlertTriangle className="h-4 w-4 text-[#E63946]" />
          <span className="text-sm font-medium text-[#E63946]">
            34 hoc sinh da dung loi giai nay — se nhan thong bao neu co chinh sua
          </span>
        </div>
      </div>

      {/* Right - Action Buttons */}
      <div className="flex items-center gap-3">
        <Button 
          asChild
          variant="ghost" 
          className="text-[#457B9D] hover:text-[#1D3557] hover:bg-transparent"
        >
          <Link href="/moderator">Tra ve hang doi</Link>
        </Button>
        
        <Button 
          variant="outline" 
          className="border-[#457B9D] text-[#457B9D] hover:bg-[#457B9D]/10 hover:text-[#457B9D]"
        >
          Luu nhap
        </Button>
        
        {/* Smart Primary Action Button */}
        <Button 
          onClick={handlePrimaryAction}
          className="bg-[#1D3557] hover:bg-[#457B9D] text-white gap-2"
        >
          {buttonLabel}
          <Check className="h-4 w-4" />
        </Button>

        {/* Next Solution Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline"
                className="border-[#457B9D] text-[#457B9D] hover:bg-[#457B9D]/10 hover:text-[#457B9D] gap-1"
              >
                Bai tiep theo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1D3557] text-white">
              <p>Bai tiep theo: #251 - Hinh lang tru</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </footer>
  )
}
