"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeEstimateProps {
  estimatedSeconds: number;
  elapsedSeconds: number;
}

export function TimeEstimate({
  estimatedSeconds,
  elapsedSeconds,
}: TimeEstimateProps) {
  const remaining = Math.max(0, estimatedSeconds - elapsedSeconds);

  const colorClass =
    remaining > 10
      ? "text-info"
      : remaining > 5
        ? "text-warning"
        : "text-destructive";

  return (
    <div className={cn("flex items-center justify-center gap-2 text-sm", colorClass)}>
      <Clock className="size-4" />
      <span>
        {remaining > 0
          ? `Con ~${remaining} giay`
          : "Sap hoan thanh"}
      </span>
    </div>
  );
}
