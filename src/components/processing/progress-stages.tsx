"use client";

import { Check, ArrowRight, Circle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProcessingStage } from "@/types";

interface ProgressStagesProps {
  stages: ProcessingStage[];
  currentStage: number;
}

const statusConfig = {
  complete: {
    icon: Check,
    className: "text-success",
    textClassName: "text-muted-foreground",
  },
  active: {
    icon: ArrowRight,
    className: "text-primary animate-pulse",
    textClassName: "text-foreground font-medium",
  },
  pending: {
    icon: Circle,
    className: "text-muted-foreground/40",
    textClassName: "text-muted-foreground/60",
  },
  error: {
    icon: AlertCircle,
    className: "text-destructive",
    textClassName: "text-destructive",
  },
};

export function ProgressStages({ stages }: ProgressStagesProps) {
  return (
    <div className="flex flex-col gap-3" role="list" aria-label="Tien do xu ly">
      {stages.map((stage) => {
        const config = statusConfig[stage.status];
        const Icon = config.icon;

        return (
          <div
            key={stage.id}
            className="flex items-center gap-3"
            role="listitem"
            aria-current={stage.status === "active" ? "step" : undefined}
          >
            <Icon className={cn("size-4 shrink-0", config.className)} />
            <span className={cn("text-sm", config.textClassName)}>
              {stage.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
