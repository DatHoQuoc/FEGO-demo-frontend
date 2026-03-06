"use client";

import {
  CheckCircle2,
  Clock,
  Loader2,
  AlertCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Job, JobStatus } from "@/types";
import type { LucideIcon } from "lucide-react";

interface JobStatusPanelProps {
  jobs: Job[];
  onJobClick?: (jobId: string) => void;
}

const STATUS_CONFIG: Record<
  JobStatus,
  { icon: LucideIcon; label: string; color: string; badgeClass: string }
> = {
  queued: {
    icon: Clock,
    label: "Cho xu ly",
    color: "text-muted-foreground",
    badgeClass: "bg-muted text-muted-foreground",
  },
  processing: {
    icon: Loader2,
    label: "Dang xu ly",
    color: "text-primary",
    badgeClass: "bg-primary/15 text-primary",
  },
  complete: {
    icon: CheckCircle2,
    label: "Hoan thanh",
    color: "text-success",
    badgeClass: "bg-success/15 text-success",
  },
  error: {
    icon: AlertCircle,
    label: "Loi",
    color: "text-destructive",
    badgeClass: "bg-destructive/15 text-destructive",
  },
  cancelled: {
    icon: XCircle,
    label: "Da huy",
    color: "text-muted-foreground",
    badgeClass: "bg-muted text-muted-foreground",
  },
};

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s truoc`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m truoc`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h truoc`;
}

export function JobStatusPanel({ jobs, onJobClick }: JobStatusPanelProps) {
  if (jobs.length === 0) return null;

  const activeJobs = jobs.filter(
    (j) => j.status === "queued" || j.status === "processing"
  );
  const recentJobs = jobs.filter(
    (j) => j.status !== "queued" && j.status !== "processing"
  );

  return (
    <div className="flex flex-col gap-1 px-3 py-2">
      {/* Section header */}
      <div className="flex items-center justify-between px-1 pb-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Trang thai xu ly
        </span>
        {activeJobs.length > 0 && (
          <Badge
            variant="secondary"
            className="h-4 px-1.5 text-[9px] font-medium bg-primary/15 text-primary"
          >
            {activeJobs.length} dang chay
          </Badge>
        )}
      </div>

      {/* Active jobs */}
      {activeJobs.map((job) => {
        const config = STATUS_CONFIG[job.status];
        const Icon = config.icon;
        const iconClass = cn(
          "size-3.5",
          config.color,
          job.status === "processing" && "animate-spin"
        );
        return (
          <button
            key={job.jobId}
            onClick={() => onJobClick?.(job.jobId)}
            className="group flex flex-col gap-1.5 rounded-lg border border-border bg-secondary/30 p-2.5 text-left transition-colors hover:bg-secondary/60"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={iconClass} />
                <span className="text-xs font-medium text-foreground truncate max-w-[140px]">
                  {job.conversationId ? `Job ${job.jobId.slice(0, 6)}` : "Chua xac dinh"}
                </span>
              </div>
              <ChevronRight className="size-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Progress bar for active jobs */}
            {job.status === "processing" && (
              <div className="flex items-center gap-2">
                <Progress
                  value={job.progress}
                  className="h-1 flex-1 bg-secondary [&>[data-slot=progress-indicator]]:bg-primary [&>[data-slot=progress-indicator]]:transition-all"
                />
                <span className="text-[10px] font-mono text-muted-foreground">
                  {Math.round(job.progress)}%
                </span>
              </div>
            )}

            {/* Stage info */}
            {job.stages[job.currentStage] && (
              <span className="text-[10px] text-muted-foreground">
                {job.stages[job.currentStage].label}
              </span>
            )}
          </button>
        );
      })}

      {/* Recent completed jobs */}
      {recentJobs.length > 0 && (
        <div className="mt-1 flex flex-col gap-0.5">
          {recentJobs.slice(0, 3).map((job) => {
            const config = STATUS_CONFIG[job.status];
            const Icon = config.icon;
            return (
              <button
                key={job.jobId}
                onClick={() => onJobClick?.(job.jobId)}
                className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-secondary/40"
              >
                <Icon className={cn("size-3", config.color)} />
                <span className="flex-1 truncate text-[11px] text-muted-foreground">
                  Job {job.jobId.slice(0, 6)}
                </span>
                <Badge
                  variant="outline"
                  className={cn("h-4 px-1 text-[8px] border-0", config.badgeClass)}
                >
                  {config.label}
                </Badge>
                <span className="text-[9px] text-muted-foreground/60">
                  {formatTimeAgo(job.createdAt)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}