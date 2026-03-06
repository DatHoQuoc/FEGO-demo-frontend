"use client";

import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TokenDisplayProps {
  tokens: number;
  maxTokens?: number;
}

function formatTokens(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString();
}

export function TokenDisplay({ tokens, maxTokens }: TokenDisplayProps) {
  const colorClass =
    tokens > 1000
      ? "text-success"
      : tokens > 100
        ? "text-warning"
        : "text-destructive";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="outline"
          className={cn(
            "cursor-pointer gap-1.5 border-border bg-secondary px-2.5 py-1 text-xs font-medium",
            colorClass
          )}
        >
          <Sparkles className="size-3.5" />
          <span>
            {formatTokens(tokens)}
            {maxTokens ? ` / ${formatTokens(maxTokens)}` : ""}
          </span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Token credits</p>
      </TooltipContent>
    </Tooltip>
  );
}
