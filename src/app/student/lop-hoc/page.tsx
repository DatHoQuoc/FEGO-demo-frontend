import { Sidebar } from "@/components/layout/sidebar-student"
import { JoinClassContent } from "@/components/join-class-content"

export default function LopHocPage() {
  return (
    <div className="flex min-h-screen bg-[#F4F8FA]">
      <Sidebar />
      <main className="ml-60 flex-1 p-8">
        <JoinClassContent />
      </main>
    </div>
  )
}
