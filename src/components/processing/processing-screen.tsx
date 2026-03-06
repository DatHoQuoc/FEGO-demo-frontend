"use client";

import { Progress } from "@/components/ui/progress";
import { ProcessingAnimation } from "@/components/processing/processing-animation";
import { ProgressStages } from "@/components/processing/progress-stages";
import { StatusMessage } from "@/components/processing/status-message";
import { TimeEstimate } from "@/components/processing/time-estimate";
import { CancelButton } from "@/components/processing/cancel-button";
import type { ProcessingStage } from "@/types";

interface ProcessingScreenProps {
  progress: number;
  currentStage: number;
  stages: ProcessingStage[];
  statusMessage: string;
  estimatedSeconds: number;
  elapsedSeconds: number;
  onCancel: () => Promise<void>;
}

export function ProcessingScreen({
  progress,
  currentStage,
  stages,
  statusMessage,
  estimatedSeconds,
  elapsedSeconds,
  onCancel,
}: ProcessingScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-8">
      {/* Animated visual */}
      <ProcessingAnimation type="wireframe" size="lg" />

      {/* Status text */}
      <StatusMessage message={statusMessage} />

      {/* Progress bar */}
      <div className="flex w-full max-w-sm flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Tien do</span>
          <span className="font-mono text-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress
          value={progress}
          className="h-2 bg-secondary [&>[data-slot=progress-indicator]]:bg-primary [&>[data-slot=progress-indicator]]:transition-all [&>[data-slot=progress-indicator]]:duration-500"
        />
      </div>

      {/* Time estimate */}
      <TimeEstimate
        estimatedSeconds={estimatedSeconds}
        elapsedSeconds={elapsedSeconds}
      />

      {/* Processing stages */}
      <div className="w-full max-w-xs">
        <ProgressStages stages={stages} currentStage={currentStage} />
      </div>

      {/* Cancel button */}
      <CancelButton onCancel={onCancel} />
    </div>
  );
}
