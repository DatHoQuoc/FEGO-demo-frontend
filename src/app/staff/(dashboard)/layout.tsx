
import { StaffSidebar } from "@/components/layout/sidebar-staff"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-page-bg">
      <StaffSidebar />
      <main className="ml-60 flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
