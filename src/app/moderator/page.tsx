"use client"

import { useState, useMemo, useCallback } from "react"
import { Search, ChevronDown, Clock, Users, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"
import { QueueTopBar } from "@/components/queue/queue-top-bar"

type QueueItem = {
  id: string
  topic: string
  topicCategory: string
  difficulty: "Kho" | "Trung binh" | "De"
  students: number
  waitTime: string
  waitHours: number
  status: "pending" | "processing" | "returned"
  processingBy?: string
  priorityScore: number
  priorityLevel: "Cao" | "Trung binh" | "Thap"
}

// Priority is auto-calculated: students × waitHours
const queueData: QueueItem[] = [
  { id: "#240", topic: "Hinh chop cut", topicCategory: "chop", difficulty: "Kho", students: 45, waitTime: "68 gio", waitHours: 68, status: "pending", priorityScore: 45 * 68, priorityLevel: "Cao" },
  { id: "#247", topic: "Hinh chop deu", topicCategory: "chop", difficulty: "Kho", students: 34, waitTime: "52 gio", waitHours: 52, status: "pending", priorityScore: 34 * 52, priorityLevel: "Cao" },
  { id: "#249", topic: "Hinh cau noi tiep", topicCategory: "cau", difficulty: "Kho", students: 27, waitTime: "38 gio", waitHours: 38, status: "processing", processingBy: "Thay Minh", priorityScore: 27 * 38, priorityLevel: "Trung binh" },
  { id: "#243", topic: "Hinh tru", topicCategory: "tru", difficulty: "Trung binh", students: 22, waitTime: "31 gio", waitHours: 31, status: "returned", priorityScore: 22 * 31, priorityLevel: "Trung binh" },
  { id: "#251", topic: "Hinh lang tru tam giac", topicCategory: "langtru", difficulty: "Trung binh", students: 18, waitTime: "26 gio", waitHours: 26, status: "pending", priorityScore: 18 * 26, priorityLevel: "Thap" },
  { id: "#245", topic: "Hinh chop tu giac", topicCategory: "chop", difficulty: "De", students: 12, waitTime: "14 gio", waitHours: 14, status: "pending", priorityScore: 12 * 14, priorityLevel: "Thap" },
]

const topics = [
  { id: "chop", label: "Hinh chop" },
  { id: "langtru", label: "Hinh lang tru" },
  { id: "cau", label: "Hinh cau" },
  { id: "tru", label: "Hinh tru" },
]

const difficulties = [
  { id: "Kho", label: "Kho" },
  { id: "Trung binh", label: "Trung binh" },
  { id: "De", label: "De" },
]

const priorities = [
  { id: "all", label: "Tat ca" },
  { id: "Cao", label: "Cao" },
  { id: "Trung binh", label: "Trung binh" },
  { id: "Thap", label: "Thap" },
]

function getPriorityBadge(level: QueueItem["priorityLevel"]) {
  const styles = {
    "Cao": "bg-[#FDECEA] text-[#E63946] font-bold",
    "Trung binh": "bg-[#FEF3C7] text-[#92400E]",
    "Thap": "bg-[#D1FAE5] text-[#065F46]",
  }
  return <Badge className={`${styles[level]} border-0`}>{level}</Badge>
}

function getDifficultyBadge(difficulty: QueueItem["difficulty"]) {
  const styles = {
    "Kho": "bg-[#FDECEA] text-[#E63946] border-0",
    "Trung binh": "bg-amber-100 text-amber-700 border-0",
    "De": "bg-green-100 text-green-700 border-0",
  }
  return <Badge className={styles[difficulty]}>{difficulty}</Badge>
}

function getStatusBadge(status: QueueItem["status"]) {
  const config = {
    pending: { label: "Cho review", className: "bg-[#F0F0F0] text-[#888888] border-0" },
    processing: { label: "Dang xu ly", className: "bg-[#A8DADC] text-[#1D3557] border-0" },
    returned: { label: "Tra ve", className: "bg-[#FDECEA] text-[#E63946] border-0" },
  }
  const { label, className } = config[status]
  return <Badge className={className}>{label}</Badge>
}

function getWaitTimeStyle(waitHours: number) {
  if (waitHours > 24) return "text-[#E63946] font-bold"
  if (waitHours >= 12) return "text-[#F59E0B] font-medium"
  return "text-[#10B981]"
}

function getActionButton(item: QueueItem) {
  if (item.status === "pending") {
    return (
      <Button 
        asChild
        size="sm" 
        className="bg-[#1D3557] hover:bg-[#1D3557]/90 text-white text-xs h-8"
      >
        <Link href="/moderator/review">Bat dau review</Link>
      </Button>
    )
  }
  
  if (item.status === "processing") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#457B9D] flex items-center justify-center text-white text-xs font-medium">
                TM
              </div>
              <Button 
                size="sm" 
                disabled
                className="bg-[#F0F0F0] text-[#888888] text-xs h-8 cursor-not-allowed"
              >
                Dang duoc review
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-[#1D3557] text-white">
            <p>Dang duoc review boi {item.processingBy} — bat dau 45 phut truoc</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  
  if (item.status === "returned") {
    return (
      <Button 
        asChild
        size="sm" 
        className="bg-[#E63946] hover:bg-[#E63946]/90 text-white text-xs h-8"
      >
        <Link href="/moderator/review">Review lai</Link>
      </Button>
    )
  }
}

export default function QueueDashboardPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "processing" | "returned">("pending")
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [sortBy, setSortBy] = useState("priority")
  const [searchQuery, setSearchQuery] = useState("")

  // Count by status
  const counts = useMemo(() => ({
    pending: queueData.filter(i => i.status === "pending").length,
    processing: queueData.filter(i => i.status === "processing").length,
    returned: queueData.filter(i => i.status === "returned").length,
  }), [])

  // Filter and sort data
  const filteredData = useMemo(() => {
    let data = queueData.filter(item => item.status === activeTab)

    // Filter by topic
    if (selectedTopics.length > 0) {
      data = data.filter(item => selectedTopics.includes(item.topicCategory))
    }

    // Filter by difficulty
    if (selectedDifficulties.length > 0) {
      data = data.filter(item => selectedDifficulties.includes(item.difficulty))
    }

    // Filter by priority
    if (selectedPriority !== "all") {
      data = data.filter(item => item.priorityLevel === selectedPriority)
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      data = data.filter(item => 
        item.topic.toLowerCase().includes(query) || 
        item.id.toLowerCase().includes(query)
      )
    }

    // Sort
    if (sortBy === "priority") {
      data.sort((a, b) => b.priorityScore - a.priorityScore)
    } else if (sortBy === "wait-time") {
      data.sort((a, b) => b.waitHours - a.waitHours)
    } else if (sortBy === "students") {
      data.sort((a, b) => b.students - a.students)
    }

    return data
  }, [activeTab, selectedTopics, selectedDifficulties, selectedPriority, sortBy, searchQuery])

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(t => t !== topicId)
        : [...prev, topicId]
    )
  }

  const handleDifficultyToggle = (diffId: string) => {
    setSelectedDifficulties(prev => 
      prev.includes(diffId) 
        ? prev.filter(d => d !== diffId)
        : [...prev, diffId]
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#F5F7FA]">
      {/* Top Bar */}
      <QueueTopBar activeTab="queue" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden p-6">
        {/* Status Tabs */}
        <div className="flex gap-2 mb-4 shrink-0">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "pending"
                ? "bg-[#1D3557] text-white"
                : "bg-[#F0F0F0] text-[#6B7280] hover:bg-[#E5E7EB]"
            }`}
          >
            Cho review ({counts.pending})
          </button>
          <button
            onClick={() => setActiveTab("processing")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "processing"
                ? "bg-[#1D3557] text-white"
                : "bg-[#F0F0F0] text-[#6B7280] hover:bg-[#E5E7EB]"
            }`}
          >
            Dang xu ly ({counts.processing})
          </button>
          <button
            onClick={() => setActiveTab("returned")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "returned"
                ? "bg-[#1D3557] text-white"
                : "bg-[#F0F0F0] text-[#6B7280] hover:bg-[#E5E7EB]"
            }`}
          >
            Tra ve ({counts.returned})
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 mb-4 shrink-0">
          {/* Topic Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-[#A8DADC] text-[#1D3557] gap-2 bg-white">
                Chu de
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3 space-y-2">
              {topics.map(topic => (
                <label key={topic.id} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedTopics.includes(topic.id)}
                    onCheckedChange={() => handleTopicToggle(topic.id)}
                    className="border-[#A8DADC] data-[state=checked]:bg-[#A8DADC] data-[state=checked]:border-[#A8DADC]"
                  />
                  <span className="text-sm text-[#1D3557]">{topic.label}</span>
                </label>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Difficulty Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-[#A8DADC] text-[#1D3557] gap-2 bg-white">
                Do kho
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3 space-y-2">
              {difficulties.map(diff => (
                <label key={diff.id} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedDifficulties.includes(diff.id)}
                    onCheckedChange={() => handleDifficultyToggle(diff.id)}
                    className="border-[#A8DADC] data-[state=checked]:bg-[#A8DADC] data-[state=checked]:border-[#A8DADC]"
                  />
                  <span className="text-sm text-[#1D3557]">{diff.label}</span>
                </label>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Priority Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-[#A8DADC] text-[#1D3557] gap-2 bg-white">
                Muc uu tien
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3">
              <RadioGroup value={selectedPriority} onValueChange={setSelectedPriority} className="space-y-2">
                {priorities.map(priority => (
                  <div key={priority.id} className="flex items-center gap-2">
                    <RadioGroupItem value={priority.id} id={`priority-${priority.id}`} />
                    <Label htmlFor={`priority-${priority.id}`} className="text-sm text-[#1D3557] cursor-pointer">
                      {priority.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-[#A8DADC] text-[#1D3557] gap-2 bg-white">
                Sap xep
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3">
              <RadioGroup value={sortBy} onValueChange={setSortBy} className="space-y-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="priority" id="sort-priority" />
                  <Label htmlFor="sort-priority" className="text-sm text-[#1D3557] cursor-pointer flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Uu tien cao nhat
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="wait-time" id="sort-wait" />
                  <Label htmlFor="sort-wait" className="text-sm text-[#1D3557] cursor-pointer flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Cho lau nhat
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="students" id="sort-students" />
                  <Label htmlFor="sort-students" className="text-sm text-[#1D3557] cursor-pointer flex items-center gap-1">
                    <Users className="h-3 w-3" /> Nhieu hoc sinh nhat
                  </Label>
                </div>
              </RadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#457B9D]" />
            <Input 
              placeholder="Tim kiem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#A8DADC] focus-visible:ring-[#457B9D] bg-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <div className="bg-white rounded-lg border border-[#A8DADC] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[80px_80px_1fr_100px_80px_100px_100px_160px] gap-4 px-4 py-3 bg-[#F5F7FA] border-b border-[#A8DADC]">
              <span className="text-xs font-semibold text-[#457B9D] uppercase">Uu tien</span>
              <span className="text-xs font-semibold text-[#457B9D] uppercase">Ma bai</span>
              <span className="text-xs font-semibold text-[#457B9D] uppercase">Chu de</span>
              <span className="text-xs font-semibold text-[#457B9D] uppercase">Do kho</span>
              <span className="text-xs font-semibold text-[#457B9D] uppercase">Hoc sinh</span>
              <span className="text-xs font-semibold text-[#457B9D] uppercase">Thoi gian cho</span>
              <span className="text-xs font-semibold text-[#457B9D] uppercase">Trang thai</span>
              <span className="text-xs font-semibold text-[#457B9D] uppercase">Hanh dong</span>
            </div>

            {/* Table Rows */}
            {filteredData.map((item) => (
              <div 
                key={item.id}
                className={`
                  grid grid-cols-[80px_80px_1fr_100px_80px_100px_100px_160px] gap-4 px-4 py-4 
                  border-b border-[#A8DADC] last:border-b-0
                  hover:bg-[#EEF4F7] transition-colors items-center
                  ${item.priorityLevel === "Cao" ? "border-l-4 border-l-[#E63946] bg-[#FFF5F5]" : ""}
                `}
              >
                <div>{getPriorityBadge(item.priorityLevel)}</div>
                <span className="text-sm font-medium text-[#1D3557]">{item.id}</span>
                <span className="text-sm text-[#1D3557]">{item.topic}</span>
                <div>{getDifficultyBadge(item.difficulty)}</div>
                <span className="text-sm font-medium text-[#1D3557]">{item.students}</span>
                <span className={`text-sm ${getWaitTimeStyle(item.waitHours)}`}>
                  {item.waitTime}
                </span>
                <div>{getStatusBadge(item.status)}</div>
                <div>{getActionButton(item)}</div>
              </div>
            ))}

            {filteredData.length === 0 && (
              <div className="p-8 text-center text-[#457B9D]">
                Khong co bai nao trong danh sach nay
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
