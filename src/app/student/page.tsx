import { Sidebar } from "@/components/layout/sidebar-student"
import { DashboardContent } from "@/components/dashboard-content"

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)]">
      <Sidebar activeItem="Bài tập" />
      <main className="ml-60 p-8">
        <DashboardContent />
      </main>
    </div>
  )
}