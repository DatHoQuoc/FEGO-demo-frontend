"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type StatusFilter =
  | "all"
  | "active"
  | "pending"
  | "completed"
  | "overdue"

type Assignment = {
  id: string
  name: string
  class: string
  assignedDate: string
  deadline: string
  progress: { current: number; total: number }
  status: "active" | "pending" | "completed" | "overdue"
}

const statusLabels: Record<Assignment["status"], { label: string; color: string }> = {
  active: { label: "Đang diễn ra", color: "bg-blue text-light" },
  pending: { label: "Chờ nộp", color: "bg-teal text-navy" },
  completed: { label: "Hoàn thành", color: "bg-success text-light" },
  overdue: { label: "Quá hạn", color: "bg-red text-light" },
}

const assignments: Assignment[] = [
  {
    id: "1",
    name: "Hình chóp S.ABCD — Tính thể tích",
    class: "11A1",
    assignedDate: "04/03",
    deadline: "08/03",
    progress: { current: 18, total: 25 },
    status: "active",
  },
  {
    id: "2",
    name: "Góc giữa đường thẳng và mặt phẳng",
    class: "11A1",
    assignedDate: "05/03",
    deadline: "10/03",
    progress: { current: 5, total: 25 },
    status: "active",
  },
  {
    id: "3",
    name: "Xác định giao tuyến — Bài nâng cao",
    class: "11A1",
    assignedDate: "28/02",
    deadline: "05/03",
    progress: { current: 19, total: 25 },
    status: "overdue",
  },
  {
    id: "4",
    name: "Hình lăng trụ — Tính diện tích",
    class: "11A1",
    assignedDate: "25/02",
    deadline: "01/03",
    progress: { current: 25, total: 25 },
    status: "completed",
  },
  {
    id: "5",
    name: "Khoảng cách từ điểm đến mặt phẳng",
    class: "11A1",
    assignedDate: "20/02",
    deadline: "27/02",
    progress: { current: 25, total: 25 },
    status: "completed",
  },
  {
    id: "6",
    name: "Góc giữa hai mặt phẳng — Cơ bản",
    class: "11A1",
    assignedDate: "03/03",
    deadline: "07/03",
    progress: { current: 10, total: 25 },
    status: "pending",
  },
  {
    id: "7",
    name: "Thể tích khối chóp cụt",
    class: "11A1",
    assignedDate: "01/03",
    deadline: "06/03",
    progress: { current: 15, total: 25 },
    status: "pending",
  },
  {
    id: "8",
    name: "Hình chóp đều — Tổng hợp",
    class: "11A1",
    assignedDate: "06/03",
    deadline: "12/03",
    progress: { current: 2, total: 25 },
    status: "active",
  },
]

const statusCounts = {
  all: 8,
  active: 3,
  pending: 2,
  completed: 2,
  overdue: 1,
}

export default function DanhSachBaiPage() {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all")
  const [expandedRow, setExpandedRow] = useState<string | null>("1")

  const filteredAssignments =
    activeFilter === "all"
      ? assignments
      : assignments.filter((a) => a.status === activeFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-navy">
          Danh sách bài đã giao
        </h1>
        <Link href="/giao-bai">
          <Button className="bg-navy text-light hover:bg-blue">
            <Plus className="mr-2 h-4 w-4" />
            Giao bài mới
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="rounded-[10px] border border-border-color bg-card-bg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Status Tabs */}
          <div className="flex gap-2">
            {(
              [
                ["all", `Tất cả (${statusCounts.all})`],
                ["active", `Đang diễn ra (${statusCounts.active})`],
                ["pending", `Chờ nộp (${statusCounts.pending})`],
                ["completed", `Đã hoàn thành (${statusCounts.completed})`],
                ["overdue", `Quá hạn (${statusCounts.overdue})`],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === key
                    ? key === "overdue"
                      ? "bg-red text-light"
                      : "bg-navy text-light"
                    : key === "overdue"
                      ? "border border-red text-red hover:bg-red hover:text-light"
                      : "border border-border-color text-navy hover:bg-hover-row"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
              <input
                type="text"
                placeholder="Tìm theo tên bài..."
                className="w-48 rounded-lg border border-border-color bg-card-bg py-2 pl-10 pr-4 text-sm outline-none focus:border-blue focus:ring-1 focus:ring-blue"
              />
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-border-color bg-card-bg px-4 py-2 text-sm text-navy hover:bg-hover-row">
              <span className="font-mono text-xs">01/03 — 31/03/2026</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-border-color bg-card-bg px-4 py-2 text-sm text-navy hover:bg-hover-row">
              Mới nhất
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[10px] border border-border-color bg-card-bg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-navy text-left">
              <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-light">
                Tên bài tập
              </th>
              <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-light">
                Lớp
              </th>
              <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-light">
                Ngày giao
              </th>
              <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-light">
                Hạn nộp
              </th>
              <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-light">
                Tiến độ nộp
              </th>
              <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-light">
                Trạng thái
              </th>
              <th className="px-5 py-3 font-mono text-xs font-medium uppercase text-light">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map((assignment, index) => (
              <>
                <tr
                  key={assignment.id}
                  onClick={() =>
                    setExpandedRow(
                      expandedRow === assignment.id ? null : assignment.id
                    )
                  }
                  className={`cursor-pointer border-b border-border-color transition-colors ${
                    assignment.status === "overdue"
                      ? "bg-error-bg"
                      : index % 2 === 0
                        ? "bg-card-bg"
                        : "bg-page-bg"
                  } hover:bg-hover-row`}
                >
                  <td className="px-5 py-4 text-sm font-medium text-navy">
                    {assignment.name}
                  </td>
                  <td className="px-5 py-4 font-mono text-sm text-muted-text">
                    {assignment.class}
                  </td>
                  <td className="px-5 py-4 font-mono text-sm text-muted-text">
                    {assignment.assignedDate}
                  </td>
                  <td className="px-5 py-4 font-mono text-sm text-muted-text">
                    {assignment.deadline}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-border-color">
                        <div
                          className={`h-full rounded-full ${
                            assignment.status === "overdue"
                              ? "bg-red"
                              : "bg-teal"
                          }`}
                          style={{
                            width: `${(assignment.progress.current / assignment.progress.total) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-mono text-xs text-muted-text">
                        {assignment.progress.current}/{assignment.progress.total}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusLabels[assignment.status].color}`}
                    >
                      {statusLabels[assignment.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href="/bao-cao"
                        className="text-sm text-blue hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Xem báo cáo
                      </Link>
                      {assignment.status !== "completed" && (
                        <button
                          className="text-sm text-blue hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Nhắc học sinh
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {/* Expanded Row */}
                {expandedRow === assignment.id && (
                  <tr
                    key={`${assignment.id}-expanded`}
                    className="border-b border-border-color bg-insight-bg"
                  >
                    <td colSpan={7} className="px-5 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-6">
                          <div className="rounded-lg bg-card-bg px-4 py-2">
                            <span className="text-sm text-muted-text">
                              Đã nộp:{" "}
                            </span>
                            <span className="font-mono font-medium text-navy">
                              {assignment.progress.current}
                            </span>
                          </div>
                          <div className="rounded-lg bg-card-bg px-4 py-2">
                            <span className="text-sm text-muted-text">
                              Hiểu thực:{" "}
                            </span>
                            <span className="font-mono font-medium text-navy">
                              62%
                            </span>
                          </div>
                          <div className="rounded-lg bg-card-bg px-4 py-2">
                            <span className="text-sm text-muted-text">
                              Điểm nghẽn:{" "}
                            </span>
                            <span className="font-mono font-medium text-navy">
                              Bước 3
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Link
                            href="/bao-cao"
                            className="text-sm text-blue hover:underline"
                          >
                            Xem báo cáo chi tiết →
                          </Link>
                          <button className="text-sm text-blue hover:underline">
                            Nhắc{" "}
                            {assignment.progress.total -
                              assignment.progress.current}{" "}
                            học sinh chưa nộp →
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border-color px-5 py-3">
          <span className="text-sm text-muted-text">
            Hiển thị 1-8 / 14 bài
          </span>
          <div className="flex gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-color text-navy hover:bg-hover-row">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-color text-navy hover:bg-hover-row">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
