"use client"

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import {
  Search,
  ChevronDown,
  ChevronRight,
  Sparkles,
  X,
  Calendar,
  Clock,
  Upload,
  FileText,
  Pencil,
  Paperclip,
  Loader2,
  AlertTriangle,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Problem = {
  id: string
  title: string
  tags: { label: string; color: string }[]
  isAISuggested?: boolean
}

type UploadedFile = {
  name: string
  size: number
  type: "image" | "pdf" | "word"
  url?: string
}

type AIProcessingState = "idle" | "processing" | "success" | "error"

const problems: Problem[] = [
  {
    id: "1",
    title: "Giao tuyến hai mặt phẳng — Bài cơ bản",
    tags: [
      { label: "Giao tuyến", color: "bg-teal text-navy" },
      { label: "Trung bình", color: "bg-blue text-light" },
      { label: "~15 phút", color: "bg-border-color text-navy" },
    ],
    isAISuggested: true,
  },
  {
    id: "2",
    title: "Xác định giao tuyến — Hình chóp",
    tags: [
      { label: "Giao tuyến", color: "bg-teal text-navy" },
      { label: "Khó", color: "bg-red text-light" },
      { label: "~20 phút", color: "bg-border-color text-navy" },
    ],
    isAISuggested: true,
  },
  {
    id: "3",
    title: "Giao tuyến trong hình lăng trụ",
    tags: [
      { label: "Mặt phẳng", color: "bg-teal text-navy" },
      { label: "Trung bình", color: "bg-blue text-light" },
      { label: "~18 phút", color: "bg-border-color text-navy" },
    ],
    isAISuggested: true,
  },
  {
    id: "4",
    title: "Hình chóp S.ABCD — Tính thể tích và góc",
    tags: [
      { label: "Hình chóp", color: "bg-teal text-navy" },
      { label: "Khó", color: "bg-red text-light" },
      { label: "~25 phút", color: "bg-border-color text-navy" },
    ],
  },
  {
    id: "5",
    title: "Góc giữa hai mặt phẳng — Cơ bản",
    tags: [
      { label: "Góc", color: "bg-teal text-navy" },
      { label: "Dễ", color: "bg-success text-light" },
      { label: "~12 phút", color: "bg-border-color text-navy" },
    ],
  },
  {
    id: "6",
    title: "Khoảng cách từ điểm đến mặt phẳng",
    tags: [
      { label: "Khoảng cách", color: "bg-teal text-navy" },
      { label: "Trung bình", color: "bg-blue text-light" },
      { label: "~20 phút", color: "bg-border-color text-navy" },
    ],
  },
]

const topicOptions = ["Hình chóp", "Hình lăng trụ", "Giao tuyến mặt phẳng", "Góc & Khoảng cách", "Khác"]
const difficultyOptions = ["Cơ bản", "Trung bình", "Nâng cao"]

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function GiaoBaiPage() {
  const [selectedProblems, setSelectedProblems] = useState<Problem[]>([
    problems[0],
    problems[3],
  ])
  const [assignTo, setAssignTo] = useState<"class" | "students">("class")
  
  // Left panel tabs
  const [leftPanelTab, setLeftPanelTab] = useState<"library" | "create">("library")
  
  // Create new problem form state
  const [problemName, setProblemName] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("Hình chóp")
  const [selectedDifficulty, setSelectedDifficulty] = useState("Trung bình")
  const [estimatedTime, setEstimatedTime] = useState("20")
  const [problemContent, setProblemContent] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [advancedOptions, setAdvancedOptions] = useState({
    build3D: true,
    createHints: true,
    createSolution: false,
    createDiagnostic: false,
  })
  const [gradingNotes, setGradingNotes] = useState("")
  
  // Content input tabs
  const [contentInputTab, setContentInputTab] = useState<"text" | "upload">("text")
  
  // File upload state
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [aiProcessingState, setAIProcessingState] = useState<AIProcessingState>("idle")
  const [extractedText, setExtractedText] = useState("")
  const [showFullExtractedText, setShowFullExtractedText] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Preview modal
  const [showPreview, setShowPreview] = useState(false)

  const toggleProblem = (problem: Problem) => {
    if (selectedProblems.find((p) => p.id === problem.id)) {
      setSelectedProblems(selectedProblems.filter((p) => p.id !== problem.id))
    } else {
      setSelectedProblems([...selectedProblems, problem])
    }
  }

  const removeProblem = (id: string) => {
    setSelectedProblems(selectedProblems.filter((p) => p.id !== id))
  }

  const isSelected = (id: string) =>
    selectedProblems.some((p) => p.id === id)

  const handleFileSelect = useCallback((file: File) => {
    const fileType = file.type
    let type: "image" | "pdf" | "word" = "image"
    
    if (fileType === "application/pdf") {
      type = "pdf"
    } else if (
      fileType === "application/msword" ||
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      type = "word"
    }
    
    const uploadedFile: UploadedFile = {
      name: file.name,
      size: file.size,
      type,
      url: type === "image" ? URL.createObjectURL(file) : undefined,
    }
    
    setUploadedFile(uploadedFile)
    setAIProcessingState("processing")
    
    // Simulate AI processing
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% success rate for demo
      if (success) {
        setAIProcessingState("success")
        setExtractedText(
          "Cho hình chóp S.ABCD có đáy là hình vuông cạnh a, SA vuông góc với mặt đáy và SA = a√2. Tính thể tích khối chóp và góc giữa SB và mặt đáy ABCD."
        )
      } else {
        setAIProcessingState("error")
      }
    }, 2000)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFileSelect(file)
    },
    [handleFileSelect]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const removeFile = () => {
    setUploadedFile(null)
    setAIProcessingState("idle")
    setExtractedText("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const addCreatedProblemToList = () => {
    const newProblem: Problem = {
      id: `custom-${Date.now()}`,
      title: problemName || "Bài tập mới",
      tags: [
        { label: selectedTopic, color: "bg-teal text-navy" },
        {
          label: selectedDifficulty,
          color:
            selectedDifficulty === "Cơ bản"
              ? "bg-success text-light"
              : selectedDifficulty === "Trung bình"
              ? "bg-blue text-light"
              : "bg-red text-light",
        },
        { label: `~${estimatedTime} phút`, color: "bg-border-color text-navy" },
      ],
    }
    setSelectedProblems([...selectedProblems, newProblem])
    setShowPreview(false)
    // Reset form
    setProblemName("")
    setProblemContent("")
    setLeftPanelTab("library")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-muted-text">
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>{" "}
          / Giao bài
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-navy">
          Tạo & Giao bài mới
        </h1>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Panel - Problem Selection / Creation */}
        <div className="col-span-7">
          <div className="rounded-[10px] border border-border-color bg-card-bg shadow-sm">
            <div className="flex items-center justify-between border-b border-border-color px-6 py-4">
              <h2 className="font-semibold text-navy">Chọn bài tập</h2>
              <span className="rounded-full bg-teal px-2.5 py-0.5 text-xs font-medium text-navy">
                {selectedProblems.length} bài được chọn
              </span>
            </div>

            <div className="p-6">
              {/* Tab Bar */}
              <div className="mb-4 flex rounded-[10px] bg-hover-row p-1">
                <button
                  onClick={() => setLeftPanelTab("library")}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    leftPanelTab === "library"
                      ? "bg-navy text-light"
                      : "text-muted-text hover:text-navy"
                  }`}
                >
                  Thư viện bài có sẵn
                </button>
                <button
                  onClick={() => setLeftPanelTab("create")}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    leftPanelTab === "create"
                      ? "bg-navy text-light"
                      : "text-muted-text hover:text-navy"
                  }`}
                >
                  + Tạo đề mới
                </button>
              </div>

              {leftPanelTab === "library" ? (
                <>
                  {/* Search & Filters */}
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm bài tập..."
                        className="w-full rounded-lg border border-border-color bg-card-bg py-2 pl-10 pr-4 text-sm outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                      />
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-border-color bg-card-bg px-4 py-2 text-sm text-navy hover:bg-hover-row">
                      Tất cả chủ đề
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button className="flex items-center gap-2 rounded-lg border border-border-color bg-card-bg px-4 py-2 text-sm text-navy hover:bg-hover-row">
                      Tất cả mức độ
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>

                  {/* AI Suggestion Banner */}
                  <div className="mt-4 rounded-lg border border-teal border-l-4 bg-insight-bg p-3">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-5 w-5 text-blue" />
                      <div>
                        <p className="text-sm font-medium text-navy">
                          Gợi ý từ AI dựa trên lỗi của lớp:
                        </p>
                        <p className="mt-0.5 text-sm text-muted-text">
                          3 bài về Giao tuyến hai mặt phẳng phù hợp với lớp 11A1
                        </p>
                        <div className="mt-2 flex gap-2">
                          <span className="rounded-full bg-teal/50 px-2 py-0.5 text-xs text-navy">
                            Giao tuyến
                          </span>
                          <span className="rounded-full bg-teal/50 px-2 py-0.5 text-xs text-navy">
                            Mặt phẳng
                          </span>
                          <span className="rounded-full bg-teal/50 px-2 py-0.5 text-xs text-navy">
                            Trung bình
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Problem List */}
                  <div className="mt-4 max-h-[400px] divide-y divide-border-color overflow-y-auto">
                    {problems.map((problem) => (
                      <div
                        key={problem.id}
                        className={`flex items-center gap-4 p-4 transition-colors ${
                          isSelected(problem.id)
                            ? "border-l-4 border-l-teal bg-insight-bg"
                            : "border-l-4 border-l-transparent hover:bg-hover-row"
                        } ${problem.isAISuggested ? "border-l-teal" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected(problem.id)}
                          onChange={() => toggleProblem(problem)}
                          className="h-4 w-4 rounded border-border-color text-navy focus:ring-blue"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {problem.isAISuggested && (
                              <Sparkles className="h-4 w-4 text-teal" />
                            )}
                            <span className="font-medium text-navy">
                              {problem.title}
                            </span>
                          </div>
                          <div className="mt-2 flex gap-2">
                            {problem.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className={`rounded-full px-2 py-0.5 text-xs ${tag.color}`}
                              >
                                {tag.label}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant={isSelected(problem.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleProblem(problem)}
                          className={
                            isSelected(problem.id)
                              ? "bg-teal text-navy hover:bg-teal/80"
                              : "border-blue text-blue hover:bg-blue hover:text-light"
                          }
                        >
                          {isSelected(problem.id) ? "Đã chọn" : "Chọn"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Create New Problem Form */
                <div className="space-y-5">
                  {/* Section 1: Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="font-mono text-xs uppercase text-muted-text">
                        Tên bài tập
                      </label>
                      <input
                        type="text"
                        value={problemName}
                        onChange={(e) => setProblemName(e.target.value)}
                        placeholder="VD: Hình chóp S.ABCD — Tính thể tích và góc"
                        className="mt-2 w-full rounded-lg border border-border-color bg-card-bg py-2 px-3 text-sm outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs uppercase text-muted-text">
                        Chủ đề
                      </label>
                      <div className="mt-2 relative">
                        <select
                          value={selectedTopic}
                          onChange={(e) => setSelectedTopic(e.target.value)}
                          className="w-full appearance-none rounded-lg border border-border-color bg-card-bg py-2 px-3 pr-10 text-sm outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                        >
                          {topicOptions.map((topic) => (
                            <option key={topic} value={topic}>
                              {topic}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-xs uppercase text-muted-text">
                        Mức độ
                      </label>
                      <div className="mt-2 flex gap-2">
                        {difficultyOptions.map((diff) => (
                          <button
                            key={diff}
                            onClick={() => setSelectedDifficulty(diff)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                              selectedDifficulty === diff
                                ? "bg-navy text-light"
                                : "border border-border-color bg-card-bg text-navy hover:bg-hover-row"
                            }`}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-xs uppercase text-muted-text">
                        Thời gian ước tính
                      </label>
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="number"
                          value={estimatedTime}
                          onChange={(e) => setEstimatedTime(e.target.value)}
                          className="w-20 rounded-lg border border-border-color bg-card-bg py-2 px-3 text-sm outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                        />
                        <span className="text-sm text-muted-text">phút</span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-border-color" />

                  {/* Section 2: Problem Content */}
                  <div>
                    <label className="font-mono text-xs uppercase text-muted-text">
                      Đề bài <span className="text-red">*</span>
                    </label>
                    
                    {/* Content Input Tabs */}
                    <div className="mt-2 mb-3 flex rounded-lg bg-hover-row p-1 w-fit">
                      <button
                        onClick={() => setContentInputTab("text")}
                        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                          contentInputTab === "text"
                            ? "bg-navy text-light"
                            : "text-muted-text hover:text-navy"
                        }`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Nhập text
                      </button>
                      <button
                        onClick={() => setContentInputTab("upload")}
                        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                          contentInputTab === "upload"
                            ? "bg-navy text-light"
                            : "text-muted-text hover:text-navy"
                        }`}
                      >
                        <Paperclip className="h-3.5 w-3.5" />
                        Upload file
                      </button>
                    </div>

                    {contentInputTab === "text" ? (
                      <>
                        <textarea
                          value={problemContent}
                          onChange={(e) => setProblemContent(e.target.value)}
                          placeholder={`Nhập đề bài bằng ngôn ngữ tự nhiên...

VD: Cho hình chóp S.ABCD có đáy là hình vuông cạnh a, 
SA vuông góc với mặt đáy và SA = a√2. 
Tính thể tích khối chóp và góc giữa SB và mặt đáy ABCD.`}
                          className="w-full min-h-[140px] rounded-lg border border-border-color bg-card-bg p-3 text-sm outline-none focus:border-blue focus:ring-1 focus:ring-blue resize-y"
                        />
                        <p className="mt-2 text-xs text-muted-text">
                          Viết tự nhiên như bạn đọc cho học sinh. AI sẽ tự phân tích cấu trúc hình học.
                        </p>
                      </>
                    ) : (
                      <div className="space-y-3">
                        {!uploadedFile ? (
                          <>
                            <div
                              onDrop={handleDrop}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              className={`flex min-h-[160px] flex-col items-center justify-center rounded-[10px] border-2 border-dashed p-8 text-center transition-colors ${
                                isDragging
                                  ? "border-teal bg-insight-bg"
                                  : "border-border-color bg-card-bg"
                              }`}
                            >
                              <Upload className="h-8 w-8 text-blue" />
                              <p className="mt-3 font-medium text-navy">
                                Kéo thả file vào đây
                              </p>
                              <p className="mt-1 text-sm text-muted-text">hoặc</p>
                              <button
                                onClick={() => fileInputRef.current?.click()}
                                className="mt-2 rounded-lg border border-blue px-4 py-2 text-sm font-medium text-blue transition-colors hover:bg-blue hover:text-light"
                              >
                                Chọn file từ máy
                              </button>
                              <p className="mt-3 font-mono text-xs text-muted-text">
                                Hỗ trợ: JPG · PNG · PDF · DOCX · DOC · Tối đa 20MB
                              </p>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                onChange={handleFileInputChange}
                                className="hidden"
                              />
                            </div>
                            <p className="text-xs italic text-muted-text">
                              Cần upload nhiều trang? Gộp thành 1 PDF trước khi upload.
                            </p>
                          </>
                        ) : (
                          <div className="space-y-3">
                            {/* File Preview Card */}
                            <div className="rounded-[10px] border border-border-color bg-card-bg p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                  {uploadedFile.type === "image" && uploadedFile.url ? (
                                    <img
                                      src={uploadedFile.url}
                                      alt="Preview"
                                      className="h-[180px] max-w-full rounded-lg object-contain"
                                    />
                                  ) : (
                                    <FileText
                                      className={`h-10 w-10 ${
                                        uploadedFile.type === "pdf"
                                          ? "text-red"
                                          : "text-blue"
                                      }`}
                                    />
                                  )}
                                  {uploadedFile.type !== "image" && (
                                    <div>
                                      <p className="font-medium text-navy">
                                        {uploadedFile.name}
                                      </p>
                                      <p className="font-mono text-xs text-muted-text">
                                        {formatFileSize(uploadedFile.size)}
                                      </p>
                                      <span
                                        className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs ${
                                          uploadedFile.type === "pdf"
                                            ? "bg-red text-light"
                                            : "bg-blue text-light"
                                        }`}
                                      >
                                        {uploadedFile.type === "pdf" ? "PDF" : "Word"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-sm text-blue hover:underline"
                                  >
                                    Đổi file
                                  </button>
                                  <button
                                    onClick={removeFile}
                                    className="text-muted-text hover:text-red"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                              {uploadedFile.type === "image" && (
                                <div className="mt-3">
                                  <p className="font-mono text-xs text-muted-text">
                                    {uploadedFile.name} · {formatFileSize(uploadedFile.size)}
                                  </p>
                                  <span className="mt-1 inline-block rounded-full bg-teal px-2 py-0.5 text-xs text-navy">
                                    Ảnh
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* AI Processing States */}
                            {aiProcessingState === "processing" && (
                              <div className="flex items-center gap-3 rounded-lg border border-teal bg-insight-bg p-3">
                                <Loader2 className="h-5 w-5 animate-spin text-blue" />
                                <span className="text-sm text-navy">
                                  AI đang đọc và phân tích đề bài...
                                </span>
                              </div>
                            )}

                            {aiProcessingState === "success" && (
                              <div className="rounded-lg border-l-[3px] border-l-teal bg-insight-bg p-3">
                                <div className="flex items-center gap-2 text-sm font-medium text-navy">
                                  <Check className="h-4 w-4 text-success" />
                                  AI đã nhận diện được đề bài
                                </div>
                                <p className="mt-2 text-sm italic text-muted-text">
                                  {showFullExtractedText
                                    ? extractedText
                                    : `${extractedText.substring(0, 100)}...`}
                                </p>
                                <div className="mt-2 flex items-center gap-3">
                                  <button
                                    onClick={() => setShowFullExtractedText(!showFullExtractedText)}
                                    className="text-sm text-blue hover:underline"
                                  >
                                    {showFullExtractedText ? "Thu gọn ▴" : "Xem toàn bộ ▾"}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setProblemContent(extractedText)
                                      setContentInputTab("text")
                                    }}
                                    className="text-sm text-blue hover:underline"
                                  >
                                    {"Chỉnh sửa trong tab Text →"}
                                  </button>
                                </div>
                              </div>
                            )}

                            {aiProcessingState === "error" && (
                              <div className="rounded-lg border-l-[3px] border-l-red bg-error-bg p-3">
                                <div className="flex items-center gap-2 text-sm font-medium text-navy">
                                  <AlertTriangle className="h-4 w-4 text-red" />
                                  AI không đọc được file này. Hãy thử:
                                </div>
                                <ul className="mt-2 ml-6 list-disc text-sm text-muted-text">
                                  <li>Chụp lại ảnh rõ hơn, đủ sáng</li>
                                  <li>Đảm bảo chữ không bị mờ hoặc nghiêng</li>
                                  <li>Với Word/PDF: đảm bảo file không bị khoá chỉnh sửa</li>
                                </ul>
                                <div className="mt-3 flex gap-2">
                                  <button
                                    onClick={() => {
                                      setAIProcessingState("processing")
                                      setTimeout(() => setAIProcessingState("success"), 2000)
                                      setExtractedText(
                                        "Cho hình chóp S.ABCD có đáy là hình vuông cạnh a..."
                                      )
                                    }}
                                    className="rounded-lg border border-blue px-3 py-1.5 text-sm font-medium text-blue hover:bg-blue hover:text-light"
                                  >
                                    Thử lại
                                  </button>
                                  <button
                                    onClick={() => setContentInputTab("text")}
                                    className="rounded-lg bg-navy px-3 py-1.5 text-sm font-medium text-light hover:bg-blue"
                                  >
                                    Nhập text thay thế
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <hr className="border-border-color" />

                  {/* Section 3: Advanced Options (Collapsible) */}
                  <div>
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center gap-2 text-sm font-medium text-navy hover:text-blue"
                    >
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          showAdvanced ? "rotate-90" : ""
                        }`}
                      />
                      Tuỳ chọn nâng cao cho AI
                    </button>

                    {showAdvanced && (
                      <div className="mt-4 space-y-4 pl-6">
                        <div>
                          <label className="font-mono text-xs uppercase text-muted-text">
                            Yêu cầu cụ thể
                          </label>
                          <div className="mt-2 space-y-2">
                            {[
                              { key: "build3D", label: "Yêu cầu dựng hình 3D" },
                              { key: "createHints", label: "Tạo gợi ý từng bước" },
                              { key: "createSolution", label: "Tạo lời giải mẫu đầy đủ" },
                              { key: "createDiagnostic", label: "Tạo câu hỏi chẩn đoán sau khi nộp" },
                            ].map((option) => (
                              <label
                                key={option.key}
                                className="flex items-center gap-2 text-sm text-navy cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={advancedOptions[option.key as keyof typeof advancedOptions]}
                                  onChange={(e) =>
                                    setAdvancedOptions({
                                      ...advancedOptions,
                                      [option.key]: e.target.checked,
                                    })
                                  }
                                  className="h-4 w-4 rounded border-border-color text-navy focus:ring-blue"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="font-mono text-xs uppercase text-muted-text">
                            Lưu ý khi chấm
                          </label>
                          <textarea
                            value={gradingNotes}
                            onChange={(e) => setGradingNotes(e.target.value)}
                            placeholder="VD: Chú ý học sinh hay nhầm chiều cao với cạnh bên..."
                            className="mt-2 w-full rounded-lg border border-border-color bg-card-bg p-3 text-sm outline-none focus:border-blue focus:ring-1 focus:ring-blue resize-y"
                            rows={2}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 4: Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <Button
                      variant="outline"
                      className="w-full border-blue text-blue hover:bg-blue hover:text-light"
                      onClick={() => setShowPreview(true)}
                    >
                      {"Xem trước đề →"}
                    </Button>
                    <Button
                      className="w-full bg-navy text-light hover:bg-blue"
                      onClick={addCreatedProblemToList}
                    >
                      Thêm vào danh sách giao
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Configuration */}
        <div className="col-span-5">
          <div className="rounded-[10px] border border-border-color bg-card-bg shadow-sm">
            <div className="border-b border-border-color px-6 py-4">
              <h2 className="font-semibold text-navy">Cấu hình giao bài</h2>
            </div>

            <div className="p-6">
              {/* Selected Problems */}
              <div>
                <label className="font-mono text-xs uppercase text-muted-text">
                  Bài đã chọn
                </label>
                <div className="mt-2 space-y-2">
                  {selectedProblems.map((problem) => (
                    <div
                      key={problem.id}
                      className="flex items-center justify-between rounded-lg border border-border-color bg-page-bg px-3 py-2"
                    >
                      <span className="text-sm text-navy">{problem.title}</span>
                      <button
                        onClick={() => removeProblem(problem.id)}
                        className="text-muted-text hover:text-red"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border-color py-3 text-sm text-muted-text hover:border-blue hover:text-blue">
                    + Thêm bài từ danh sách bên
                  </button>
                </div>
              </div>

              <hr className="my-5 border-border-color" />

              {/* Deadline */}
              <div>
                <label className="font-mono text-xs uppercase text-muted-text">
                  Thời hạn nộp bài
                </label>
                <div className="mt-2 flex gap-3">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
                    <input
                      type="text"
                      defaultValue="10/03/2026"
                      className="w-full rounded-lg border border-border-color bg-card-bg py-2 pl-10 pr-4 font-mono text-sm outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                    />
                  </div>
                  <div className="relative w-28">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
                    <input
                      type="text"
                      defaultValue="23:59"
                      className="w-full rounded-lg border border-border-color bg-card-bg py-2 pl-10 pr-4 font-mono text-sm outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                    />
                  </div>
                </div>
              </div>

              <hr className="my-5 border-border-color" />

              {/* Assign To */}
              <div>
                <label className="font-mono text-xs uppercase text-muted-text">
                  Giao cho
                </label>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => setAssignTo("class")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      assignTo === "class"
                        ? "bg-navy text-light"
                        : "border border-border-color bg-card-bg text-navy hover:bg-hover-row"
                    }`}
                  >
                    Cả lớp 11A1
                  </button>
                  <button
                    onClick={() => setAssignTo("students")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      assignTo === "students"
                        ? "bg-navy text-light"
                        : "border border-border-color bg-card-bg text-navy hover:bg-hover-row"
                    }`}
                  >
                    Chọn học sinh cụ thể
                  </button>
                </div>
                {assignTo === "students" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-teal px-2.5 py-1 text-xs text-navy">
                      Trần Minh Khoa
                      <X className="h-3 w-3 cursor-pointer" />
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-teal px-2.5 py-1 text-xs text-navy">
                      Lê Thu Hương
                      <X className="h-3 w-3 cursor-pointer" />
                    </span>
                    <button className="rounded-full border border-dashed border-border-color px-2.5 py-1 text-xs text-muted-text hover:border-blue hover:text-blue">
                      + Thêm
                    </button>
                  </div>
                )}
              </div>

              <hr className="my-5 border-border-color" />

              {/* Notes */}
              <div>
                <label className="font-mono text-xs uppercase text-muted-text">
                  Ghi chú cho học sinh (tùy chọn)
                </label>
                <textarea
                  placeholder="Thêm hướng dẫn hoặc lưu ý..."
                  className="mt-2 w-full rounded-lg border border-border-color bg-card-bg p-3 text-sm outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  className="border-blue text-blue hover:bg-blue hover:text-light"
                >
                  Lưu nháp
                </Button>
                <Button className="bg-navy text-light hover:bg-blue">
                  Giao bài ngay
                  <span className="ml-2">→</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-[600px] bg-page-bg border-border-color">
          <DialogHeader>
            <DialogTitle className="text-navy">Xem trước đề bài</DialogTitle>
          </DialogHeader>
          
          <div className="rounded-[10px] border border-border-color bg-card-bg p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-teal px-2.5 py-0.5 text-xs text-navy">
                {selectedTopic}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs ${
                  selectedDifficulty === "Cơ bản"
                    ? "bg-success text-light"
                    : selectedDifficulty === "Trung bình"
                    ? "bg-blue text-light"
                    : "bg-red text-light"
                }`}
              >
                {selectedDifficulty}
              </span>
              <span className="rounded-full border border-border-color px-2.5 py-0.5 text-xs text-navy">
                ~{estimatedTime} phút
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-4 text-lg font-semibold text-navy">
              {problemName || "Bài tập mới"}
            </h3>

            {/* Content */}
            <p className="mt-3 text-sm text-navy whitespace-pre-wrap">
              {problemContent || extractedText || "Chưa có nội dung đề bài."}
            </p>

            <hr className="my-4 border-border-color" />

            {/* AI Analysis Preview */}
            <div className="rounded-lg border border-teal bg-insight-bg p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue" />
                <span className="font-medium text-navy">AI đã phân tích được:</span>
              </div>
              <ul className="mt-3 ml-5 list-disc space-y-1 text-sm text-navy">
                <li>Loại hình: Hình chóp tứ giác đều</li>
                <li>Đã cho: đáy hình vuông cạnh a, SA ⊥ đáy, SA = a√2</li>
                <li>Yêu cầu: Thể tích + Góc (SB, mp ABCD)</li>
                <li>Độ phức tạp: 5 bước lập luận</li>
              </ul>
              <p className="mt-3 text-xs text-muted-text">
                AI sẽ tự động tạo mô hình 3D và gợi ý khi học sinh làm bài.
              </p>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(false)}
              className="border-border-color text-navy hover:bg-hover-row"
            >
              Chỉnh sửa lại
            </Button>
            <Button
              onClick={addCreatedProblemToList}
              className="bg-navy text-light hover:bg-blue"
            >
              {"Thêm vào danh sách giao →"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
