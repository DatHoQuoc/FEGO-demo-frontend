import { DashboardHeader } from "@/components/dashboard/header"
import { StatsRow } from "@/components/dashboard/stats-row"
import { AlertCard } from "@/components/dashboard/alert-card"
import { AssignmentsTable } from "@/components/dashboard/assignments-table"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatsRow />
      <AlertCard />
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <AssignmentsTable />
        </div>
        <div className="col-span-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
