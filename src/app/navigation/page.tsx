"use client"

import { useRouter } from "next/navigation"
import {
  Box,
  MessageCircle,
  ShieldCheck,
  ClipboardCheck,
  GraduationCap,
  BookOpenCheck,
  BarChart2
} from "lucide-react"
import Image from 'next/image';

const dashboards = [
  {
    id: "customer",
    route: "/chat",
    icon: MessageCircle,
    iconBg: "#A8DADC",
    iconColor: "#1D3557",
    role: "CUSTOMER",
    title: "Chat Interface",
    description: "Giao diện chat AI cho học sinh tự học",
    badge: "Chat · AI Mentor",
    badgeBg: "#EBF7F8",
    badgeText: "#457B9D",
  },
  {
    id: "admin",
    route: "/admin",
    icon: ShieldCheck,
    iconBg: "#1D3557",
    iconColor: "#F1FAEE",
    role: "ADMIN",
    title: "Admin Dashboard",
    description: "Quản lý toàn bộ hệ thống, người dùng và nội dung",
    badge: "System · Full Access",
    badgeBg: "#FEE2E2",
    badgeText: "#991B1B",
  },
  {
    id: "moderator",
    route: "/moderator",
    icon: ClipboardCheck,
    iconBg: "#457B9D",
    iconColor: "#F1FAEE",
    role: "MODERATOR",
    title: "Moderator Dashboard",
    description: "Kiểm duyệt bài toán và xác nhận chất lượng lời giải AI",
    badge: "Review · Queue",
    badgeBg: "#EBF7F8",
    badgeText: "#457B9D",
  },
  {
    id: "student",
    route: "/student",
    icon: GraduationCap,
    iconBg: "#A8DADC",
    iconColor: "#1D3557",
    role: "STUDENT",
    title: "Student Dashboard",
    description: "Bài tập từ giáo viên, tự học và kết quả phỏng vấn AI",
    badge: "Classroom · Self-study",
    badgeBg: "#EBF7F8",
    badgeText: "#457B9D",
  },
  {
    id: "teacher",
    route: "/teacher",
    icon: BookOpenCheck,
    iconBg: "#1D3557",
    iconColor: "#F1FAEE",
    role: "TEACHER",
    title: "Teacher Dashboard",
    description: "Giao bài, theo dõi lớp và báo cáo học sinh",
    badge: "Class · Reports",
    badgeBg: "#EBF7F8",
    badgeText: "#457B9D",
  },
  {
    id: "staff",
    route: "/staff",
    icon: BarChart2,
    iconBg: "#457B9D",
    iconColor: "#F1FAEE",
    role: "STAFF",
    title: "Staff Dashboard",
    description: "Vận hành kinh doanh, doanh thu và sức khỏe nền tảng",
    badge: "Ops · Revenue · Growth",
    badgeBg: "#EBF7F8",
    badgeText: "#457B9D",
  },
]

export default function NavigationHub() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-page-bg">
      {/* Top Bar */}
      <header
        className="flex items-center justify-between px-10 py-5"
        style={{ backgroundColor: "#1D3557" }}
      >
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <Image
            src="/images/logo.svg"
            alt="VisualEdu Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span
            className="font-semibold text-lg"
            style={{ color: "#F1FAEE" }}
          >
            VisualEdu
          </span>
        </div>
        <span
          className="font-mono text-sm"
          style={{ color: "#A8DADC" }}
        >
          Design Prototype Navigator
        </span>
        <span
          className="font-mono text-xs px-3 py-1 rounded-full border"
          style={{
            borderColor: "#A8DADC",
            color: "#A8DADC"
          }}
        >
          v1.0
        </span>
      </header>

      {/* Hero Section */}
      <section className="text-center pt-16 pb-10">
        <h1
          className="text-3xl font-bold"
          style={{ color: "#1D3557" }}
        >
          Chọn Dashboard
        </h1>
        <p
          className="text-base mt-2"
          style={{ color: "#6C7A89" }}
        >
          Mỗi nút dẫn đến prototype của một vai trò trong hệ thống
        </p>
      </section>

      {/* Navigation Grid */}
      <main className="max-w-[900px] mx-auto px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboards.map((dashboard) => {
            const Icon = dashboard.icon
            return (
              <button
                key={dashboard.id}
                onClick={() => router.push(dashboard.route)}
                className="group text-center p-8 rounded-[10px] border cursor-pointer transition-all duration-200 ease-out hover:shadow-[0_4px_16px_rgba(29,53,87,0.12)] active:scale-[0.98]"
                style={{
                  backgroundColor: "#F8FBFC",
                  borderColor: "#B8DDE0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#1D3557"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#B8DDE0"
                }}
              >
                {/* Icon Container */}
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                  style={{ backgroundColor: dashboard.iconBg }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: dashboard.iconColor }}
                  />
                </div>

                {/* Role Label */}
                <p
                  className="font-mono text-xs uppercase mt-4"
                  style={{ color: "#6C7A89" }}
                >
                  {dashboard.role}
                </p>

                {/* Title */}
                <h2
                  className="text-lg font-semibold mt-1"
                  style={{ color: "#1D3557" }}
                >
                  {dashboard.title}
                </h2>

                {/* Description */}
                <p
                  className="text-sm mt-2 leading-relaxed"
                  style={{ color: "#6C7A89" }}
                >
                  {dashboard.description}
                </p>

                {/* Badge */}
                <span
                  className="inline-block text-xs px-3 py-1 rounded-full mt-3"
                  style={{
                    backgroundColor: dashboard.badgeBg,
                    color: dashboard.badgeText,
                  }}
                >
                  {dashboard.badge}
                </span>

                {/* Open Link */}
                <p
                  className="text-sm font-medium mt-4"
                  style={{ color: "#457B9D" }}
                >
                  {"Mở →"}
                </p>
              </button>
            )
          })}
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center pb-8">
        <p
          className="font-mono text-xs"
          style={{ color: "#6C7A89" }}
        >
          VisualEdu Internal Prototype · 2026
        </p>
      </footer>
    </div>
  )
}
