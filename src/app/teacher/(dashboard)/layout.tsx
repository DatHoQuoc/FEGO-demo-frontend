"use client"

import { Sidebar } from "@/components/layout/sidebar-teacher"
import { SidebarProvider, useSidebar } from "@/components/layout/sidebar-context"


function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()
  
  return (
    <div className="flex min-h-screen bg-page-bg">
      <Sidebar />
      <main 
        className={`flex-1 p-8 transition-[margin-left] duration-300 ease-in-out ${
          isCollapsed ? "ml-16" : "ml-60"
        }`}
      >
        {children}
      </main>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  )
}
